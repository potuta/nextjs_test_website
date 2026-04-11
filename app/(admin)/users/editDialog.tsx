"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TableUser } from "./columns"
import { RoleSelect } from "./roleSelect"
import { editUser } from "./actions"
import { useEffect, useState } from "react"
import { notification } from "@/lib/notification"
import { useRouter } from "next/navigation"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  user: TableUser | null
}

export function UserEditDialog({ open, setOpen, user }: Readonly<Props>) {
  const [role, setRole] = useState(user?.role ?? "")
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm">Name</label>
            <input value={user.name} disabled className="w-full border p-2 rounded" />
          </div>

          {/* Username */}
          <div>
            <label className="text-sm">Username</label>
            <input value={user.username ?? ""} disabled className="w-full border p-2 rounded" />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm">Email</label>
            <input value={user.email} disabled className="w-full border p-2 rounded" />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center">
                <span>Password</span>
                <Button variant="destructive">
                    Reset Password
                </Button>
            </div>
            <div className="flex justify-between items-center">
                <input disabled value="*****" className="w-full border p-2 rounder" />
            </div>
          </div>

          {/* Role placeholder for now */}
          <div>
            <label className="text-sm">Role</label>
            <RoleSelect value={role} onChange={setRole} />
          </div>

          <DialogFooter>
            <Button onClick={async () => {
                try{
                    setLoading(true)

                    const res = await editUser({
                        ...user,
                        role
                    })
                    
                    if (!res.ok){
                        notification({ type: "error", message: res.error })
                        return
                    }
                    
                    notification({ type: "success", message: "User updated successfully!" })
                    setOpen(false)
                    router.refresh()
                } finally {
                    setLoading(false)
                }
            }}>
                {loading ? "Saving..." : "Save changes"}
            </Button>
        </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}