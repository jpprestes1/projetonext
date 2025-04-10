// src/app/api/logout/route.js
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set('token', '', { maxAge: 0 }) // Remove o token
  return response
}
