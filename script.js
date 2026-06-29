/* ═══════════════════════════════════════════════════
   Js. Jesus CarWash — main.js
   Scroll reveal · Counter · Form validation · Rain
═══════════════════════════════════════════════════ */

'use strict';

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
const fabTop = document.querySelector('.fab-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    fabTop?.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    fabTop?.classList.remove('visible');
  }
}, { passive: true });

/* ── Scroll to top ── */
document.querySelector('.fab-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Hamburger menu ── */
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.nav-mobile');
const mobileClose = document.querySelector('.nav-mobile-close');

function openMenu()  { hamburger?.classList.add('open'); mobileMenu?.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMenu() { hamburger?.classList.remove('open'); mobileMenu?.classList.remove('open'); document.body.style.overflow = ''; }

hamburger?.addEventListener('click', openMenu);
mobileClose?.addEventListener('click', closeMenu);
document.querySelectorAll('.nav-mobile a').forEach(a => a.addEventListener('click', closeMenu));

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── Reveal on scroll ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = parseInt(e.target.dataset.delay) || 0;
      setTimeout(() => e.target.classList.add('visible'), delay);
      revealIO.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealIO.observe(el));

/* ── Counter animation ── */
function animateCounter(el, target, duration = 2000, suffix = '') {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.round(start).toLocaleString() + suffix;
  }, 16);
}

const statsIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = document.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const val    = parseInt(num.dataset.target);
        const suffix = num.dataset.suffix || '';
        animateCounter(num, val, 2000, suffix);
      });
      statsIO.disconnect();
    }
  });
}, { threshold: 0.3 });

const statsSection = document.getElementById('stats');
if (statsSection) statsIO.observe(statsSection);

/* ── Rain drops ── */
function buildRain() {
  const container = document.querySelector('.hero-rain');
  if (!container) return;
  const count = window.innerWidth > 768 ? 35 : 18;
  for (let i = 0; i < count; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    const height = 40 + Math.random() * 80;
    drop.style.cssText = `
      left: ${Math.random() * 100}%;
      height: ${height}px;
      animation-duration: ${0.6 + Math.random() * 1.2}s;
      animation-delay: -${Math.random() * 2}s;
      opacity: ${0.2 + Math.random() * 0.5};
    `;
    container.appendChild(drop);
  }
}
buildRain();

/* ── Form validation ── */
const form = document.getElementById('booking-form');
const formWrap   = document.querySelector('.booking-form');
const formSuccess = document.querySelector('.form-success');

function validateField(group) {
  const input = group.querySelector('input, select, textarea');
  const error = group.querySelector('.error');
  if (!input) return true;
  const val = input.value.trim();
  let valid = true;
  let msg   = '';

  if (input.required && !val)              { valid = false; msg = 'Este campo es requerido.'; }
  else if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
                                           { valid = false; msg = 'Correo no válido.'; }
  else if (input.type === 'tel' && val && !/^\+?[\d\s\-]{7,}$/.test(val))
                                           { valid = false; msg = 'Teléfono no válido.'; }

  group.classList.toggle('invalid', !valid);
  if (error) { error.textContent = msg; error.style.display = valid ? 'none' : 'block'; }
  return valid;
}

/* Live validation */
document.querySelectorAll('.form-group').forEach(group => {
  const input = group.querySelector('input, select, textarea');
  input?.addEventListener('blur', () => validateField(group));
  input?.addEventListener('input', () => {
    if (group.classList.contains('invalid')) validateField(group);
  });
});

form?.addEventListener('submit', e => {
  e.preventDefault();
  const groups = form.querySelectorAll('.form-group');
  let allValid = true;
  groups.forEach(g => { if (!validateField(g)) allValid = false; });
  if (!allValid) return;

  /* Simular envío */
  const btn = form.querySelector('.btn-submit');
  btn.textContent = 'Enviando…';
  btn.disabled = true;

  setTimeout(() => {
    if (formWrap && formSuccess) {
      formWrap.querySelector('form').style.display = 'none';
      formSuccess.style.display = 'block';
    }
  }, 1400);
});

/* ── Gallery hover sound-free zoom (handled by CSS) ── */

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${e.target.id}`
          ? 'rgba(255,255,255,1)'
          : 'rgba(255,255,255,0.55)';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionIO.observe(s));

/* ── Navbar reveal on load ── */
document.querySelector('.hero-content')?.classList.add('visible');


