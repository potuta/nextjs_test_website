"use client"

import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { getRoles } from "./actions"

type Role = {
  id: string
  name: string
}

type Props = {
  value: string
  onChange: (value: string) => void
}

export function RoleSelect({ value, onChange }: Readonly<Props>) {
  const [roles, setRoles] = useState<Role[]>([])

  useEffect(() => {
    const loadRoles = async () => {
      const data = await getRoles()
      setRoles(data)
    }

    loadRoles()
  }, [])

  return (
    <div className="flex items-center justify-between">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select role" />
        </SelectTrigger>

        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.id} value={role.name}>
              {role.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}