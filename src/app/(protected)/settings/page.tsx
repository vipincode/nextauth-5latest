'use client'

import { logout } from '@/actions/logout'
import { useCurrentUser } from '@/hooks/use-current-user'
// import { useSession, signOut } from 'next-auth/react'

export default function SettingsPage() {
  // const session = useSession()
  // Lets use our custom hooks to get user detail

  const user = useCurrentUser()

  const onClick = () => {
    // signOut()
    // let use our action logout
    logout()
  }

  return (
    <div className="bg-white p-10 rounded-xl">
      {/* {JSON.stringify(user)} */}
      <button onClick={onClick} type="submit">
        Sign out
      </button>
    </div>
  )
}

// Access session in server component

// import { auth, signOut } from '@/auth'

// export default async function SettingsPage() {
//   const session = await auth()

//   return (
//     <div>
//       {JSON.stringify(session)}
//       <form
//         action={async () => {
//           'use server'
//           await signOut()
//         }}
//       >
//         <button type="submit">Sign out</button>
//       </form>
//     </div>
//   )
// }
