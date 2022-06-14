'use strict';

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
// const current0El = document.getElementById('current--0');
// const current1El = document.getElementById('current--1');

diceEl.classList.add('hidden');
document.getElementById('score--0').textContent = 0;
document.getElementById('score--1').textContent = 0;

const totalScores = [0, 0];
let currentPlayer = 0;
let currentScore = 0;
let noWinner = true;

btnRoll.addEventListener('click', function () {
  if (noWinner) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    const currentPlayerScoreEl = document.getElementById(
      `current--${currentPlayer}`
    );

    currentPlayerScoreEl.textContent = 0;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    if (dice !== 1) {
      currentScore += dice;
    } else {
      SwitchPlayers();
      currentScore = 0;
    }
    currentPlayerScoreEl.textContent = currentScore;
  }
});

btnHold.addEventListener('click', function () {
  if (noWinner) {
    const currentPlayerScoreEl = document.getElementById(
      `current--${currentPlayer}`
    );
    const currentPlayerScoreTotal = document.getElementById(
      `score--${currentPlayer}`
    );

    totalScores[currentPlayer] += currentScore;

    currentScore = 0;
    currentPlayerScoreTotal.textContent = totalScores[currentPlayer];
    currentPlayerScoreEl.textContent = currentScore;

    SwitchPlayers();
  }
});

btnNewGame.addEventListener('click', function () {
  diceEl.classList.add('hidden');
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;

  totalScores[0] = 0;
  totalScores[1] = 0;
  currentPlayer = 0;
  currentScore = 0;
  noWinner = true;

  const player1 = document.querySelector('.player--0');
  const player2 = document.querySelector('.player--1');
  player2.classList.remove('player--active');
  player1.classList.add('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');

  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
});

function SwitchPlayers() {
  const currentPlayerEl = document.querySelector(`.player--${currentPlayer}`);

  if (totalScores[currentPlayer] >= 100) {
    currentPlayerEl.classList.add('player--winner');
    noWinner = false;
  } else {
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    const nextPlayerEl = document.querySelector(`.player--${currentPlayer}`);

    currentPlayerEl.classList.remove('player--active');
    nextPlayerEl.classList.add('player--active');
  }
}
