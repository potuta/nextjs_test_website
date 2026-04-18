// app/(admin)/dashboard/layout.tsx
import { redirectWithToast } from "@/lib/redirect-with-toast";
import { auth } from "@/lib/auth"; // server-side Better Auth instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/hasPermission";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    // user not logged in or doesn't have admin role
    redirect("/"); // redirect to homepage or login
  }

  // const permissions = await auth.api.userHasPermission({
  //   body: {
  //       userId: session.user.id,
  //       permissions: {
  //           dashboard: ["view"]
  //       }
  //   }
  // })

  // if (!permissions.success){
  //   redirectWithToast("/", "error", "No permission to access dashboard");
  // }

  const permission = await hasPermission(session.user.id, "view_dashboard");
  if (!permission || permission === null) {
    redirectWithToast("/", "error", "No permission to access dashboard");
  }

  return (
    <div className="p-10">
      {children}
    </div>
  );
}