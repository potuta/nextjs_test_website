import { NavbarUser } from "@/components/navbar_user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ReactNode } from "react";
import type { User } from '@/components/types/userSession';
import { getUserPermissions } from "@/lib/actions";
import { redirectWithToast } from "@/lib/redirect-with-toast";

export default async function SharedLayout({children} : Readonly<{children: ReactNode}>){
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirectWithToast("/", "error", "User not signed in.");
    }

    const user: User = {
        id: session!.user.id,
        role: session?.user.role ?? undefined,
        permissions: await getUserPermissions(session!.user.id)
    }

    return (
        <div>
            <NavbarUser user = {user}/>
            {children}
        </div>
    )
}