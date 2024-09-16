import { Role } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';


const roleBasedPaths: Record<string, string[]> = {
  '/dashboard/products': [Role.ADMIN],
  '/dashboard/add-product': [Role.ADMIN],
  '/dashboard/analytics': [Role.ADMIN],
  '/dashboard/settings': [Role.ADMIN, Role.CUSTOMER],
  '/dashboard/orders': [Role.ADMIN, Role.CUSTOMER],
  '/': [Role.ADMIN, Role.CUSTOMER],
  '/about': [Role.ADMIN, Role.CUSTOMER],
  '/contact': [Role.ADMIN, Role.CUSTOMER],
  '/products': [Role.ADMIN, Role.CUSTOMER],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const { pathname } = req.nextUrl;
  const userRole = token.role || Role.CUSTOMER;

  const allowedRoles = roleBasedPaths[pathname];
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return NextResponse.redirect(new URL('/403', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/',
    '/about',
    '/contact',
    '/403',
    '/dashboard/settings',
    '/dashboard/orders',
    '/dashboard/add-product',
    '/dashboard/products',
    '/dashboard/analytics',
  ],
};
