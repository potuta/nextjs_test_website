"use client"

import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { columns, TableUser } from "./columns"
import { UserEditDialog } from "./editDialog"

export default function UserClient({ data }: Readonly<{ data: TableUser[] }>) {
  const [selectedUser, setSelectedUser] = useState<TableUser | null>(null)
  const [open, setOpen] = useState(false)

  return (
    <div className="container mx-auto py-10">
      <DataTable
        data={data}
        columns={columns({ setSelectedUser, setOpen })}
      />

      <UserEditDialog
        key={selectedUser?.id}
        open={open}
        setOpen={setOpen}
        user={selectedUser} />

    </div>
  )
}