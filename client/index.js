


console.log("index.js loaded");
const cardList = document.getElementById('cardList');

function scrollCardsRight() {
  cardList.scrollBy({ left: 300, behavior: 'smooth' });
}

function scrollCardsLeft() {
  cardList.scrollBy({ left: -300, behavior: 'smooth' });
}


async function getThreePack() {
  try{
    const symbol1 = await getRandomStockSymbol();
    const symbol2 = await getRandomStockSymbol();
    const symbol3 = await getRandomStockSymbol();
    console.log('Three pack symbols:', symbol1, symbol2, symbol3);

    // Update the UI with the fetched symbols
    document.getElementById('abbr1').textContent = symbol1 || 'Error';
    document.getElementById('abbr2').textContent = symbol2 || 'Error';
    document.getElementById('abbr3').textContent = symbol3 || 'Error';
    
    const price1 = await getPrice(symbol1);
    const price2 = await getPrice(symbol2);
    const price3 = await getPrice(symbol3);
    console.log('Three pack prices:', price1, price2, price3);

    // Update the UI with the fetched prices
    document.getElementById('price1').textContent = price1 || 'Error';
    document.getElementById('price2').textContent = price2 || 'Error';
    document.getElementById('price3').textContent = price3 || 'Error';

  }
  catch (err) {
    console.error('Failed to get three pack symbols:', err);
  }

}

async function getRandomStockSymbol() {
  try {
    const res = await fetch('/api/random-symbol');
    const data = await res.json();
    //console.log('Random symbol:', data.symbol);
    return data.symbol;
  } catch (err) {
    console.error('Failed to get random stock symbol:', err);
    return null;
  }
}


//Get Stock Price with Twelve Data API
async function getPrice(symbol) {
  try {
    const res = await fetch(`/api/price/${symbol}`);
    const data = await res.json();
    console.log(`Price data for ${symbol}:`, data);
    return data.price || 'Error';
  } catch (err) {
    console.error('Error fetching price:', err);
  }
}

// Make functions available globally for inline onclick
window.scrollCardsLeft = scrollCardsLeft;
window.scrollCardsRight = scrollCardsRight;
