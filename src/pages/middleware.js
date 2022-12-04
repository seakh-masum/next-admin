import { NextResponse, NextRequest } from 'next/server'
import { checkCookie } from 'shared/helper/storage'
export async function middleware(req, ev) {
  const { pathname } = req.nextUrl
  if (pathname !== '/auth' && checkCookie('user')) {
    return NextResponse.redirect('/auth/login')
  }
  return NextResponse.next()
}