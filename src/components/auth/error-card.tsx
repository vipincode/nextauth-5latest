import Header from '@/components/auth/header'
import BackButton from '@/components/auth/back-button'
import { Card, CardHeader, CardFooter } from '@/components/ui/card'
import CardWrapper from './card-wrapper'
import { TiWarning } from 'react-icons/ti'

export default function ErrorCard() {
  return (
    <CardWrapper headerLabel="Oops! Something went wrong!" backButtonLabel="Back to login" backButtonHref="/auth/login">
      <div className="flex justify-center items-center">
        <TiWarning className="text-destructive" />
      </div>
    </CardWrapper>
  )
}
