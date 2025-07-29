// API route to fetch user deck data

import { NextResponse } from 'next/server';
import { loadCards } from '@/lib/storage';

export async function GET() {
  try {
    const data = loadCards(); // This reads from localStorage on client — won't work here
    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error('User deck fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch user deck' }, { status: 500 });
  }
}