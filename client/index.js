

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
    const stock1= await getRandomStockData();
    const stock2 = await getRandomStockData();
    const stock3 = await getRandomStockData();
    const symbol1 = stock1.symbol;
    const symbol2 = stock2.symbol;
    const symbol3 = stock3.symbol;
    const name1 = stock1.stockname;
    const name2 = stock2.stockname;
    const name3 = stock3.stockname;
    const sector1 = stock1.sector;
    const sector2 = stock2.sector;
    const sector3 = stock3.sector;
    const description1 = stock1.description;
    const description2 = stock2.description;
    const description3 = stock3.description;

    console.log('Three pack symbols:', symbol1, symbol2, symbol3);
    console.log('Three pack stocks:', symbol1, symbol2, symbol3);
    console.log('Three pack sectors:', sector1, sector2, sector3);
    console.log('Three pack descriptions:', description1, description2, description3);

    const price1 = await getPrice(symbol1);
    const price2 = await getPrice(symbol2);
    const price3 = await getPrice(symbol3);
    console.log('Three pack prices:', price1, price2, price3);

    // Update the UI with the fetched symbols
    document.getElementById('abbr1').textContent = symbol1 || 'Error';
    document.getElementById('abbr2').textContent = symbol2 || 'Error';
    document.getElementById('abbr3').textContent = symbol3 || 'Error';
    
    // Update the UI with the fetched stock names
    document.getElementById('stockname1').textContent = name1 || 'Error';
    document.getElementById('stockname2').textContent = name2 || 'Error';
    document.getElementById('stockname3').textContent = name3 || 'Error';

    // Update the UI with the fetched sectors
    document.getElementById('sector1').textContent = sector1 || 'Error';
    document.getElementById('sector2').textContent = sector2 || 'Error';
    document.getElementById('sector3').textContent = sector3 || 'Error';

    // Update the UI with the fetched descriptions
    document.getElementById('description1').textContent = description1 || 'Error';
    document.getElementById('description2').textContent = description2 || 'Error';
    document.getElementById('description3').textContent = description3 || 'Error';

    // Update the UI with the fetched prices

    roundprice1 = Math.round(price1 * 100) / 100; // Round to 2 decimal places
    roundprice2 = Math.round(price2 * 100) / 100; // Round to 2 decimal places
    roundprice3 = Math.round(price3 * 100) / 100; // Round to 2 decimal places
    document.getElementById('price1').textContent = "$"+roundprice1.toFixed(2) || 'Error';
    document.getElementById('price2').textContent = "$"+roundprice2.toFixed(2) || 'Error';
    document.getElementById('price3').textContent = "$"+roundprice3.toFixed(2) || 'Error';

  }
  catch (err) {
    console.error('Failed to get three pack symbols:', err);
  }

}

async function getRandomStockData() {
  try {
    
    const res = await fetch('/api/random-stock');
    const data = await res.json();
    //console.log('Random symbol:', data.symbol);
    console.log('Full response from API:', data);
    return data.stockdata;
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
