const holes = document.querySelectorAll('.hole');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const messageEl = document.getElementById('message');

// List of images in the images directory
const images = [
  'images/appa.png',
  'images/hav.png',
  'images/lak.png',
  'images/nav.png',
  'images/nim.png',
  'images/premi.png',
  'images/sandya.png'
];
let imageIndex = 0;
let lastHole;
let timeUp = true;
let score = 0;
let gameInterval;
let countdownInterval;
let startTime;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole() {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole();
  }
  lastHole = hole;
  return hole;
}

function nextImage() {
  const img = new Image();
  img.src = images[imageIndex];
  img.alt = 'face';
  imageIndex = (imageIndex + 1) % images.length;
  return img;
}

function getFaceTime() {
  const elapsed = Date.now() - startTime;
  const progress = Math.min(elapsed / 30000, 1);
  const min = 600 - progress * 300;
  const max = 1200 - progress * 500;
  return randomTime(min, max);
}

function updateCountdown() {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(30 - elapsed / 1000, 0);
  timeEl.textContent = remaining.toFixed(1);
  if (remaining <= 0) {
    clearInterval(countdownInterval);
  }
}

function showFace() {
  const time = getFaceTime();
  const hole = randomHole();
  const moleDiv = hole.querySelector('.mole');
  moleDiv.innerHTML = '';
  moleDiv.appendChild(nextImage());
  hole.classList.add('active');
  setTimeout(() => {
    hole.classList.remove('active');
    if (!timeUp) showFace();
  }, time);
}

function startGame() {
  score = 0;
  scoreEl.textContent = score;
  messageEl.textContent = '';
  timeUp = false;
  startTime = Date.now();
  timeEl.textContent = '30.0';
  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 100);
  showFace();
  gameInterval = setTimeout(() => {
    timeUp = true;
    clearInterval(countdownInterval);
    messageEl.textContent = 'Game over!';
    holes.forEach(h => h.classList.remove('active'));
  }, 30000); // 30 seconds game
}

holes.forEach(hole => {
  hole.addEventListener('click', e => {
    if (!e.isTrusted) return; // prevent fake clicks
    if (!hole.classList.contains('active')) return;
    score++;
    hole.classList.remove('active');
    scoreEl.textContent = score;
  });
});

startBtn.addEventListener('click', () => {
  clearTimeout(gameInterval);
  clearInterval(countdownInterval);
  holes.forEach(h => h.classList.remove('active'));
  startGame();
});
