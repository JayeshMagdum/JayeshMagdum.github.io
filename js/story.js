/* Home tab scroll story: the page pins in place and whole sentences slide in
   from the right as you scroll. Progress is eased every frame so it stays smooth. */
(function () {
  const story = $('#story'), home = $('#home'), slides = $$('.sl');
  if (!story || REDUCE) return;
  const clamp = (v) => Math.max(0, Math.min(1, v));

  // Scroll position -> a number from 0 to slides.length
  function target() {
    const r = story.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    return clamp((-r.top + window.innerHeight * 0.45) / (total + window.innerHeight * 0.45)) * slides.length;
  }

  // d = distance of a slide from the centre: 0 = centred, +1 = one step to the right
  function render(p) {
    const last = slides.length - 1;
    const travel = window.innerWidth * 0.8;
    slides.forEach((slide, i) => {
      let d = i - p;
      if (i === last && d < 0) d = 0;                       // final slide stays put
      const a = Math.abs(d);
      const m = clamp((a - 0.15) / 0.85);                   // small pause while centred
      const eased = m * m * (3 - 2 * m);                    // smoothstep
      const x = (d < 0 ? -1 : 1) * eased * travel;
      slide.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
      slide.style.opacity = (1 - clamp((a - 0.15) / 0.5)).toFixed(3);
      slide.style.pointerEvents = a < 0.3 ? 'auto' : 'none';
    });
  }

  let current = -1, lastTime = performance.now();
  function loop(now) {
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;
    if (home.classList.contains('on')) {
      const goal = target();
      current = current < 0 ? goal : current + (goal - current) * (1 - Math.exp(-dt * 5));
      if (Math.abs(goal - current) < 0.0003) current = goal;
      render(current);
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
