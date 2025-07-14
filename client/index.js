import { loadCards, saveCards, addCard } from './storage.js';

let userCards = loadCards();
const cardContainer = document.getElementById('cardContainer');

const cardList = document.getElementById('cardList');


/* Example new card object for testing
const newCard = {
  id: 'XYZ123',
  symbol: 'VALE',
  sector: 'Basic Materials',
  dateAcquired: new Date().toISOString(),
  purchasePrice: 5.42
};
addCard(newCard);
*/


// Saves to localStorage
userCards = loadCards(); // Refresh after adding

function scrollCardsRight() {
  cardList.scrollBy({ left: 300, behavior: 'smooth' });
}

function scrollCardsLeft() {
  cardList.scrollBy({ left: -300, behavior: 'smooth' });
}




export async function getCard() {
  try{
    const stock= await getRandomStockData();
    const symbol = stock.symbol;
    const name = stock.stockname;
    const sector = stock.sector;
    const description = stock.description;
    const price = await getPrice(symbol);

    const newCard = {
      id: 'XYZ123',
      symbol: symbol,
      name: name,
      sector: sector,
      price: parseFloat(price),
      description: description,
      dateAcquired: new Date().toISOString(),
    };

    // Add the new card to the storage
    addCard(newCard);
    console.log('New card added:', newCard);
    // Update the UI with the fetched data

  }
  catch (err) {
    console.error('Failed to get new stock card:', err);
  }
}



async function getThreePack() {
  console.log('Fetching three pack');
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

    let roundprice1 = Math.round(price1 * 100) / 100; // Round to 2 decimal places
    let roundprice2 = Math.round(price2 * 100) / 100; // Round to 2 decimal places
    let roundprice3 = Math.round(price3 * 100) / 100; // Round to 2 decimal places
    document.getElementById('price1').textContent = "$"+roundprice1.toFixed(2) || 'Error';
    document.getElementById('price2').textContent = "$"+roundprice2.toFixed(2) || 'Error';
    document.getElementById('price3').textContent = "$"+roundprice3.toFixed(2) || 'Error';


    document.getElementById('card1').style.backgroundColor = getSectorColor(sector1)[1]; // Set the color to the sector color for the first card
    document.getElementById('card2').style.backgroundColor = getSectorColor(sector2)[1]; // Set the color to the sector color for the second card
    document.getElementById('card3').style.backgroundColor = getSectorColor(sector3)[1]; // Set the color to the sector color for the third card
    document.getElementById('card1').style.borderColor = getSectorColor(sector1)[0]; // Set the border color to the sector color for the first card
    document.getElementById('card2').style.borderColor = getSectorColor(sector2)[0]; // Set the border color to the sector color for the second card
    document.getElementById('card3').style.borderColor = getSectorColor(sector3)[0]; // Set the border color to the sector color for the third card
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

async function getUserDeck(){
  try {
    const res = await fetch('/api/userdeck');
    const data = await res.json();
    console.log('User deck data:', data);
    return data;
  } catch (err) {
    console.error('Failed to get user deck:', err);
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

export function getSectorColor(sector) {
  switch (sector) {
    case 'Basic Materials':
      return ["rgb(138, 129, 124)", "rgb(230, 226, 224)"];
    case 'Consumer Discretionary':
      return ["rgb(255, 111, 0)", "rgb(255, 235, 205)"];
    case 'Consumer Staples':
      return ["rgb(156, 204, 101)", "rgb(234, 247, 220)"];
    case 'Energy':
      return ["rgb(255, 202, 40)", "rgb(255, 245, 200)"];
    case 'Finance':
      return ["rgb(33, 37, 41)", "	rgb(220, 222, 224)"];
    case 'Health Care':
      return ["rgb(76, 175, 80)", "rgb(220, 245, 220)"];
    case 'Industrials':
      return ["rgb(121, 85, 72)", "rgb(235, 225, 220)"];
    case 'Real Estate':
      return ["rgb(96, 125, 139)", "rgb(220, 230, 235)"];
    case 'Technology':
      return ["rgb(33, 150, 243)", "rgb(225, 240, 252)"];
    case 'Telecommunications':
      return ["rgb(156, 39, 176)", "	rgb(240, 215, 245)"];
    case 'Utilities':
      return ["rgb(63, 81, 181)", "rgb(225, 230, 250)"];
    default:
      return ["rgb(158, 158, 158)", "rgb(240, 240, 240)"];
  }
}

const btn = document.getElementById("GetThreePackButton");
if(btn){
  btn.addEventListener('click', getThreePack);
}

// Make functions available globally for inline onclick
//window.scrollCardsLeft = scrollCardsLeft;
//window.scrollCardsRight = scrollCardsRight;
