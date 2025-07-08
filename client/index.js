

    const cardList = document.getElementById('cardList');

    function scrollLeft() {
      cardList.scrollBy({ left: -300, behavior: 'smooth' });
    }

    function scrollRight() {
      cardList.scrollBy({ left: 300, behavior: 'smooth' });
    }



