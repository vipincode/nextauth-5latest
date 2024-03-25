import crypto from 'crypto'
import { getVerificationTokenByEmail } from '@/utils/verification-token'
import { v4 as uuidv4 } from 'uuid'
import prisma from './db'
import { getPasswordResetTokenByEmail } from '@/utils/password-reset-token'
import { getTwoFactorTokenByEmail } from '@/utils/two-factor-token'

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_0000).toString()
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000) // expire in 5min
  // const expires = new Date(new Date().getTime() + 3600 * 1000) // expire in 1hr

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: { id: existingToken.id },
    })
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return twoFactorToken
}

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) //expire in 1hour

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    })
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return passwordResetToken
}

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) //expire in 1hour

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return verificationToken
}

// So use this function inside registration page. where we send verification token to the user
// so open actions-> register.ts and add this..
// also do this inside login, until he not verify cannot be login
