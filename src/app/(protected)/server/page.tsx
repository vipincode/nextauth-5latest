import UserInfo from '@/components/user-info'
import { currentUser } from '@/lib/current-user'

export default async function ServerPage() {
  const user = await currentUser()
  return <UserInfo label="💻 Server Components" user={user} />
}
