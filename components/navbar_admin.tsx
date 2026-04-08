"use client"

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function NavbarAdmin() {

    const router = useRouter();

    async function signOut(){
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                }
            }
        })
    }

    return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <h1 className="text-3xl font-bold">
                        <span className="text-blue-500">Home</span>
                    </h1>
                </Link>

                <div className="flex items-center gap-2">
                    <Link className={buttonVariants({variant: "ghost"})} href="/about">Users</Link>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button className={buttonVariants({variant: "destructive"})} onClick={signOut}>Logout</Button>
            </div>

        </nav>
    )
}