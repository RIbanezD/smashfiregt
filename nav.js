/* ──────────────────────────────────────
   SHARED JS — nav.js
────────────────────────────────────── */

// Custom cursor
(function() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.btn,.card,.gallery-item,.menu-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

// Navbar scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav && nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile toggle
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

// Active link
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

// Scroll reveal
(function() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// Parallax via scroll
(function() {
  const pElems = document.querySelectorAll('[data-parallax]');
  if (!pElems.length) return;
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    pElems.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const rect  = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 + sy - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    });
  }, { passive: true });
})();

// Ticker duplicate for seamless loop
(function() {
  const inner = document.querySelector('.ticker-inner');
  if (!inner) return;
  inner.innerHTML += inner.innerHTML;
})();

// Number counters
(function() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString();
        if (current >= target) clearInterval(timer);
      }, 16);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
})();
