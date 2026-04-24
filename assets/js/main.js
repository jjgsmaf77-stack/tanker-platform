// 호원 2060 TANKer ON — Main JS
(function () {
  'use strict';

  // Mobile nav toggle
  const toggle = document.getElementById('gnbToggle');
  const gnb = document.getElementById('gnb');
  if (toggle && gnb) {
    toggle.addEventListener('click', () => {
      const open = gnb.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Scroll fade-in
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('fade-up');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.section__head, .vision-card, .powerup-card, .track-card, .strategy-card, .achieve-item, .partner-card, .dept-card, .activity-card')
    .forEach((el) => io.observe(el));
})();
