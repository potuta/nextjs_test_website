"use client"

import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

export const UserSchema = z.object({
    name: z   
        .string()
        .min(2, { error: 'Name must be at least 2 characters long.' })
        .trim(),
    username: z
        .string()
        .min(2, { error: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    role: z.string(),
    password: z
        .string()
        .min(8, { error: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
        error: 'Contain at least one special character.',
        })
        .trim(),
})

export type User = z.infer<typeof UserSchema>
export type TableUser = {
  name: string
  username: string | null
  email: string
  role: string | null
  // no password fetched from DB
}

export const columns: ColumnDef<TableUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role"
  },
  {
    id: "password",
    header: () => <div className="text-right">Password</div>,
    cell: ({ row }) => {
        // Just show masked value
        return <div className="text-right font-medium">••••••</div>
    },
  }
]