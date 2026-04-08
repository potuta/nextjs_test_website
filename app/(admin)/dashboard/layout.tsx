// app/(admin)/dashboard/layout.tsx
import { auth } from "@/lib/auth"; // server-side Better Auth instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    // user not logged in or doesn't have admin role
    redirect("/"); // redirect to homepage or login
  }

  // ✅ Simply render the children (page content)
  return <>{children}</>;
}