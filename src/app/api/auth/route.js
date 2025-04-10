import { NextResponse } from 'next/server'

export async function POST(req) {
  const { usuario, senha } = await req.json()

  if (usuario === 'admin' && senha === '1234') {
    const response = NextResponse.json({ success: true })
    response.cookies.set('token', 'meu-token-falso', {
      httpOnly: true,
      path: '/',
    })
    return response
  }

  return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
}
