"use client"

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { Badge } from "./ui/badge";
import { signOut } from "@/app/auth/actions";
import { Can } from "./auth/canPermission";
import type { User } from "./types/userSession";

type NavbarProps = {
    user: User;
}

export function NavbarUser({ user } : Readonly<NavbarProps>) {
    return (
        <header className="sticky top-0 z-50 w-full py-5 flex items-center justify-between">
            <div className="flex h-(--header-height) items-center gap-8">
                <Link href="/taskManager">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold">
                            Task<span className="text-blue-500">Manager</span>
                        </h1>
                        <Badge variant="secondary">User Panel</Badge>
                    </div>
                </Link>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Can role = "admin" user = { user }>
                    <Button variant="outline" asChild>
                        <Link href="/dashboard">Switch to Admin</Link>
                    </Button>
                </Can>
                <Button className={buttonVariants({variant: "destructive"})} onClick={signOut}>Logout</Button>
            </div>

        </header>
    )
}