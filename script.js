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


(function IntroController() {
 
  'use strict';
 
  /* ── Referencias DOM ── */
  const screen     = document.getElementById('intro-screen');
 
  /* Si por alguna razón no existe el elemento, salir sin romper nada */
  if (!screen) return;
 
  const canvas     = document.getElementById('intro-particles-canvas');
  const glow       = screen.querySelector('.intro-glow');
  const carWrapper = screen.querySelector('.intro-car-wrapper');
  const logoWrap   = screen.querySelector('.intro-logo-wrap');
  const loaderWrap = screen.querySelector('.intro-loader-wrap');
  const loaderFill = document.getElementById('intro-loader-fill');
 
  /* ── Bloquear scroll mientras dure la intro ── */
  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
 
  /* ── Partículas en canvas ── */
  const ctx = canvas ? canvas.getContext('2d') : null;
  let particles  = [];
  let animFrameId = null;
 
  function resizeCanvas() {
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
 
  function createParticle() {
    return {
      x:      Math.random() * window.innerWidth,
      y:      Math.random() * window.innerHeight,
      r:      0.6 + Math.random() * 2.2,
      alpha:  0,
      maxA:   0.12 + Math.random() * 0.35,
      speed:  0.15 + Math.random() * 0.35,
      angle:  Math.random() * Math.PI * 2,
      drift:  (Math.random() - 0.5) * 0.008,
      /* Color: mezcla entre azul brillante y blanco */
      hue:    210 + Math.floor(Math.random() * 30),
      sat:    70  + Math.floor(Math.random() * 30),
      phase:  Math.random() * Math.PI * 2,
    };
  }
 
  function initParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      const p = createParticle();
      /* Distribuirlas con alpha ya parcial para que no aparezcan todas de golpe */
      p.alpha = Math.random() * p.maxA * 0.5;
      particles.push(p);
    }
  }
 
  function drawParticles(timestamp) {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    particles.forEach(p => {
      /* Movimiento suave */
      p.angle  += p.drift;
      p.x      += Math.cos(p.angle) * p.speed;
      p.y      += Math.sin(p.angle) * p.speed * 0.6;
      p.phase  += 0.012;
 
      /* Wrap-around suave */
      if (p.x < -8)              p.x = canvas.width  + 4;
      if (p.x > canvas.width  + 8) p.x = -4;
      if (p.y < -8)              p.y = canvas.height + 4;
      if (p.y > canvas.height + 8) p.y = -4;
 
      /* Pulso de alpha */
      const pulse = 0.5 + 0.5 * Math.sin(p.phase);
      const a     = p.alpha * pulse;
 
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, 75%, ${a})`;
      ctx.fill();
    });
 
    animFrameId = requestAnimationFrame(drawParticles);
  }
 
  /* ── Barra de progreso ── */
  let loaderProgress = 0;
  let loaderTimer    = null;
 
  function startLoader() {
    const totalMs   = 3200;  /* duración total de la intro */
    const intervalMs = 40;
    const increment  = (intervalMs / totalMs) * 100;
 
    loaderTimer = setInterval(() => {
      loaderProgress += increment;
      if (loaderProgress >= 100) {
        loaderProgress = 100;
        clearInterval(loaderTimer);
      }
      if (loaderFill) {
        loaderFill.style.width = loaderProgress + '%';
      }
    }, intervalMs);
  }
 
  /* ── Mostrar elemento con clase ── */
  function reveal(el, delay) {
    if (!el) return;
    setTimeout(() => el.classList.add('intro-visible'), delay);
  }
 
  /* ── Secuencia cinematográfica ── */
  function playSequence() {
 
    /* 1. Partículas — 120 en desktop, 55 en mobile */
    const count = window.innerWidth > 768 ? 120 : 55;
    resizeCanvas();
    initParticles(count);
    animFrameId = requestAnimationFrame(drawParticles);
 
    /* 2. Canvas fade in */
    setTimeout(() => {
      if (canvas) canvas.classList.add('intro-visible');
    }, 80);
 
    /* 3. Glow ambiental */
    reveal(glow, 300);
 
    /* 4. Loader */
    reveal(loaderWrap, 400);
    startLoader();
 
    /* 5. Carro */
    reveal(carWrapper, 550);
 
    /* 6. Logo */
    reveal(logoWrap, 1050);
 
    /* 7. Exit — después de ~3.6s desde el inicio */
    setTimeout(exitIntro, 3600);
  }
 
  /* ── Salida suave ── */
  function exitIntro() {
    /* Parar loader */
    clearInterval(loaderTimer);
    if (loaderFill) loaderFill.style.width = '100%';
 
    /* Fade out con blur — manejado por CSS (.intro-exit) */
    setTimeout(() => {
      screen.classList.add('intro-exit');
 
      /* Tras la transición CSS (0.85s): limpiar DOM y restaurar scroll */
      setTimeout(() => {
        /* Cancelar canvas loop */
        if (animFrameId) cancelAnimationFrame(animFrameId);
 
        /* Ocultar completamente y quitar del flujo */
        screen.classList.add('intro-done');
 
        /* Restaurar scroll exactamente como estaba */
        document.body.style.overflow = prevOverflow;
 
      }, 870); /* +20ms buffer sobre la transition de 0.85s */
 
    }, 120);
  }
 
  /* ── Resize handler (solo redimensiona canvas, no reinicia) ── */
  const onResize = debounce(resizeCanvas, 200);
  window.addEventListener('resize', onResize, { passive: true });
 
  /* ── Utilidad: debounce ── */
  function debounce(fn, ms) {
    let t;
    return function() {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), ms);
    };
  }
 
  /* ── Accessibility: respetar prefers-reduced-motion ── */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
  if (prefersReduced) {
    /*
      Si el usuario prefiere animaciones reducidas:
      mostramos la intro brevemente (1s) sin animaciones complejas
      y salimos de forma instantánea.
    */
    screen.style.transition = 'opacity 0.3s ease, visibility 0.3s';
    setTimeout(() => {
      screen.classList.add('intro-exit');
      setTimeout(() => {
        screen.classList.add('intro-done');
        document.body.style.overflow = prevOverflow;
      }, 320);
    }, 800);
 
  } else {
    /* Secuencia completa */
    playSequence();
  }
 
  /*
    Fallback de seguridad:
    Si por algún error JS la intro no se cierra en 8 segundos,
    se fuerza el cierre para no bloquear al usuario.
  */
  setTimeout(() => {
    if (!screen.classList.contains('intro-done')) {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      clearInterval(loaderTimer);
      screen.classList.add('intro-done');
      document.body.style.overflow = prevOverflow;
    }
  }, 8000);
 
})();
/* ── fin IntroController ── */
