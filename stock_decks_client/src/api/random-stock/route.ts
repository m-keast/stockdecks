import { NextResponse } from 'next/server';
import { readRandomStock } from '@/lib/readCsv';

export async function GET() {
  try {
    const stock = await readRandomStock();
    return NextResponse.json({ stockdata: stock });
  } catch (err) {
    console.error('Random stock error:', err);
    return NextResponse.json({ error: 'Failed to load stock' }, { status: 500 });
  }
}