"use client";
import Image from "next/image";
import React from "react";


export default function Home() {

  function handleLogout() {
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
        if (res.ok) {
          console.log("Logout bem-sucedido");
          window.location.href = "/login"; // Redireciona para a página de login
        } else {
          console.error("Erro ao fazer logout");
        }
    })
    .catch((err) => {
      console.error("Erro na requisição:", err);
    });
  }
  function handleClick() {
    let nickname = prompt("Digite seu nickname:");
    if (nickname) {
      window.location.href = `/stats?nickname=${nickname}`;
    }
  }
  return (
    
     <div className="grid grid-rows-[20px_1fr_20px] bg-[#0B101D]  items-center justify-items-center min-h-screen pt-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className="fixed top-0 left-0 items-center bg-[#0B101D] w-full h-20 px-4 pt-2">
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
          <button className="bg-[#F3AF19] text-black hover:bg-[#F3AF19] hover:scale-110 transition-transform duration-200 hover:text-white rounded-lg px-4 py-2" onClick={() => handleClick()}>
            <a className="flex items-center gap-2">
              Verificar Stats
            </a>
          </button>
          
          <div className="flex items-center justify-end w-[68%] h-full">
            <button className="text-black rounded-lg px-4 py-2 align-end" onClick={() => handleLogout()}>
              <Image 
                src="/logout.png"
                alt="Logout"
                width={40}
                height={40}
                className="hover:scale-130 transition-transform duration-200"
              />
            </button>
          </div>
        </nav>
      </header>
      <main className="flex flex-col bg-gradient-to-br from-[#0F2D5C] to-[#1D64C6] gap-[32px] row-start-2 items-center sm:items-start bg-cover bg-center w-[90%] h-full p-10 rounded-lg shadow-lg">
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
