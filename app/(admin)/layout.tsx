import { NavbarAdmin } from "@/components/navbar_admin";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function SharedLayout({children} : {children: ReactNode}){
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/"); // secure redirect, no flicker
    }

    return (
        <>
            <NavbarAdmin />
            {children}
        </>
    )
}