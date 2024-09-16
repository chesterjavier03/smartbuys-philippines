import NextAuth, { type DefaultSession, type DefaultUser } from "next-auth"

export type ExtendUser = DefaultSession["user"] & {
  id: string
  role: string
  isTwoFactorEnabled: boolean
  isOAuth: boolean
  image: string
}

interface IUser extends DefaultUser {
  role?: Role;
}

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user: ExtendUser
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
