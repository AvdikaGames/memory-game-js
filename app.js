let cardAmmount = 6;

const radios = document.querySelectorAll('input[name="difficulty"]');
radios.forEach(function (radio) {
  radio.addEventListener('change', function () {
    if (this.checked) {
      cardAmmount = +this.value;
      cardArray.length = 0;
      clearGrid();
      createCardArray();
      createBoard();
    }
  });
});

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
const cardArray = [];
const selectedCards = [];
const selectedCardsId = [];
let pairsFound = cardAmmount;

function createCardArray() {
  for (let i = 0; i < 2; i++) {
    for (let n = 0; n < cardAmmount; n++) {
      cardArray.push(
        {
          name: 'Card' + (n + 1),
          img: 'images/Card' + (n + 1) + '.png',
        }
      )
    }
  }
  cardArray.sort(() => 0.5 - Math.random());
}


function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img');
    card.setAttribute('src', 'images/Cover.png');
    card.setAttribute('data-id', i);
    card.addEventListener('click', flipCard);
    gridDisplay.appendChild(card);
  }
  resultDisplay.textContent = cardAmmount;
}
function checkForMatch() {
  const cards = document.querySelectorAll('img');
  const optionOneId = selectedCardsId[0];
  const optionTwoId = selectedCardsId[1];

  if (selectedCards[0] === selectedCards[1]) {
    cards[optionOneId].setAttribute('src', 'images/White.png');
    cards[optionTwoId].setAttribute('src', 'images/White.png');
    cards[optionOneId].removeEventListener('click', flipCard);
    cards[optionTwoId].removeEventListener('click', flipCard);
    pairsFound -= 1;
  } else {
    cards[optionOneId].setAttribute('src', 'images/Cover.png');
    cards[optionTwoId].setAttribute('src', 'images/Cover.png');
  }
  selectedCards.length = 0;
  selectedCardsId.length = 0;
  resultDisplay.textContent = pairsFound;
  if (pairsFound === 0) {
    resultDisplay.textContent = 'Congratulations! You found them all!'
  }
}

function flipCard() {
  const elementId = this.getAttribute('data-id');

  selectedCards.push(cardArray[elementId].name);
  selectedCardsId.push(elementId);
  this.setAttribute('src', cardArray[elementId].img);

  if (selectedCards.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

function clearGrid() {
  const childs = gridDisplay.querySelectorAll('img');
  childs.forEach((child) => child.remove());
}

createCardArray();
createBoard();
