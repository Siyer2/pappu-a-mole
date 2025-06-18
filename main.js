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
let maintainInterval;
let activeFaces = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole() {
  const available = Array.from(holes).filter(h => !h.classList.contains('active'));
  if (available.length === 0) return null;
  const idx = Math.floor(Math.random() * available.length);
  const hole = available[idx];
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
  const min = 600 - progress * 500; // shrinks from 600ms to ~100ms
  const max = 1200 - progress * 900; // shrinks from 1200ms to ~300ms
  return randomTime(min, max);
}

function getNumFaces() {
  const elapsed = Date.now() - startTime;
  const progress = Math.min(elapsed / 30000, 1);
  if (progress < 0.33) return 1;
  if (progress < 0.66) return 2;
  return 3;
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
  if (!hole) return;
  const moleDiv = hole.querySelector('.mole');
  moleDiv.innerHTML = '';
  moleDiv.appendChild(nextImage());
  hole.classList.add('active');
  activeFaces++;
  setTimeout(() => {
    hole.classList.remove('active');
    activeFaces--;
  }, time);
}

function maintainFaces() {
  const target = getNumFaces();
  while (!timeUp && activeFaces < target) {
    showFace();
  }
}

function startGame() {
  score = 0;
  scoreEl.textContent = score;
  messageEl.textContent = '';
  timeUp = false;
  startTime = Date.now();
  timeEl.textContent = '30.0';
  activeFaces = 0;
  clearInterval(countdownInterval);
  clearInterval(maintainInterval);
  countdownInterval = setInterval(updateCountdown, 100);
  maintainInterval = setInterval(maintainFaces, 200);
  maintainFaces();
  gameInterval = setTimeout(() => {
    timeUp = true;
    clearInterval(countdownInterval);
    clearInterval(maintainInterval);
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
  clearInterval(maintainInterval);
  holes.forEach(h => h.classList.remove('active'));
  startGame();
});
