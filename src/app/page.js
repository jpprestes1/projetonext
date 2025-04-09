"use client";
import Image from "next/image";
import React from "react";


export default function Home() {

  function handleClick() {
    let nickname = prompt("Digite seu nickname:");
    if (nickname) {
      window.location.href = `/stats?nickname=${nickname}`;
    }
  }
  return (
    
     <div className="grid grid-rows-[20px_1fr_20px] bg-[black] items-center justify-items-center min-h-screen pt-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className="fixed top-0 left-0 items-center bg-gradient-to-br from-[#1B90DD] via-[#4C51F7] to-[#1B90DD]  w-full h-20 px-4 pt-2">
        <nav className="flex items-center gap-8">
          <Image
            src="/f-logo.png"
            alt="Logo do Fortnite"
            width={60}
            height={60}
          />
          <a href="/" className="text-[orange] font-bold hover:text-[#F3AF19]">
            Home
          </a>
          <a href="/news" className="text-white hover:text-[#F3AF19]">
            Novidades
          </a>
          <button className="bg-[#F3AF19] text-black hover:bg-[#F3AF19] hover:text-white rounded-lg px-4 py-2 align-end" onClick={() => handleClick()}>
            <a className="flex items-center gap-2">
              Verificar Stats
            </a>
          </button>
        </nav>
      </header>
      <main className="flex flex-col bg-gradient-to-br from-[#1B90DD] via-[#4C51F7] to-[#1B90DD] gap-[32px] row-start-2 items-center sm:items-start bg-cover bg-center w-[90%] h-full p-10 rounded-lg shadow-lg">
        <p className="text-2xl text-white font-bold">
          Este é um projeto de exemplo para demonstrar o uso do Next.js com Tailwind CSS.
        </p>
        <p className="text-lg text-white">
          Aqui você pode verificar as novidades e as suas estatísticas do Fortnite.
        </p>
        <p className="text-lg text-white">
          Como API, utilizamos a API do Fortnite para obter as informações mais recentes sobre o jogo.
        </p>
      </main>
    </div>
  );
}
