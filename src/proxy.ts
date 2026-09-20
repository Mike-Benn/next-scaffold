import { NextResponse, type NextRequest } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

export default async function proxy(req: NextRequest) {
  const sessionCookie = getSessionCookie(req);
  const path = req.nextUrl.pathname;

  if (path.startsWith('/_next') || path.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  if (path.startsWith('/api')) {
    return NextResponse.next();
  }

  if (path.startsWith('/auth')) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    return NextResponse.next();
  }

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  return NextResponse.next();
}
