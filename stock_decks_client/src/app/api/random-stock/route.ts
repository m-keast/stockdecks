// API route to fetch a random stock

import { NextResponse } from 'next/server';
import { readRandomStock } from '@/lib/readCsv';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const special = searchParams.get('special') === 'true';
    const stock = await readRandomStock(special);
    return NextResponse.json({ stockdata: stock });
  } catch (err) {
    console.error('Random stock error:', err);
    return NextResponse.json({ error: 'Failed to load stock' }, { status: 500 });
  }
}