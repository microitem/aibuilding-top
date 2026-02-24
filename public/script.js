/* =========================================
   aibuilding.top — script.js (v2)
   ========================================= */

/* ---- NAV SCROLL ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ---- LANGUAGE SWITCHER ---- */
const langBtn = document.getElementById('langBtn');

function applyLang(lang) {
  document.body.dataset.lang = lang;
  langBtn.textContent = lang === 'sk' ? 'EN' : 'SK';
  document.querySelectorAll('[data-sk]').forEach(el => {
    const text = el.dataset[lang];
    if (text !== undefined) el.textContent = text;
  });
  document.querySelectorAll('[data-sk-placeholder]').forEach(el => {
    el.placeholder = lang === 'sk' ? el.dataset.skPlaceholder : el.dataset.enPlaceholder;
  });
}

if (langBtn) {
  langBtn.addEventListener('click', () => {
    const current = document.body.dataset.lang || 'sk';
    applyLang(current === 'sk' ? 'en' : 'sk');
  });
}

/* ---- FADE-UP OBSERVER ---- */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || '0', 10);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
