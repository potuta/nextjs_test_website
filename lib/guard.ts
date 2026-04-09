import { NextResponse } from "next/server";
import { hasPermission } from "./hasPermission";
import { getUserFromSession } from "./getUserFromSession";

export async function guard(req: Request, permission: string): Promise<NextResponse | null> {
  try {
    const user = await getUserFromSession();
    if (!user) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const allowed = await hasPermission(user.id, permission);
    if (!allowed) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    return null; // null means "all good"
  } catch (err) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}