'use client';
import Image from "next/image";
import React from "react";
import { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function Stats() {
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname");
  const [statsCompare, setStatsCompare] = useState(null);
  const [stats, setStats] = useState(null);
  const [erro, setErro] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const [bookmark, setBookmark] = useState({});
  const [imagePrimary, setImagePrimary] = useState("/bookmark-save.png");
  const [imageSecundary, setImageSecundary] = useState("/bookmark-save.png");
  const [itemToSort, setItemToSort] = useState('minutesPlayed');
  
  async function fetchStats(nick) {
    setErro(false);
    const res = await fetch(`/api/stats?nickname=${encodeURIComponent(nick)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include' 
    }).catch((err) => {
      setErro(true);
    });
    let data = await res.json()
    console.log("res", data)
    if (res.ok) {
      return data
    } else {
      setErro(true);
    }
    return 
  }

  function updateSorting(position, dict='') {
    let sorted;
    if(dict == '') {
      dict = bookmark;
      console.log(dict)
    }
    if(position == 'minutesPlayed') {
      sorted = Object.entries(dict)
      .sort((a, b) => b[1].minutesPlayed - a[1].minutesPlayed) // ordena decrescente
      .reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
      }, {})
    }else if(position == 'kd') {
      sorted = Object.entries(dict)
      .sort((a, b) => b[1].kd - a[1].kd) // ordena decrescente
      .reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
      }, {})
    }else {
      sorted = Object.entries(dict)
      .sort((a, b) => b[1].winRate - a[1].winRate) // ordena decrescente
      .reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
      }, {})
    }
    setBookmark(sorted);
    setItemToSort(position);
  }

  useEffect( () => { 
    let saveUser = localStorage.getItem("fortniteBase");
    if (saveUser) {
      updateSorting(itemToSort, JSON.parse(saveUser));
      console.log("bookmark", JSON.parse(saveUser))
      let keys = Object.keys(JSON.parse(saveUser));
      if (keys.includes((nickname).toLowerCase())) {
        setImagePrimary("/bookmark-saved.png");
      }

    }
    async function fetchData() {
      let stats = await fetchStats(nickname);
      setStats(stats);
    }
    fetchData()
  }, []);

  async function addCompare() {
    let nickCompare = prompt("Digite o nickname que deseja comparar:");
    if (!nickCompare) return; // Se o usuário cancelar, não faz nada
    setStatsCompare(null);
    let statsCompare = await fetchStats(nickCompare);
    if (statsCompare) {
      setStatsCompare(statsCompare);
      setIsCompare(true);
      let keys = Object.keys(bookmark);
      if (keys.includes((nickCompare).toLowerCase())) {
        setImageSecundary("/bookmark-saved.png");
      }
      
    } else {
      setErro(true);
    }
  }

  async function changeBookmark(stats, type) {
    console.log("changeBookmark", stats)
    let nameKey = (stats.account.name).toLowerCase();
    let keys = Object.keys(bookmark);
    if (keys.length > 5) {
      alert("Você só pode salvar 5 contas!");
      return;
    }
    if (keys.includes(nameKey)) {
      delete bookmark[nameKey];
      localStorage.setItem("fortniteBase", JSON.stringify(bookmark));
      if(type == 'primary') {
        setImagePrimary("/bookmark-save.png");
      }else{
        setImageSecundary("/bookmark-save.png");
      }
      alert("Conta removida dos favoritos!");
      return;
    }
    bookmark[nameKey] = {
      'nickname': stats.account.name,
      'winRate': stats.stats.all.overall.winRate,
      'kd': stats.stats.all.overall.kd,
      'minutesPlayed': stats.stats.all.overall.minutesPlayed,
    };
    if(type == 'primary') {
      setImagePrimary("/bookmark-saved.png");
    }else{
      setImageSecundary("/bookmark-saved.png");
    }
    localStorage.setItem("fortniteBase", JSON.stringify(bookmark));
  }

  function removeBookmark(nick) {
    let nameKey = (nick).toLowerCase();
    delete bookmark[nameKey];
    updateSorting(itemToSort, bookmark);
    localStorage.setItem("fortniteBase", JSON.stringify(bookmark));
    alert("Conta removida dos favoritos!");
  }

  function handleLogout() {
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
        if (res.ok) {
          localStorage.clear();
          sessionStorage.clear();
          document.cookie = "token=; Max-Age=0; path=/;";
          console.log("Logout bem-sucedido");
          window.location.href = "/login"; 
        } else {
          console.error("Erro ao fazer logout");
        }
    })
    .catch((err) => {
      console.error("Erro na requisição:", err);
    });
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
      <main className="flex flex-row bg-gradient-to-br from-[#0F2D5C] to-[#1D64C6] gap-[10px] row-start-2 items-center sm:items-start bg-cover bg-center w-[90%] h-full p-4 rounded-lg shadow-lg scrollbar-thin scrollbar-thumb-[#F3AF19] scrollbar-track-[#4C51F7]">
        <div className="flex flex-col gap-4 p-4 rounded-lg w-[40%]">
          <div className="flex flex-col gap-4 bg-[#0C182D] p-4 rounded-lg shadow-lg w-[100%]">
            <div className="flex flex-row gap-4 items-center">
              <p className="text-4xl font-bold text-white">
                {nickname}
              </p>
              <button className="text-black hover:scale-130 transition-transform duration-200 rounded-lg px-4 py-2" onClick={() => changeBookmark(stats, 'primary')}>
                  <Image
                    src={Object.keys(bookmark).includes((nickname).toLowerCase()) ? '/bookmark-saved.png' : '/bookmark-save.png'}
                    alt="Icone para salvar"
                    width={40}
                    height={40}
                  />
              </button>
            </div>
            { stats ?
              <p className="text-sm text-white" style={{color: stats?.stats?.all?.overall?.minutesPlayed > statsCompare?.stats?.all?.overall?.minutesPlayed && isCompare ?  "green" : isCompare ? "red" : "white"}}>
                Tempo de jogo: {Math.floor(stats?.stats?.all?.overall?.minutesPlayed / 60)} horas e {stats?.stats?.all?.overall?.minutesPlayed % 60} minutos
              </p>
            :
              <>  </>
            }
          </div>
          { stats ?
          <><div className="flex flex-row gap-4 bg-[#0C182D] p-4 rounded-lg shadow-lg">
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
            <div className="flex flex-row gap-4 bg-[#0C182D] p-4 rounded-lg shadow-lg">
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
              <div className="flex flex-row gap-4 bg-[#0C182D] p-4 rounded-lg shadow-lg">
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
              <div className="flex flex-row gap-4 bg-[#0C182D] p-4 rounded-lg shadow-lg">
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
            <div className="flex flex-row gap-4 bg-[#0C182D] p-4 text-white rounded-lg shadow-lg">
              <p>
                Não foi possivel carregar as estatísticas dessa conta. Verifique se o nickname está correto.
              </p>
            </div>

          :
            <div className="flex flex-row gap-4 text-white bg-[#0C182D] p-4 rounded-lg shadow-lg">
              <p>
                Carregando...
              </p>
            </div>
          }
        
        </div>
        <div className="flex flex-col gap-4 p-4 rounded-lg w-[40%]">
        {statsCompare ?
        <div className="flex flex-col gap-4 bg-[#0C182D] p-4 rounded-lg shadow-lg w-[100%]">
          <div className="flex flex-row gap-4 items-center">
            <p className="text-4xl font-bold text-white">
              {statsCompare?.account?.name}
            </p>
            <button className="text-black hover:scale-130 transition-transform duration-200 rounded-lg px-4 py-2" onClick={() => changeBookmark(statsCompare, 'secundary')}>
                <Image
                  src={Object.keys(bookmark).includes((statsCompare?.account?.name).toLowerCase()) ? '/bookmark-saved.png' : '/bookmark-save.png'}
                  alt="Icone para salvar"
                  width={40}
                  height={40}
                />
            </button>
          </div>
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
          <><div className="flex flex-row gap-4 bg-[#0C182D] p-4 rounded-lg shadow-lg">
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
            <div className="flex flex-row gap-4 bg-[#0C182D] p-4 rounded-lg shadow-lg">
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
              <div className="flex flex-row gap-4 bg-[#0C182D] p-4 rounded-lg shadow-lg">
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
              <div className="flex flex-row gap-4 bg-[#0C182D] p-4 rounded-lg shadow-lg">
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
            <div className="flex flex-row text-white gap-4 bg-[#0C182D] p-4 rounded-lg shadow-lg">
              <p>
                Não foi possivel carregar as estatísticas dessa conta. Verifique se o nickname está correto.
              </p>
            </div>

          : isCompare ?
            <div className="flex flex-row text-white gap-4 bg-[#0C182D] p-4 rounded-lg shadow-lg">
              <p>
                Carregando...
              </p>
            </div>
          :
            <></>
          }

        </div>
        <div className="flex flex-col pr-10 bg-gradient-to-br from-[#0C1221] to-[#0D1F3D] rounded-lg w-[20%] bg-[#0C182D] overflow-y-auto overflow-x-hidden h-[680px]">
          <div className="flex flex-col pt-4 ps-4 rounded-lg w-[100%]">
            <p className="text-2xl font-bold text-white">
              Favoritos
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-[60%] mt-2" asChild>
                <Button variant="outline">{itemToSort == 'minutesPlayed' ? "Tempo Jogado" : itemToSort == "kd" ? "K/D" : "Taxa de Vitória"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Organizar por:</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={itemToSort} onValueChange={updateSorting}>
                  <DropdownMenuRadioItem value="minutesPlayed">Tempo jogado</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="kd">K/D</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="winRate">Taxa de Vitória</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
          {Object.keys(bookmark).map((key,index) => (
            <div key={key} className="flex flex-col gap-2 p-4 rounded-lg w-[100%]">
              <p className="text-xl font-bold text-white justify-start flex flex-row gap-2 items-center">
                {index+1 + "º " +bookmark[key].nickname} 
                <button className="text-black hover:scale-130 transition-transform duration-200 rounded-lg px-4 py-2" onClick={() => removeBookmark(bookmark[key].nickname)}>
                  <Image
                    src='/bookmark-saved.png'
                    alt="Icone para salvar"
                    width={40}
                    height={40}
                  />
                </button>
              </p>
              <p className="text-sm text-white ps-2">
                Taxa de Vitória: {bookmark[key].winRate}
              </p>
              <p className="text-sm text-white ps-2">
                K/D: {bookmark[key].kd}
              </p>
              <p className="text-sm text-white ps-2">
                Tempo de jogo: {Math.floor(bookmark[key].minutesPlayed / 60)} horas e {bookmark[key].minutesPlayed % 60} minutos
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
