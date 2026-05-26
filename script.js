// Particles.js
particlesJS('particles-js', {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: ['#c94040', '#ffffff', '#a83232'] },
    shape: { type: 'circle' },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#c94040',
      opacity: 0.25,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: 'none',
      random: true,
      out_mode: 'out',
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' },
    },
    modes: {
      grab: { distance: 160, line_linked: { opacity: 0.6 } },
      push: { particles_nb: 3 },
    },
  },
  retina_detect: true,
});

// Scroll animaties
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 80,
});

// 3D parallax effect on hero
const hero = document.querySelector('.hero');
const heroText = document.querySelector('.hero-text');

if (hero && heroText) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    hero.style.setProperty('--px', x);
    hero.style.setProperty('--py', y);
    heroText.style.transform = `translate(${x * 18}px, ${y * 12}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    heroText.style.transform = 'translate(0, 0)';
    hero.style.setProperty('--px', 0);
    hero.style.setProperty('--py', 0);
  });
}

// Reviews slider
(function () {
  const track = document.getElementById('reviews-track');
  const dotsContainer = document.getElementById('reviews-dots');
  if (!track) return;

  const cards = track.querySelectorAll('.review-card');
  let current = 0;
  let perView = window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
  const total = Math.ceil(cards.length / perView);

  // Maak dots
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  function goTo(index) {
    current = (index + total) % total;
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * perView * cardWidth}px)`;
    dotsContainer.querySelectorAll('.dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  document.getElementById('reviews-prev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('reviews-next').addEventListener('click', () => goTo(current + 1));

  // Auto-slide elke 4 seconden
  setInterval(() => goTo(current + 1), 4000);

  window.addEventListener('resize', () => {
    perView = window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
    goTo(0);
  });
})();

// Realisaties filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.masonry-item').forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.style.opacity = match ? '1' : '0.2';
      item.style.transform = match ? 'scale(1)' : 'scale(0.95)';
      item.style.pointerEvents = match ? 'auto' : 'none';
    });
  });
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Sluit menu bij klik op link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Sticky header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// Highlight active nav link based on visible section
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinkItems.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => observer.observe(section));

// Contact form — show success message, let Netlify handle the actual POST
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  // On live Netlify site: remove e.preventDefault() to let the POST go through,
  // or keep it for local testing and handle submission via fetch below.
  // For simplicity we submit normally (Netlify intercepts the POST server-side).

  // Show the success message after a brief delay so the user sees it
  // (only works when JS intercepts; on Netlify the page will redirect to a thank-you page).
  // To use Netlify's AJAX submission, uncomment the fetch block below.

  /*
  e.preventDefault();
  const data = new FormData(form);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString(),
  })
    .then(() => {
      form.reset();
      successMsg.hidden = false;
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    })
    .catch(() => alert('Something went wrong. Please try again.'));
  */
});
