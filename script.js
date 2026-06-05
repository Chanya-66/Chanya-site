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

    // Alternate star colors
    const colors = ['#c9b8f9', '#f9b8d4', '#b8f0e0', '#ffd4b8', '#fff0b8'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      background: ${color};
      --dur: ${dur}s;
      --delay: -${delay}s;
    `;

    // Some stars as ✨ text
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
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
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

document.querySelectorAll('.fact-card, .interest-card, .project-card, .goals-col, .timeline-item, .gallery-item, .contact-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#e87aac';
    }
  });
});
