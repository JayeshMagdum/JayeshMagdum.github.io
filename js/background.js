/* Particles background: drifting dots joined by faint lines.
   Dots are pushed away from the cursor and the nearest ones link to it. */
(function () {
  const canvas = $('#bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const root = document.documentElement;
  const cssVar = (name) => getComputedStyle(root).getPropertyValue(name).trim();

  let width = 0, height = 0, dots = [];
  let mouseX = -9999, mouseY = -9999;
  let theme = root.getAttribute('data-theme');
  let accent = cssVar('--a');

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(120, Math.round(width * height / 15000));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.8,
      accent: Math.random() < 0.18
    }));
  }

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
  resize();

  function frame() {
    const current = root.getAttribute('data-theme');
    if (current !== theme) { theme = current; accent = cssVar('--a'); }
    const light = theme === 'light';
    const dotColor = light ? 'rgba(20,30,50,.6)' : 'rgba(255,255,255,.85)';
    const lineRGB = light ? '20,30,50' : '255,255,255';

    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < dots.length; i++) {
      const p = dots[i];
      if (!REDUCE) { p.x += p.vx; p.y += p.vy; }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // push away from the cursor
      const dx = p.x - mouseX, dy = p.y - mouseY, dist = Math.hypot(dx, dy);
      if (dist < 150 && dist > 0) {
        const force = (150 - dist) / 150 * 1.8;
        p.x += dx / dist * force;
        p.y += dy / dist * force;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.accent ? accent : dotColor;
      ctx.fill();

      // lines between nearby dots
      for (let j = i + 1; j < dots.length; j++) {
        const q = dots[j], ex = p.x - q.x, ey = p.y - q.y, d2 = ex * ex + ey * ey;
        if (d2 < 16900) {
          ctx.strokeStyle = 'rgba(' + lineRGB + ',' + (0.16 * (1 - d2 / 16900)) + ')';
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }

      // line to the cursor
      if (dist < 170) {
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.5 * (1 - dist / 170);
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouseX, mouseY); ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
})();
