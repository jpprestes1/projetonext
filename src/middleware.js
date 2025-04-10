import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = request.cookies.get('token')?.value

  const isLoggedIn = !!token
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/')

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/stats/:path*', '/news/:path*', '/'],
}