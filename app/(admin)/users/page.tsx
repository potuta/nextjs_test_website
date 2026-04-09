import { redirectWithToast } from "@/lib/redirect-with-toast"
import { columns, User } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { db } from "@/lib/db"

async function getData() {
    try{
        const users = await db.user.findMany({
            select: {
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

export default async function UserPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}