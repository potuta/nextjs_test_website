import { NavbarAdmin, SidebarAdmin } from "@/components/navbar_admin";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
        <div className="[--header-height:calc(--spacing(9))]">
            <SidebarProvider className="flex flex-col">
                <NavbarAdmin />
                <div className="flex -ml-5 shrink-0 items-center">
                    <SidebarAdmin />
                    <SidebarInset>
                        {children}
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    )
}