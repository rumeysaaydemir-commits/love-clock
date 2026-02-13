let tz = 'Europe/Istanbul';

const clock = document.getElementById('clock');
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const menu = document.getElementById('menu');
const audio = document.getElementById('pop');

// SAAT GÜNCELLEME
function updateClock() {
  const now = new Date().toLocaleString('en-US', { timeZone: tz });
  const d = new Date(now);

  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');

  clock.textContent = `${h}:${m}`;

  // HER SAATİN İLK 1 DAKİKASI → ÖPÜŞME
  if (d.getMinutes() === 0) {
    img1.style.opacity = 0;
    img2.style.opacity = 1;
  } else {
    img1.style.opacity = 1;
    img2.style.opacity = 0;
  }
}

setInterval(updateClock, 1000);
updateClock();

// AYAR MENÜSÜ
function toggleMenu(e) {
  e.stopPropagation();
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function setTZ(t) {
  tz = t;
  menu.style.display = 'none';
  updateClock();
}

// SPOTIFY AÇ
function openSpotify(e) {
  e.stopPropagation();
  window.open('https://open.spotify.com/playlist/2iQAeE6TLbaRGGng3OvAHZ', '_blank');
}

// KALP PARÇACIKLARI
const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');
canvas.width = 260;
canvas.height = 260;

let particles = [];

function spawnHearts() {
  audio.currentTime = 0;
  audio.play();

  for (let i = 0; i < 20; i++) {
    particles.push({
      x: Math.random() * 260,
      y: Math.random() * 260,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      life: 80
    });
  }
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.fillStyle = '#ff6fa5';
    ctx.fillRect(p.x, p.y, 4, 4);

    p.x += p.dx;
    p.y += p.dy;
    p.life--;
  });

  particles = particles.filter(p => p.life > 0);
  requestAnimationFrame(drawHearts);
}

drawHearts();
