let cardAmmount = 6;
const diffLevelSelect = document.getElementById('difficalty').addEventListener('change', function() {
  cardAmmount = +this.value
  return
});

// const cardAmmount = diffLevelSelect;
// const diffLevelSelect = document.getElementById('difficalty');
// let cardAmmount = diffLevelSelect.value ? diffLevelSelect.value : 6;
// console.log('1 -', cardAmmount)

// diffLevelSelect.addEventListener('change', () => {
//   cardAmmount = diffLevelSelect.value; // Update the cardAmmount variable whenever the select element changes
// });
// console.log('2 -', cardAmmount)
const cardArray = [];
const selectedCards = [];
const selectedCardsId = [];
let pairsFound = cardAmmount;

for (let i = 0; i < 2; i++) {
  console.log(cardAmmount)
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

console.log('3 -', cardArray);

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');

// console.log(gridDisplay);
console.log(cardArray);

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img');
    card.setAttribute('src', 'images/Cover.png');
    card.setAttribute('data-id', i);
    card.addEventListener('click', flipCard);
    // console.log(card, index);
    gridDisplay.appendChild(card);
  }
  resultDisplay.textContent = cardAmmount;
}
function checkForMatch() {
  const cards = document.querySelectorAll('img');
  const optionOneId = selectedCardsId[0];
  const optionTwoId = selectedCardsId[1];
  // console.log(selectedCards);
  console.log(pairsFound);

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
  if  (pairsFound === 0) {
    resultDisplay.textContent = 'Congratulations! You found them all!'
  }
}

function flipCard() {
  const elementId  = this.getAttribute('data-id');

  selectedCards.push(cardArray[elementId].name);
  selectedCardsId.push(elementId);
  this.setAttribute('src', cardArray[elementId].img);

  if (selectedCards.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

createBoard();
