// src/lib/stocks.ts
// Handles API calls for getting stock data

export async function getRandomStockData(special: boolean) {
  try {
    const res = await fetch(`/api/random-stock?special=${special}`);
    const data = await res.json();
    return data.stockdata;
  } catch (err) {
    console.error('Failed to get random stock symbol:', err);
    return null;
  }
}

export async function getPrice(symbol: string): Promise<string> {
  try {
    const res = await fetch(`/api/price/${symbol}`);
    const data = await res.json();
    return data.price || '0';
  } catch (err) {
    console.error('Error fetching price:', err);
    return '0';
  }
}
