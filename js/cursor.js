/* Custom cursor: a dot plus a trailing ring that grows over links, buttons and cards.
   Only runs on devices with a mouse. */
(function () {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const dot = $('.cd'), ring = $('.cr');
  if (!dot || !ring) return;
  let x = 0, y = 0, rx = 0, ry = 0;

  window.addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY;
    document.body.classList.add('cm');
    const hovering = e.target.closest ? e.target.closest('a, button, .g') : null;
    ring.classList.toggle('h', !!hovering);
  });
  window.addEventListener('pointerdown', () => ring.classList.add('p'));
  window.addEventListener('pointerup', () => ring.classList.remove('p'));
  document.addEventListener('mouseleave', () => document.body.classList.remove('cm'));

  (function loop() {
    rx += (x - rx) * 0.18;
    ry += (y - ry) * 0.18;
    dot.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
    requestAnimationFrame(loop);
  })();
})();
