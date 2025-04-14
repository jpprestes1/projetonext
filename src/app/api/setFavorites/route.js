import { NextResponse } from 'next/server'

export async function POST(req) {
  const { bookmark } = await req.json()

  localStorage.setItem("fortniteBase", JSON.stringify(bookmark));

  return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
}
