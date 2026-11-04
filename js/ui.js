/* General UI: theme toggle, typing role line, tab navigation,
   scroll reveal, counters, card spotlight and photo tilt. */
(function () {
  const root = document.documentElement;

  /* ---------- Theme (dark by default, remembered in localStorage) ---------- */
  let theme = 'dark';
  try { if (localStorage.getItem('theme') === 'light') theme = 'light'; } catch (e) {}
  root.setAttribute('data-theme', theme);
  $('#tb').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  });

  /* ---------- Typing role line in the hero ---------- */
  const roles = ['Computer Vision Intern', 'Robotics and AI builder', 'Python and ML developer', 'Data analysis explorer'];
  const roleEl = $('#role');
  let roleIndex = 0, charIndex = 0, deleting = false;
  function type() {
    const word = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    roleEl.textContent = word.slice(0, charIndex);
    let delay = deleting ? 35 : 70;
    if (!deleting && charIndex === word.length) { deleting = true; delay = 1400; }
    else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 300; }
    setTimeout(type, delay);
  }
  type();

  /* ---------- Tabs: one view per section, driven by the URL hash ---------- */
  const views = $$('.view'), links = $$('nav a');
  function route() {
    let id = (location.hash || '#home').slice(1);
    const target = document.getElementById(id);
    if (!target || !target.classList.contains('view')) id = 'home';
    views.forEach((v) => v.classList.toggle('on', v.id === id));
    links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + id));
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();

  /* ---------- Scroll reveal + count-up numbers ---------- */
  function countUp(el) {
    const to = +el.dataset.to, start = performance.now();
    (function step(now) {
      const p = Math.min(1, (now - start) / 1200);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      const num = entry.target.querySelector('.n');
      if (num) countUp(num);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  $$('.rv').forEach((el) => observer.observe(el));

  /* ---------- Card spotlight that follows the cursor ---------- */
  $$('.g').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--x', (e.clientX - r.left) + 'px');
      card.style.setProperty('--y', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- 3D tilt on the hero photo ---------- */
  const photo = $('.tilt');
  if (photo) {
    photo.addEventListener('pointermove', (e) => {
      const r = photo.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      photo.style.transform = 'perspective(800px) rotateY(' + (x * 12) + 'deg) rotateX(' + (-y * 12) + 'deg)';
    });
    photo.addEventListener('pointerleave', () => { photo.style.transform = ''; });
  }
})();
