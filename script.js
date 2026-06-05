// =====================
// SPARKLE CURSOR
// =====================
const canvas = document.getElementById('sparkleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const sparkles = [];
const sparkleColors = ['#f9b8d4', '#c9b8f9', '#b8f0e0', '#ffd4b8', '#fff0b8'];

document.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 3; i++) {
    sparkles.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 6 + 2,
      color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3 - 1,
      alpha: 1,
      char: Math.random() > 0.5 ? '✦' : '·'
    });
  }
});

function animateSparkles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = sparkles.length - 1; i >= 0; i--) {
    const s = sparkles[i];
    s.x += s.vx;
    s.y += s.vy;
    s.alpha -= 0.025;
    if (s.alpha <= 0) { sparkles.splice(i, 1); continue; }
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = s.color;
    ctx.font = `${s.size * 2}px sans-serif`;
    ctx.fillText(s.char, s.x, s.y);
    ctx.restore();
  }
  requestAnimationFrame(animateSparkles);
}
animateSparkles();

// =====================
// TYPING TAGLINE
// =====================
const taglines = [
  'robotics student · dancer · drama addict 🍣',
  'coffee first, everything else second ☕',
  'going to korea in 2 weeks 🇰🇷✨',
  'if u laugh i laugh, if u cry i cry 🤍',
  'sweetest person + loudest in the room 😂',
  'tiramisu is my love language ☕🍰',
  'sushi with wasabi. always. non-negotiable 🍣',
];

let taglineIndex = 0;
let charIndex = 0;
let isDeleting = false;
const taglineEl = document.getElementById('typedTagline');

function typeTagline() {
  const current = taglines[taglineIndex];
  if (!isDeleting) {
    taglineEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeTagline, 2200);
      return;
    }
  } else {
    taglineEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      taglineIndex = (taglineIndex + 1) % taglines.length;
    }
  }
  setTimeout(typeTagline, isDeleting ? 40 : 70);
}
typeTagline();

// =====================
// STARS BACKGROUND
// =====================
function createStars() {
  const container = document.getElementById('starsBg');
  const count = 60;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = (Math.random() * 4 + 2).toFixed(1);
    const delay = (Math.random() * 5).toFixed(1);
    const colors = ['#c9b8f9', '#f9b8d4', '#b8f0e0', '#ffd4b8', '#fff0b8'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    star.style.cssText = `width:${size}px;height:${size}px;left:${x}%;top:${y}%;background:${color};--dur:${dur}s;--delay:-${delay}s;`;
    if (Math.random() > 0.75) {
      star.style.background = 'transparent';
      star.style.fontSize = `${size * 3}px`;
      star.innerHTML = '✦';
      star.style.color = color;
      star.style.borderRadius = '0';
    }
    container.appendChild(star);
  }
}
createStars();

// =====================
// NAVBAR SCROLL
// =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// =====================
// MOBILE MENU
// =====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
});
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.textContent = '☰';
}

// =====================
// SCROLL REVEAL
// =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fact-card, .interest-card, .project-card, .goals-col, .timeline-item, .gallery-item, .contact-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
  observer.observe(el);
});

// =====================
// ACTIVE NAV LINK
// =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? '#e87aac' : '';
  });
});

// =====================
// QUOTE GENERATOR
// =====================
const quotes = [
  '"If you laugh, I laugh. If you cry, I cry. That\'s just me."',
  '"Mom\'s biryani > every restaurant. Non-negotiable."',
  '"Sushi without wasabi and soy sauce is not sushi."',
  '"Coffee is not a want. It\'s a need."',
  '"From ITE to NUS — if I can do it, you can too. 🌸"',
  '"Tiramisu is literally a hug in dessert form. ☕"',
  '"Korea in 2 weeks and I am NOT calm. 🇰🇷"',
  '"The best surprises are the ones made with love. 🎁"',
  '"Dance taught me everything engineering couldn\'t."',
  '"Friends-to-lovers slowburn or I don\'t want it. 😭"',
  '"My sister is 6 and already running circles around me. 🤍"',
  '"Build things. Break things. Learn things. Repeat."',
];

let lastQuote = -1;
function newQuote() {
  let idx;
  do { idx = Math.floor(Math.random() * quotes.length); } while (idx === lastQuote);
  lastQuote = idx;
  const el = document.getElementById('quoteText');
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = quotes[idx];
    el.style.opacity = '1';
  }, 300);
}

// =====================
// VIBES BAR DUPLICATE for seamless scroll
// =====================
const pillsContainer = document.querySelector('.vibes-pills');
if (pillsContainer) {
  pillsContainer.innerHTML += pillsContainer.innerHTML;
}
