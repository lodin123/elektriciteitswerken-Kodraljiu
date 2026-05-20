// Sticky header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// Highlight active nav link based on visible section
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
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
