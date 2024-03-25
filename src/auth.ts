import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/db'
import { getUserById } from '@/utils/user'
import { getTwoFactorConfirmationByUserId } from '@/utils/two-factor-confirmation'

declare module 'next-auth' {
  interface User {
    role: 'ADMIN' | 'USER'
    isTwoFactorEnables: boolean
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      // Prevent signIn without verification
      const existingUser = await getUserById(user.id!)
      if (!existingUser?.emailVerified) return false

      //TODO: 2FA check
      if (existingUser.isTwoFactorEnables) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        // console.log(twoFactorConfirmation)

        if (!twoFactorConfirmation) return false

        // Delete wo factor confirmation for new sign in
        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        })
      }

      return true
    },
    async session({ session, token }) {
      // console.log({
      //   sessionToken: token,
      // })
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as 'ADMIN' | 'USER'
      }
      if (session.user) {
        session.user.isTwoFactorEnables = token.isTwoFactorEnables as boolean
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      token.role = existingUser.role
      token.isTwoFactorEnables = existingUser.isTwoFactorEnables

      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
})
