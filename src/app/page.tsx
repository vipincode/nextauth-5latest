import LoginButton from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="gradient-pink min-h-screen flex justify-center items-center flex-col gap-4">
      <h1 className="text-6xl font-semibold text-white drop-shadow-md">🔐 Auth</h1>
      <p className="text-xl text-white">A simple Authentication service</p>

      <LoginButton>
        <Button variant="secondary" size="lg">
          Sign in
        </Button>
      </LoginButton>
    </main>
  )
}
