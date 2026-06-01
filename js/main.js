// OEA Dental — main.js

// ── Navbar scroll shadow ──
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// ── Mobile nav ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}
if (mobileClose && mobileNav) {
  mobileClose.addEventListener('click', closeMobileNav);
}
document.querySelectorAll('.mobile-nav-links a, .mobile-nav-footer a').forEach(a => {
  a.addEventListener('click', closeMobileNav);
});
function closeMobileNav() {
  if (mobileNav) { mobileNav.classList.remove('open'); document.body.style.overflow = ''; }
}

// ── FAQ Accordion ──
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-body').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      item.querySelector('.faq-body').style.maxHeight = item.querySelector('.faq-body').scrollHeight + 'px';
    }
  });
});

// ── Scroll reveal ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Counter animation ──
function animateCount(el, target, duration = 2000) {
  const suffix = el.dataset.suffix || '+';
  const start = performance.now();
  function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = +e.target.dataset.target;
      animateCount(e.target, target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

// ── Contact / form → WhatsApp ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('[name=nombre]')?.value || '';
    const service = form.querySelector('[name=servicio]')?.value || 'sus servicios';
    const msg     = form.querySelector('[name=mensaje]')?.value || '';
    const text    = `Hola! Soy ${name} y me gustaría consultar sobre ${service}.${msg ? ' ' + msg : ''}`;
    window.open('https://wa.me/5492494496139?text=' + encodeURIComponent(text), '_blank');
  });
}

// ── Active nav link ──
const currentPath = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPath || a.getAttribute('href') === './' + currentPath) {
    a.classList.add('active');
  }
});
