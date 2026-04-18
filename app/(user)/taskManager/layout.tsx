import { auth } from "@/lib/auth";
import { hasPermission } from "@/lib/hasPermission";
import { redirectWithToast } from "@/lib/redirect-with-toast";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function TaskManagerLayout({ children }: Readonly<{ children: React.ReactNode; }>){
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/"); // secure redirect, no flicker
    }

    return (
        children
    )
}