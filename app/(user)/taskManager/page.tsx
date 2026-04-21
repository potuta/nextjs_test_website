import { getUserFromSession } from "@/lib/getUserFromSession";
import { TodoClient } from "./client";
import type { User } from "@/components/types/userSession";
import { getGroups } from "./actions";
import { redirectWithToast } from "@/lib/redirect-with-toast";

export default async function Page() {
  const session = await getUserFromSession();

  if (!session?.id) {
    redirectWithToast("/", "error", "User not signed in.");
  }

  const user: User = {
    id: session!.id,
    username: session?.username ?? undefined
  };

  const groups = await getGroups(session!.id);

  return <TodoClient groups={groups} user={user} />;
}