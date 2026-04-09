"use client"

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Badge } from "./ui/badge";
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "./ui/sidebar";
import { SidebarAdminMain } from "./sidebar_admin_main";
import { LayoutDashboard, User, UserKey, UsersRound } from "lucide-react";

async function signOut(){
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                redirect("/");
            }
        }
    })
}

export function NavbarAdmin() {
    return (
        <header className="sticky top-0 z-50 w-full py-5 flex items-center justify-between">
            <div className="flex h-(--header-height) items-center gap-8">
                <Link href="/dashboard">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold">
                            Task<span className="text-blue-500">Manager</span>
                        </h1>
                        <Badge variant="secondary">Admin Panel</Badge>
                    </div>
                </Link>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                    <Link href="/user">Switch to User</Link>
                </Button>
                <Button className={buttonVariants({variant: "destructive"})} onClick={signOut}>Logout</Button>
            </div>

        </header>
    )
}

const data = {
    navMain: [
    {
        title: "Manage Users",
        url: "#",
        icon: UsersRound,
        isActive: true,
        items: [
            {
            title: "User",
            url: "/users",
            icon: User
            },
            {
            title: "Roles & Permissions",
            url: "#",
            icon: UserKey
            },
            
        ],
    },
    ],
}

export function SidebarAdmin({ ...props }: React.ComponentProps<typeof Sidebar>) {

    return (
        <Sidebar 
            className="top-[calc(var(--header-height)+50px)] h-[calc(100svh-var(--header-height)-100px)]!"
            variant="floating"
            collapsible="icon"
            style={
                {
                "--sidebar-width": "15rem",
                "--sidebar-width-mobile": "15rem",
                } as React.CSSProperties
            }
            {...props}
        >
            {/* <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader> */}
            <SidebarContent
                className="gap-0" 
            >
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/dashboard" className="font-medium">
                                    <LayoutDashboard /> Dashboard
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarAdminMain items={data.navMain} />
            </SidebarContent>
            {/* <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter> */}
            <SidebarRail />
        </Sidebar>
    )
}