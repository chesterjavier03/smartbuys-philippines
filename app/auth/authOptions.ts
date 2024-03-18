import { CustomsendVerificationRequest } from "@/app/api/auth/signinemail";
import prisma from '@/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { randomBytes, randomUUID } from "crypto";
import { NextAuthOptions, getServerSession } from "next-auth";
import EmailProvider from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user && user.idToken) {
        
        token.idToken = user.idToken;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user = {
        idToken: token.idToken,
        name: session.user.name,
        email: session.user.email,
        role: session.user.email === process.env.SMARTBUYS_SUPER ? 'super' : '',
        accessToken: token.accessToken,
      };
      return session;
    },
    // async jwt({ token }) {
    //   if (token) {
    //     if (token.email === process.env.SMARTBUYS_SUPER) token.role = 'super';
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   if(session) {
    //     session = Object.assign({}, session, { access_token: token })
    //     session.user.token = Object.assign({}, session.user.token, token )
    //   }
    //   return session
    // }
  },
  pages: {
    verifyRequest: '/login',
    error: '/error',
  },
  logger: {
    error(code, metadata) {
      console.log(code, metadata)
    },
    warn(code) {
      console.log(code)
    },
    debug(code, metadata) {
      console.log(code, metadata)
    }
  },
  theme: {
    colorScheme: "dark",
    brandColor: "#ff0000",
    logo: "/images/smartbuys_logo.png",
    buttonText: "#ffffff"
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      type:'email',
      from: process.env.EMAIL_FROM,
      maxAge: 60 * 60 * 24 * 30,
      sendVerificationRequest({ identifier, url, provider }) {
        CustomsendVerificationRequest({ identifier, url, provider })
      },
    })
  ],
  secret: process.env.NEXT_AUTH_SECRET,
}

// export default authOptions;
export const getServerAuthSession = () => getServerSession(authOptions);