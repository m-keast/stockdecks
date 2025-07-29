import { NextRequest, NextResponse } from 'next/server';

type ParamsContext = {
  params: {
    symbol: string;
  };
};

export async function GET(_request: NextRequest, context: unknown) {
  const { symbol } = (context as ParamsContext).params;
  const apiKey = process.env.TWELVE_DATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not found' }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`
    );
    const data = await res.json();

    return NextResponse.json({ price: data.price });
  } catch (err) {
    console.error('Price API error:', err);
    return NextResponse.json({ error: 'Failed to fetch price' }, { status: 500 });
  }
}
