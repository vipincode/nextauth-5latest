import Navbar from './_components/navbar'

interface ProtectedLayoutProp {
  children: React.ReactNode
}
export default function ProtectedRootLayout({ children }: ProtectedLayoutProp) {
  return (
    <div className="min-h-screen w-full flex flex-col gap-y-10 items-center justify-center gradient-green">
      <Navbar />
      {children}
    </div>
  )
}
