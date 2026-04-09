import { db } from "@/lib/db"

export async function POST(req: Request) {
  const { name, permissions } = await req.json();

  const role = await db.role.create({
    data: {
      name,
      permissions: {
        connect: permissions.map((pId: string) => ({ id: pId }))
      }
    }
  });

  return Response.json(role);
}