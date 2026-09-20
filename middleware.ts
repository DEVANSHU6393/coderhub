import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  // Check if the route is under /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Exclude the login page itself
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for the admin session cookie
    const sessionCookie = request.cookies.get('admin_session');

    // If no session exists, redirect to login
    if (!sessionCookie || !sessionCookie.value) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const secret = new TextEncoder().encode(process.env.SESSION_SECRET || "super-secret-session-key");
      await jwtVerify(sessionCookie.value, secret);
      // Valid token, proceed
      return NextResponse.next();
    } catch (error) {
      // Invalid token, expired, or tampered with
      console.error("JWT verification failed:", error);
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
