import { db } from "./db"

export async function hasPermission(userId: string, permission: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
        include: {
          permissions: true
        }
      }
    }
  });

  return user?.roles.some(role =>
    role.permissions.some(p => p.name === permission)
  );
}