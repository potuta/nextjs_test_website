import { getUserFromSession } from "@/lib/getUserFromSession";
import { TodoPage } from "./client";
import type { User } from '@/components/types/userSession'

export default async function Page(){
    const session = await getUserFromSession()

    const user: User = {
       username: session?.username ?? undefined
    }

    return (
        <TodoPage user = { user } />
    );
}