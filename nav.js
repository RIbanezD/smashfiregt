/* ── SHARED NAV.JS ── */

// ─── TRANSLATIONS ─────────────────────────────────────────────
const i18n = {
  es: {
    nav_home:'Inicio', nav_photos:'Fotos', nav_history:'Historia',
    nav_terms:'Términos', nav_founders:'Fundadores', nav_jobs:'Empleo',
    nav_marketing:'Marketing', nav_menu:'Ver Menú',
    footer_nav:'Navegación', footer_contact:'Contacto', footer_hours:'Horarios',
    footer_copy:'© 2025 Smash & Fire. Todos los derechos reservados.',
    footer_terms:'Términos', footer_privacy:'Privacidad',
    hours_weekday:'Lun – Jue: 11:00 – 22:00',
    hours_friday:'Viernes: 11:00 – 23:00',
    hours_weekend:'Sáb – Dom: 11:00 – 23:00',
  },
  en: {
    nav_home:'Home', nav_photos:'Photos', nav_history:'Our Story',
    nav_terms:'Terms', nav_founders:'Founders', nav_jobs:'Jobs',
    nav_marketing:'Marketing', nav_menu:'See Menu',
    footer_nav:'Navigation', footer_contact:'Contact', footer_hours:'Hours',
    footer_copy:'© 2025 Smash & Fire. All rights reserved.',
    footer_terms:'Terms', footer_privacy:'Privacy',
    hours_weekday:'Mon – Thu: 11:00 AM – 10:00 PM',
    hours_friday:'Friday: 11:00 AM – 11:00 PM',
    hours_weekend:'Sat – Sun: 11:00 AM – 11:00 PM',
  }
};

let currentLang = localStorage.getItem('sf_lang') || 'es';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('sf_lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang][key] !== undefined) el.textContent = i18n[lang][key];
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ─── NAVBAR SCROLL ─────────────────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav && nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── MOBILE TOGGLE ─────────────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ─── LANG TOGGLE ───────────────────────────────────────────────
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});
applyLang(currentLang);

// ─── ACTIVE LINK ───────────────────────────────────────────────
(function() {
  const segs = location.pathname.replace(/\/$/, '').split('/');
  const current = segs[segs.length - 1] || 'index.html';
  const folder  = segs[segs.length - 2] || '';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const hSegs = href.replace(/\/$/, '').split('/');
    const hFile = hSegs[hSegs.length - 1] || 'index.html';
    const hFolder = hSegs[hSegs.length - 2] || '';
    if (hFile === current || hFolder === folder) a.classList.add('active');
  });
})();

// ─── SCROLL REVEAL ─────────────────────────────────────────────
(function() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
})();

// ─── TICKER DUPLICATE ──────────────────────────────────────────
(function() {
  const inner = document.querySelector('.ticker-inner');
  if (!inner) return;
  inner.innerHTML += inner.innerHTML;
})();

// ─── NUMBER COUNTERS ───────────────────────────────────────────
(function() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const step = target / (1800 / 16);
      let cur = 0;
      const timer = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = Math.floor(cur).toLocaleString();
        if (cur >= target) clearInterval(timer);
      }, 16);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
})();
