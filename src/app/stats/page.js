'use client';
import Image from "next/image";
import React from "react";
import { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";

export default function Stats() {
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname");
  const [statsCompare, setStatsCompare] = useState(null);
  const [stats, setStats] = useState(null);
  const [erro, setErro] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const token = "ef764312-76a9-4c7d-a391-39f3d9e7680f"; 
  
  useEffect(() => {
    
    fetch(`https://fortnite-api.com/v2/stats/br/v2?name=${nickname}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
    .then(async (res) => {
        const data = await res.json();
        console.log("Resposta da API:", data.data);

        if (!res.ok) {
          throw new Error(data.error || "Erro desconhecido");
        }

        setStats(data.data);
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
        setErro(true);
      });
    }, []);

  async function addCompare() {
    let nickCompare = prompt("Digite o nickname que deseja comparar:");
    if (!nickCompare) return; // Se o usuário cancelar, não faz nada
    fetch(`https://fortnite-api.com/v2/stats/br/v2?name=${nickCompare}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
    .then(async (res) => {
        const data = await res.json();
        console.log("Resposta da API:", data.data);

        if (!res.ok) {
          throw new Error(data.error || "Erro desconhecido");
        }

        setStatsCompare(data.data);
        setIsCompare(true);
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
        setErro(true);
      });

  }

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
    
    <div className="grid grid-rows-[20px_1fr_20px] bg-[#0B101D] items-center justify-items-center min-h-screen pt-2 gap-16 font-[family-name:var(--font-geist-sans)]">
      <header className="fixed top-0 left-0 items-center bg-[#0B101D]  w-full h-20 px-4 pt-2">
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
          <a href="/news" className="text-white hover:text-[#F3AF19]">
            Novidades
          </a>
          <button className="bg-[#F3AF19] text-black hover:bg-[#F3AF19] hover:scale-110 transition-transform duration-200 hover:text-white rounded-lg px-4 py-2" onClick={() => handleClick()}>
            <a className="flex items-center gap-2">
              Verificar Stats
            </a>
          </button>
          <button className="bg-[#F3AF19] text-black hover:bg-[#F3AF19] hover:scale-110 transition-transform duration-200 hover:text-white rounded-lg px-4 py-2" onClick={() => addCompare()}>
            <a className="flex items-center gap-2">
              +
            </a>
          </button>
          
          <div className="flex items-center justify-end w-[60%] h-full">
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
      <main className="flex flex-row bg-gradient-to-br from-[#0F2D5C] to-[#1D64C6] gap-[20px] row-start-2 items-center sm:items-start bg-cover bg-center w-[90%] h-full p-10 rounded-lg shadow-lg scrollbar-thin scrollbar-thumb-[#F3AF19] scrollbar-track-[#4C51F7]">
        <div className="flex flex-col gap-4 p-4 rounded-lg shadow-lg w-[50%]">
          <div className="flex flex-col gap-4 bg-[black] p-4 rounded-lg shadow-lg w-[80%]">
            <p className="text-4xl font-bold text-white">
              {nickname}
            </p>
            { stats ?
              <p className="text-sm text-white" style={{color: stats?.stats?.all?.overall?.minutesPlayed > statsCompare?.stats?.all?.overall?.minutesPlayed && isCompare ?  "green" : isCompare ? "red" : "white"}}>
                Tempo de jogo: {Math.floor(stats?.stats?.all?.overall?.minutesPlayed / 60)} horas e {stats?.stats?.all?.overall?.minutesPlayed % 60} minutos
              </p>
            :
              <>  </>
            }
          </div>
          { stats ?
          <><div className="flex flex-row gap-4 bg-[black] p-4 rounded-lg shadow-lg">
              <div>
                <p className="text-lg font-bold text-white" style={{color: (statsCompare?.stats?.all?.overall?.matches < stats?.stats?.all?.overall?.matches) && isCompare ?  "green" : isCompare ? "red" : "white"}}>{stats?.stats?.all?.overall?.matches}</p>
                <p className="text-white">
                  Partidas jogadas
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-white" style={{color: (statsCompare?.stats?.all?.overall?.wins < stats?.stats?.all?.overall?.wins) && isCompare ?  "green" : isCompare ? "red" : "white"}}>{stats?.stats?.all?.overall?.wins}</p>
                <p className="text-white" >
                  Vitorias
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-white" style={{color: (statsCompare?.stats?.all?.overall?.winRate < stats?.stats?.all?.overall?.winRate) && isCompare ?  "green" : isCompare ? "red" : "white"}}>{stats?.stats?.all?.overall?.winRate}</p>
                <p className="text-white" >
                  Taxa de vitória
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4 bg-[black] p-4 rounded-lg shadow-lg">
                <div>
                  <p className="text-lg font-bold text-white" style={{color: (statsCompare?.stats?.all?.overall?.top3 < stats?.stats?.all?.overall?.top3) && isCompare ?  "green" : isCompare ? "red" : "white"}}>{stats?.stats?.all?.overall?.top3}</p>
                  <p className="text-white" >
                    Top 3
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white" style={{color: (statsCompare?.stats?.all?.overall?.top5 < stats?.stats?.all?.overall?.top5) && isCompare ?  "green" : isCompare ? "red" : "white"}}>{stats?.stats?.all?.overall?.top5}</p>
                  <p className="text-white">
                    Top 5
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white" style={{color: (statsCompare?.stats?.all?.overall?.top10 < stats?.stats?.all?.overall?.top10) && isCompare ?  "green" : isCompare ? "red" : "white"}}>{stats?.stats?.all?.overall?.top10}</p>
                  <p className="text-white">
                    Top 10
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 bg-[black] p-4 rounded-lg shadow-lg">
                <div>
                  <p className="text-lg font-bold text-white" style={{color: (statsCompare?.stats?.all?.overall?.kills < stats?.stats?.all?.overall?.kills) && isCompare ?  "green" : isCompare ? "red" : "white"}}>{stats?.stats?.all?.overall?.kills}</p>
                  <p className="text-white" >
                    Abates
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white" style={{color: (statsCompare?.stats?.all?.overall?.deaths < stats?.stats?.all?.overall?.deaths) && isCompare ?  "green" : isCompare ? "red" : "white"}}>{stats?.stats?.all?.overall?.deaths}</p>
                  <p className="text-white">
                    Mortes
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white" style={{color: (statsCompare?.stats?.all?.overall?.kd < stats?.stats?.all?.overall?.kd) && isCompare ?  "green" : isCompare ? "red" : "white"}}>{stats?.stats?.all?.overall?.kd}</p>
                  <p className="text-white">
                    K/D
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 bg-[black] p-4 rounded-lg shadow-lg">
                <p className="text-sm text-white">
                  Última vez online: {new Date(stats?.stats?.all?.overall?.lastModified).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })} 
                </p>
              </div>
              
              </>
          
          : erro ?
            <div className="flex flex-row gap-4 bg-[black] p-4 rounded-lg shadow-lg">
              <p>
                Não foi possivel carregar as estatísticas dessa conta. Verifique se o nickname está correto.
              </p>
            </div>

          :
            <div className="flex flex-row gap-4 bg-[black] p-4 rounded-lg shadow-lg">
              <p>
                Carregando...
              </p>
            </div>
          }
        
        </div>
        <div className="flex flex-col gap-4 p-4 rounded-lg shadow-lg w-[50%]">
        {statsCompare ?
        <div className="flex flex-col gap-4 bg-[black] p-4 rounded-lg shadow-lg w-[80%]">
          <p className="text-4xl font-bold text-white">
            {statsCompare?.account?.name}
          </p>
          { statsCompare ?
            <p className="text-sm text-white" style={{color: statsCompare?.stats?.all?.overall?.minutesPlayed > stats?.stats?.all?.overall?.minutesPlayed ? "green" : "red"}}>
              Tempo de jogo: {Math.floor(statsCompare?.stats?.all?.overall?.minutesPlayed / 60)} horas e {statsCompare?.stats?.all?.overall?.minutesPlayed % 60} minutos
            </p>
          :
            <>  </>
          }
        </div>
        :
          <></>
        }
        { statsCompare ?
          <><div className="flex flex-row gap-4 bg-[black] p-4 rounded-lg shadow-lg">
              <div>
                <p className="text-lg font-bold text-white" style={{color: statsCompare?.stats?.all?.overall?.matches > stats?.stats?.all?.overall?.matches ? "green" : "red"}}>{statsCompare?.stats?.all?.overall?.matches}</p>
                <p className="text-white">
                  Partidas jogadas
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-white" style={{color: statsCompare?.stats?.all?.overall?.wins > stats?.stats?.all?.overall?.wins ? "green" : "red"}}>{statsCompare?.stats?.all?.overall?.wins}</p>
                <p className="text-white">
                  Vitorias
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-white" style={{color: statsCompare?.stats?.all?.overall?.winRate > stats?.stats?.all?.overall?.winRate ? "green" : "red"}}>{statsCompare?.stats?.all?.overall?.winRate}</p>
                <p className="text-white">
                  Taxa de vitória
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4 bg-[black] p-4 rounded-lg shadow-lg">
                <div>
                  <p className="text-lg font-bold text-white" style={{color: statsCompare?.stats?.all?.overall?.top3 > stats?.stats?.all?.overall?.top3 ? "green" : "red"}}>{statsCompare?.stats?.all?.overall?.top3}</p>
                  <p className="text-white">
                    Top 3
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white" style={{color: statsCompare?.stats?.all?.overall?.top5 > stats?.stats?.all?.overall?.top5 ? "green" : "red"}}>{statsCompare?.stats?.all?.overall?.top5}</p>
                  <p className="text-white">
                    Top 5
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white" style={{color: statsCompare?.stats?.all?.overall?.top10 > stats?.stats?.all?.overall?.top10 ? "green" : "red"}}>{statsCompare?.stats?.all?.overall?.top10}</p>
                  <p className="text-white">
                    Top 10
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 bg-[black] p-4 rounded-lg shadow-lg">
                <div>
                  <p className="text-lg font-bold text-white" style={{color: statsCompare?.stats?.all?.overall?.kills > stats?.stats?.all?.overall?.kills ? "green" : "red"}}>{statsCompare?.stats?.all?.overall?.kills}</p>
                  <p className="text-white">
                    Abates
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white" style={{color: statsCompare?.stats?.all?.overall?.deaths > stats?.stats?.all?.overall?.deaths ? "green" : "red"}}>{statsCompare?.stats?.all?.overall?.deaths}</p>
                  <p className="text-white">
                    Mortes
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white" style={{color: statsCompare?.stats?.all?.overall?.kd > stats?.stats?.all?.overall?.kd ? "green" : "red"}}>{statsCompare?.stats?.all?.overall?.kd}</p>
                  <p className="text-white">
                    K/D
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 bg-[black] p-4 rounded-lg shadow-lg">
                <p className="text-sm text-white">
                  Última vez online: {new Date(statsCompare?.stats?.all?.overall?.lastModified).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })} 
                </p>
              </div>
              
              </>
          
          : erro ?
            <div className="flex flex-row gap-4 bg-[black] p-4 rounded-lg shadow-lg">
              <p>
                Não foi possivel carregar as estatísticas dessa conta. Verifique se o nickname está correto.
              </p>
            </div>

          : isCompare ?
            <div className="flex flex-row gap-4 bg-[black] p-4 rounded-lg shadow-lg">
              <p>
                Carregando...
              </p>
            </div>
          :
            <></>
          }

        </div>
      </main>
    </div>
  );
}
