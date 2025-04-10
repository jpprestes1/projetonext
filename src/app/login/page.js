'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha }),
      credentials: 'include' 
    })

    if (res.ok) {
      router.push('/')
    } else {
      alert('Usuário ou senha inválidos')
    }
  }

  return (
    <main className='flex bg-[black] items-center justify-center justify-items-center min-h-screen pt-8 gap-16 font-[family-name:var(--font-geist-sans)] align-center'>
        <div className=" p-4 rounded shadow-md bg-gradient-to-br from-[#1B90DD] via-[#4C51F7] to-[#1B90DD] w-96">
            <p className='text-2xl font-bold text-white mb-4'>
                Login
            </p>
            <input
                placeholder="Usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="border p-2 block mb-2 w-full"
            />
            <input
                placeholder="Senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="border p-2 block mb-2 w-full"
            />
            <button onClick={handleLogin} className="bg-black text-white p-2 rounded w-full hover:bg-blue-900 transition duration-200">
                Entrar
            </button>
        </div>
    </main>
  )
}
