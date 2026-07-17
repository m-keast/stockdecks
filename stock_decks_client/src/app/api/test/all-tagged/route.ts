//API route to help testing page test-cards. Remove along with app/test-cards
// and readCsv -> readAllTaggedStocks function


import { NextResponse } from 'next/server';
import { readAllTaggedStocks } from '@/lib/readCsv';

export async function GET() {
  try {
    return NextResponse.json({ stocks: await readAllTaggedStocks('sp') });
  } catch (err) {
    console.error('all-tagged error:', err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}