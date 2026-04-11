import { getData } from "./actions"
import UserClient from "./client"

export default async function UserPage() {
  const data = await getData()

  return <UserClient data={data} />
}