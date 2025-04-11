'use client';
import Image from "next/image";
import React from "react";
import { useEffect, useState } from 'react';



export default function News() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    fetch('https://fortnite-api.com/v2/news/br')
      .then(res => res.json())
      .then(data => {
        setDados(data.data.motds)
        console.log(data.data.motds);
      })
      .catch(err => console.error('Erro:', err));
    }, []);
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
    
    <div className="grid grid-rows-[20px_1fr_20px] bg-[#0B101D] items-center justify-items-center min-h-screen pt-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className="fixed top-0 left-0 items-center bg-[#0B101D] w-full h-20 px-4 pt-2">
        <nav className="flex items-center gap-8"> 
          <Image
            src="/f-logo.png"
            alt="Logo do Fortnite"
            width={60}
            height={60}
          />
          <a href="/" className="text-white hover:text-[#F3AF19]">
            Home
          </a>
          <a href="/news" className="text-[orange] font-bold hover:text-[#F3AF19]">
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
      <main className="flex flex-col bg-gradient-to-br from-[#0F2D5C] to-[#1D64C6] gap-[32px] row-start-2 items-center sm:items-start bg-cover bg-center w-[90%] h-full p-10 rounded-lg shadow-lg scrollbar-thin scrollbar-thumb-[#F3AF19] scrollbar-track-[#4C51F7]">
        <p className="text-2xl font-bold text-white">
          NOVIDADES QUENTINHAS!
        </p>
        {dados ? (
          <ul>
            {dados.map((news) => (
              <div key={news.id} className="flex flex-row gap-4 bg-[black] mb-4 p-4 rounded-lg shadow-lg">
                <div >
                  <li className="text-lg font-bold text-white" >{news.title}</li>
                  <p className="text-white">
                  {news.body}
                  </p>
                </div>
                <div className="flex justify-center">
                  <Image
                    src={news.image}
                    alt="Imagem do Fortnite"
                    width={500}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-white" >Carregando...</p>
        )}
      </main>
    </div>
  );
}
