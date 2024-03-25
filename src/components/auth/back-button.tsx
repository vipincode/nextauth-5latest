import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface BackButtonProps {
  label: string
  href: string
}

export default function BackButton({ label, href }: BackButtonProps) {
  return (
    <Button variant="link" size="sm" asChild className="font-normal w-full">
      <Link href={href}>{label}</Link>
    </Button>
  )
}
