import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/db";
import { username } from "better-auth/plugins"

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: false
    },
    plugins: [
        username()
    ],
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
});