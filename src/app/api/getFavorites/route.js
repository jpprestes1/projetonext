import { NextResponse } from 'next/server';

export async function GET(req) {

  try {
    

    const data = localStorage.getItem("fortniteBase");

    if (!response.ok) {
      return NextResponse.json({ error: data.error || 'Erro desconhecido' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
