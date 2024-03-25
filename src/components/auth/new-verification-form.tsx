'use client'

import { useSearchParams } from 'next/navigation'
import CardWrapper from './card-wrapper'
import { BeatLoader } from 'react-spinners'
import { useCallback, useEffect, useState } from 'react'
import { newVerification } from '@/actions/new-verification'
import FormError from '../form-error'
import FormSuccess from '../form-success'

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchPrams = useSearchParams()
  const token = searchPrams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) return
    if (!token) {
      setError('Missing Token')
      return
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper headerLabel="Confirm your verification" backButtonHref="/auth/login" backButtonLabel="Back to Login">
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  )
}
