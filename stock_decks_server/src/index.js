


console.log("index.js loaded");
const cardList = document.getElementById('cardList');

function scrollCardsRight() {
  cardList.scrollBy({ left: 300, behavior: 'smooth' });
}

function scrollCardsLeft() {
  cardList.scrollBy({ left: -300, behavior: 'smooth' });
}

// Make functions available globally for inline onclick
window.scrollCardsLeft = scrollCardsLeft;
window.scrollCardsRight = scrollCardsRight;
