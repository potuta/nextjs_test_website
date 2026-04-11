"use server"

import { db } from "@/lib/db"
import { guard } from "@/lib/guard";
import { redirectWithToast } from "@/lib/redirect-with-toast";
import { TableUser } from "./columns"

export async function getData() {
    try{
        const users = await db.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                role: true,
                // password: true
            }
        })
        return users
    }
    catch (err){
        redirectWithToast("/dashboard", "error", `Error: ${err}`);
        return []
    }
}

export async function getRoles(){
    return db.role.findMany()
}

export async function editUser(user: TableUser){
    try{
        const session = await guard("edit_all")
        
        if (!session || session === null){
            redirectWithToast("/users" , "error", "No permission to edit user")
        }

        const existingUser =  await db.user.findUnique({
            where: {
                id: user.id
            }, 
            include: {
                roles: true
            }
        })

        if (!existingUser){
            redirectWithToast("/users" , "error", "User not found")
        } 

        // edit role
        const hasRole = existingUser?.roles.some(
            (role) => role.name === user.role
        )
        
        if (!hasRole) {
            if (!user.role) {
                throw new Error("Role is required")
            }

            const newRole = await db.role.findUnique({
                where: { name: user.role },
            })

            if (!newRole) {
                throw new Error("Role not found")
            }

            await db.user.update({
                where: { id: user.id },
                data: {
                    role: newRole.name,
                    roles: {
                        set: [{ id: newRole.id }], 
                    },
                },
            })
        }

        // reset password

        return { ok: true }
    }
    catch (err){
        // redirectWithToast("/users", "error", `Error: ${err}`);
        return { ok: false, error: String(err) }
    }

}