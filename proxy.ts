import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export default async function proxy(request: NextRequest) {
    const token = request.cookies.get('session_token')?.value;
    const { pathname } = request.nextUrl;
    // Protect Dashboard
    if (pathname.startsWith('/dashboard') && !token) {

        return NextResponse.redirect(new URL('/login', request.url));
    }
    // TODO: think of db call here for actual user instead of token as well

    // Prevent logged-in users from hitting /login
    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    // matcher are to tell on which routes you want to run proxy
    matcher: ['/dashboard/:path*', '/login'],
};