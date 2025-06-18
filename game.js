const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('#score');
const timeBoard = document.querySelector('#time');
const startButton = document.querySelector('#start');

const images = ['appa.png','hav.png','lak.png','nav.png','nim.png','premi.png','sandya.png'];

let lastHole;
let timeUp = false;
let score = 0;
let time = 30;
let timerInterval;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const timeDelay = randomTime(600, 1200);
  const hole = randomHole(holes);
  const img = hole.querySelector('img');
  img.src = 'images/' + images[Math.floor(Math.random() * images.length)];
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, timeDelay);
}

function startGame() {
  score = 0;
  scoreBoard.textContent = score;
  time = 30;
  timeBoard.textContent = time;
  timeUp = false;
  peep();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    time--;
    timeBoard.textContent = time;
    if (time <= 0) {
      timeUp = true;
      clearInterval(timerInterval);
    }
  }, 1000);
}

function whack(e) {
  if (!e.isTrusted) return; // prevent fake clicks
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

holes.forEach(hole => hole.addEventListener('click', whack));
startButton.addEventListener('click', startGame);
