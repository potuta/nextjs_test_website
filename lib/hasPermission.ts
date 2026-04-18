import { db } from "./db";

export async function hasPermission(userId: string, permission: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
        include: {
          permissions: true,
        },
      },
    },
  });

  if (!user) return false;

  return user.roles.some(role =>
    role.permissions.some(p => {
      if (p.name === permission) return true;

      if (p.name.endsWith("_all")) {
        const prefix = p.name.replace("_all", ""); 
        return permission.startsWith(prefix);
      }

      return false;
    })
  );
}