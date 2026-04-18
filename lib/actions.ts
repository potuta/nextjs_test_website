import { db } from "./db";

export async function getUserPermissions(userId: string){
    const user = await db.user.findUnique({
        where: {
            id: userId
        },
        include: {
            roles: {
                include: {
                    permissions: true
                }
            }
        }
    })

    if (!user) return [];

    const permissions = user.roles.flatMap(role =>
        role.permissions.map(p => p.name)
    );

    return permissions;
}
