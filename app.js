'use strict';

/* ========================
        Chose game
==========================*/

const startModal = document.querySelector('.choose-game-modal');
const chooseBtns = document.querySelectorAll('.choose-btn');
const gameContainer = document.querySelector('.game-container');
const imgContainer = document.querySelector('.img-wrapper');
const result = document.querySelector('.result');
const scoreBoard = document.querySelector('.score');
const rules = document.querySelector('.rules');
const logo = document.querySelector('.img-logo');

let player = undefined;
let house = undefined;
let data = undefined;
let score1 = Number(localStorage.getItem('scoreSimple'));
let score2 = Number(localStorage.getItem('scoreAdvanced'));

function chooseGame(e) {
  if (e.currentTarget.classList.contains('simple-game')) {
    data = data1;
    scoreBoard.textContent = score1;
    loadItems();
    delayHidden(startModal);
  }
  if (e.currentTarget.classList.contains('advanced-game')) {
    data = data2;
    scoreBoard.textContent = score2;
    logo.src = 'images/logo-bonus.svg';
    rules.src = 'images/image-rules-bonus.svg';
    delayHidden(startModal);
    imgContainer.classList.add('advanced');
    loadItems();
  }
}
function delayHidden(element) {
  setTimeout(() => {
    element.classList.add('hidden');
  }, 500);
}
/* ========================
 Setting simple game board
==========================*/
function loadItems() {
  const itemsData = data
    .map(item => {
      const { title, img, type } = item;

      return ` 
      <div class="game-item ${type}" data-id="${type}">
      <img src="${img}" alt="${title}" />
    </div>
   `;
    })
    .join('');
  imgContainer.innerHTML = itemsData;
  const items = document.querySelectorAll('.img-wrapper .game-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const choice = item.getAttribute('data-id');
      select(items);
      const playerChoice = document.querySelector('.player_choice');
      const houseChoice = document.querySelector('.house_choice');
      const displayResult = document.querySelector('.display-result');
      const paragraph = document.querySelector('.message');
      settingPlayerChoice(choice, playerChoice);
      settingHouseChoice(houseChoice);
      removeHidden(displayResult);
      const playerHand = document.querySelector('.player_choice .game-item');
      const houseHand = document.querySelector('.house_choice .game-item');
      checkWinner(paragraph, playerHand, houseHand);
      const resetBtn = document.querySelector('.result-btn');
      resetBtn.addEventListener('click', playAgain);
    });
  });
}

function select(arr) {
  for (let el of arr) {
    el.classList.add('hidden');
    gameContainer.classList.add('active-choose');
    imgContainer.classList.add('hidden');
    result.classList.remove('hidden');
  }
}

function settingPlayerChoice(item, container) {
  player = item;
  return (container.innerHTML = `<div class="game-item ${item}" data-id="${item}">
<img src="images/icon-${item}.svg" alt="item game ${item}" />
</div>
<p>you picked</p>`);
}

function settingHouseChoice(container) {
  const choice = [];
  for (const el of data) {
    choice.push(el.type);
  }
  const randomChoice = choice[Math.floor(Math.random() * choice.length)];
  house = `${randomChoice}`;
  return (container.innerHTML = `<div class="game-item" data-id="${randomChoice}">
<img src="images/icon-${randomChoice}.svg" alt="item game ${randomChoice}" />
</div>
<p>the house picked</p>`);
}

function removeHidden(element) {
  setTimeout(() => {
    element.classList.remove('hidden');
  }, 0);
}

/* ========================
    Ceck winner
==========================*/

function checkWinner(container, win1, win2) {
  let message = undefined;
  if (player === house) {
    message = "It's a draw";
  } else if (
    (player === 'paper' && (house === 'rock' || house === 'spock')) ||
    (player === 'rock' && (house === 'scissors' || house === 'lizard')) ||
    (player === 'scissors' && (house === 'paper' || house === 'lizard')) ||
    (player === 'lizard' && (house === 'spock' || house === 'paper')) ||
    (player === 'spock' && (house === 'scissors' || house === 'rock'))
  ) {
    message = 'you win';
    win1.classList.add('winner');
    if (imgContainer.classList.contains('advanced')) {
      score2++;
      scoreBoard.textContent = score2;
      localStorage.setItem('scoreAdvanced', score2);
    } else {
      score1++;
      scoreBoard.textContent = score1;
      localStorage.setItem('scoreSimple', score1);
    }
  } else {
    message = 'you loose';
    win2.classList.add('winner');
    if (imgContainer.classList.contains('advanced') && score2 > 0) {
      score2--;
      scoreBoard.textContent = score2;
      localStorage.setItem('scoreAdvanced', score2);
    } else if (!imgContainer.classList.contains('advanced') && score1 > 0) {
      score1--;
      scoreBoard.textContent = score1;
      localStorage.setItem('scoreSimple', score1);
    }
  }
  container.textContent = message;
}
function playAgain() {
  result.classList.add('hidden');
  gameContainer.classList.remove('active-choose');
  imgContainer.classList.remove('hidden');
  loadItems();
}

chooseBtns.forEach(btn => {
  btn.addEventListener('click', chooseGame);
});

/* ========================
    Rules modal
==========================*/
const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('.btn');
const closeModalBtn = document.querySelector('.close-modal');
openModalBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});
closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});