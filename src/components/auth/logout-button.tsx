'use client'

import { logout } from '@/actions/logout'

interface LogoutButtonProps {
  children: React.ReactNode
}

export default function LogoutButton({ children }: LogoutButtonProps) {
  const onclick = () => {
    logout()
  }
  return (
    <span onClick={onclick} className="cursor-pointer">
      {children}
    </span>
  )
}
