
export function loadCards() {
  return JSON.parse(localStorage.getItem("userCards")) || [];
}

export function saveCards(cards) {
  localStorage.setItem("userCards", JSON.stringify(cards));
}

export function addCard(newCard) {
  const cards = loadCards();
  cards.push(newCard);
  saveCards(cards);
}

export function clearCards() {
  localStorage.removeItem("userCards");
}