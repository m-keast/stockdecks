import { loadCards } from './storage.js';
import { getCard, getSectorColor } from './index.js';

function renderCards(cards) {
  const container = document.getElementById('card-container');

  if (!container) return;

  container.innerHTML = '';

  if (cards.length === 0) {
    container.innerHTML = '<p>No cards yet.</p>';
    return;
  }

  cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    // Set background color based on sector
    cardDiv.style.borderColor = getSectorColor(card.sector)[0] || "#000"; // fallback border color
    cardDiv.style.backgroundColor = getSectorColor(card.sector)[1] || "#f0f0f0";

    cardDiv.innerHTML = `
      <div class="card-header">
      <span class="abbr" id="abbr1">${card.symbol}</span>
      <span class="top-number">1</span>
      </div>
      <img src="https://bpb-us-w2.wpmucdn.com/u.osu.edu/dist/6/44792/files/2017/04/stock-market-3-21gyd1b.jpg" alt="Image" class="card-image" />
      <div class="card-info">
      <span class="sector" id="sector1">${card.sector}</span>
      <span class="info-number" id="price1">$${card.price.toFixed(2)}</span>
      </div>
      <span class="title" id="stockname1">${card.name}</span>
      <p class="description" id="description1">${card.description}</p>
    `;
    container.appendChild(cardDiv);
  });
}

async function getNewCard() {
  try {
    await getCard();
  } catch (err) {
    console.error('Failed to get new stock card:', err);
  }
}



// Only run when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const newCardButton = document.getElementById('newCardButton');
  const userCards = loadCards();
  renderCards(userCards);

  newCardButton.addEventListener('click', getNewCard);
});