// API route for fetching stock price by symbol
// Uses twelvedata API for stock prices

import { NextRequest, NextResponse } from 'next/server';

type ParamsContext = {
  params: {
    symbol: string;
  };
};

export async function GET(_request: NextRequest, context: unknown) {
  const { symbol } = await (context as ParamsContext).params;
  const apiKey = process.env.TWELVEDATA_API_KEY;

  console.log("diabled price api call. Go to api/price/route to fix")
  //temporary disable call of price api ****************************************
  return NextResponse.json({ error: 'Failed to fetch price' }, { status: 500 });
  //*************************************************************** */

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not found' }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`
    );
    const data = await res.json();
    console.log("In API getting: https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}")
    return NextResponse.json({ price: data.price });
  } catch (err) {
    console.error('Price API error:', err);
    return NextResponse.json({ error: 'Failed to fetch price' }, { status: 500 });
  }
}
