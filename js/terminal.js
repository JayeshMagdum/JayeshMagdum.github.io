/* About tab: a small interactive terminal.
   Tap a command chip or type one. Try "help", and the arrow keys for history. */
(function () {
  const term = $('#term');
  if (!term) return;
  const out = $('#tout'), input = $('#tin');
  let busy = false, started = false, history = [], pos = 0;

  const commands = {
    whoami: ['Jayesh Magdum', 'Final-year B.E. IT student, MMCOE Pune', 'Focus: computer vision, robotics and ML'],
    skills: ['vision     OpenCV, YOLOv8, Roboflow, DepthAI', 'ml / data  Scikit-learn, Pandas, NumPy, Tableau, Power BI', 'languages  Python, SQL, HTML/CSS'],
    education: ['B.E. Information Technology, MMCOE Pune (2023 - present)', 'HSC Science, MIT Junior College (2023)', 'SSC CBSE, Podar International School (2021)'],
    now: ['Computer Vision Intern at Automators Industrial Projects (Oct 2026 - present)', 'Looking for: paid internship, internship with PPO, or a fresher role in Pune'],
    projects: ['1. Manas, AI humanoid robot', '2. AI Business OS', '3. Smart Waste Management', '4. Food Shelf-Life Prediction', '5. TV Episode Rating Visualizer', '6. Customer Churn Analysis'],
    contact: ['email     jayeshmagdum294@gmail.com', 'github    JayeshMagdum', 'linkedin  jayesh-magdum'],
    help: ['Commands: whoami, skills, education, now, projects, contact, resume, clear']
  };

  function addLine(text, cls) {
    const div = document.createElement('div');
    if (cls) div.className = cls;
    div.textContent = text;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
    return div;
  }

  // Types one line character by character
  function typeLine(text, cls) {
    return new Promise((resolve) => {
      const div = addLine('', cls);
      let i = 0;
      (function tick() {
        div.textContent = text.slice(0, ++i);
        out.scrollTop = out.scrollHeight;
        if (i < text.length) setTimeout(tick, REDUCE ? 0 : 11); else resolve();
      })();
    });
  }
  const typeLines = (lines, cls) => lines.reduce((p, l) => p.then(() => typeLine(l, cls)), Promise.resolve());

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd || busy) return;
    busy = true;
    history.push(cmd);
    pos = history.length;
    if (cmd === 'clear') { out.innerHTML = ''; busy = false; return; }

    addLine('$ ' + cmd, 'c');
    let job;
    if (commands[cmd]) job = typeLines(commands[cmd]);
    else if (cmd === 'resume') {
      job = typeLines(['Opening resume...']).then(() => setTimeout(() => window.open(RESUME_URL, '_blank', 'noopener'), 350));
    }
    else if (cmd === 'sudo hire jayesh' || cmd === 'hire') job = typeLines(['Permission granted. Welcome aboard.'], 'c');
    else job = typeLines(['command not found: ' + cmd + '. Type help.'], 'e');
    job.then(() => { busy = false; });
  }

  $$('.tc').forEach((btn) => btn.addEventListener('click', () => run(btn.dataset.c)));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { run(input.value); input.value = ''; }
    else if (e.key === 'ArrowUp' && history.length) { pos = Math.max(0, pos - 1); input.value = history[pos] || ''; e.preventDefault(); }
    else if (e.key === 'ArrowDown' && history.length) { pos = Math.min(history.length, pos + 1); input.value = history[pos] || ''; e.preventDefault(); }
  });

  // Greet the visitor the first time the terminal scrolls into view
  const watcher = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      watcher.disconnect();
      busy = true;
      typeLines(['Welcome. Tap a command below or type your own.'], 'd').then(() => { busy = false; run('whoami'); });
    });
  }, { threshold: 0.3 });
  watcher.observe(term);
})();
