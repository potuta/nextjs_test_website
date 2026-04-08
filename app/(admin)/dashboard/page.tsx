"use client"

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Dashboard(){
    const { data: session, isPending } = authClient.useSession();

    if (!isPending && !session) {
        redirect("/");
    }

    return (
        <div>Welcome {session?.user.name} ({session?.user.role})!</div>
    )
}