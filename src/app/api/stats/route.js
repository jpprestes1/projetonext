import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const nickname = searchParams.get('nickname');
  const token = process.env.FORTNITE_API_KEY;

  if (!token) {
    return NextResponse.json({ error: 'Token não encontrado' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://fortnite-api.com/v2/stats/br/v2?name=${nickname}`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error || 'Erro desconhecido' }, { status: 500 });
    }

    return NextResponse.json(data.data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
