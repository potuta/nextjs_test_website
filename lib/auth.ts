import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/db";
import { admin as adminPlugin, username } from "better-auth/plugins";
import { ac, admin, user } from "@/lib/permission";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: false
    },
    plugins: [
        username(),
        adminPlugin({
            ac,
            roles: {
                admin,
                user,
            },
            defaultRole: "user",
            adminRoles: ["admin"],
        }),
    ],
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
});