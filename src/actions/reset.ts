'use server'

import { sendPasswordResetEmail } from '@/lib/mail'
import { generateResetPasswordToken } from '@/lib/tokens'
import { ResetSchema } from '@/schemas'
import { getUserByEmail } from '@/utils/user'
import { z } from 'zod'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'invalid email!' }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  //TODO: generate token and send email
  const passwordResetToken = await generateResetPasswordToken(email)
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

  return { success: 'Reset email sent!' }
}
