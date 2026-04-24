// 호원 2060 TANKer ON — Main JS
(function () {
  'use strict';

  // ---------- Mobile nav toggle ----------
  const toggle = document.getElementById('gnbToggle');
  const gnb = document.getElementById('gnb');

  function closeMenu() {
    if (!gnb || !toggle) return;
    gnb.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }
  function openMenu() {
    if (!gnb || !toggle) return;
    gnb.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  if (toggle && gnb) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      gnb.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    // Close on link click (anchor jump)
    gnb.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!gnb.classList.contains('is-open')) return;
      if (gnb.contains(e.target) || toggle.contains(e.target)) return;
      closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Close when resizing back to desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 860) closeMenu();
      }, 120);
    });
  }

  // ---------- Scroll fade-in ----------
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
