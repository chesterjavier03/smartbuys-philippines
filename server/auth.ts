import NextAuth from 'next-auth';
import prisma from '@/prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '@/types/login-schema';
import bcrypt from 'bcrypt';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  events: {
    createUser: async ({ user }) => {
      // const stripe = new Stripe(process.env.STRIPE_SECRET!, {
      //   apiVersion: "2024-04-10",
      // })
      // const customer = await stripe.customers.create({
      //   email: user.email!,
      //   name: user.name!,
      // })
      // await db
      //   .update(users)
      //   .set({ customerID: customer.id })
      //   .where(eq(users.id, user.id!))
    },
  },
  callbacks: {
    async session({ session, token }) {
      if (session && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.image = token.image as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await prisma?.users.findFirst({
        where: { id: token.sub },
      });
      if (!existingUser) return token;
      const existingAccount = await prisma?.accounts.findFirst({
        where: { userId: existingUser.id },
      });
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.twoFactorEnabled;
      token.image = existingUser.image;
      token.role = existingUser.role;
      return token;
    },
    async authorized({ auth }) {
      const isAuthenticated = !!auth?.user;
      return isAuthenticated;
    },
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await prisma?.users.findFirst({
            where: { email: email },
          });

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
});
