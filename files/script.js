// script.js – Christmas Countdown: Snow, Confetti, Countdown, Progress
// Optimized with devicePixelRatio, parallax snow, object pooling, and flip animation

(() => {
  'use strict';

  // ─── DOM References ───────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const daysEl      = $('#days');
  const hoursEl     = $('#hours');
  const minutesEl   = $('#minutes');
  const secondsEl   = $('#seconds');
  const toggleBtn   = $('#toggle-snow');
  const snowLabel   = $('#snow-label');
  const copyBtn     = $('#copy-link');
  const copyLabel   = $('#copy-label');
  const progressFill = $('#progress-fill');
  const progressPct  = $('#progress-percent');
  const mainCard     = $('#main-card');

  // ─── Christmas Target ─────────────────────────────────────────
  function getNextChristmas() {
    const now = new Date();
    const year = now.getFullYear();
    const xmas = new Date(year, 11, 25, 0, 0, 0);
    return now > xmas ? new Date(year + 1, 11, 25, 0, 0, 0) : xmas;
  }

  // Get Jan 1 of the same year as Christmas target for progress calc
  function getYearStart() {
    const target = getNextChristmas();
    return new Date(target.getFullYear(), 0, 1, 0, 0, 0);
  }

  const target = getNextChristmas();
  const yearStart = getYearStart();

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  // Store previous values to detect changes for flip animation
  const prev = { d: null, h: null, m: null, s: null };

  function triggerFlip(el) {
    el.classList.remove('flip');
    // Force reflow to restart animation
    void el.offsetWidth;
    el.classList.add('flip');
  }

  let isChristmas = false;

  function updateCountdown() {
    const now = new Date();
    let diff = target - now;

    // Update progress bar
    const totalSpan = target - yearStart;
    const elapsed = now - yearStart;
    const pct = Math.min(Math.max((elapsed / totalSpan) * 100, 0), 100);
    progressFill.style.width = pct.toFixed(2) + '%';
    progressPct.textContent = pct.toFixed(1) + '%';

    if (diff <= 0) {
      // It's Christmas!
      if (!isChristmas) {
        isChristmas = true;
        mainCard.classList.add('christmas-active');
        startConfetti();
      }
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days    = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours   = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);

    const d = pad(days);
    const h = pad(hours);
    const m = pad(minutes);
    const s = pad(seconds);

    // Update with flip animation on change
    if (prev.d !== null && prev.d !== d) triggerFlip(daysEl);
    if (prev.h !== null && prev.h !== h) triggerFlip(hoursEl);
    if (prev.m !== null && prev.m !== m) triggerFlip(minutesEl);
    if (prev.s !== null && prev.s !== s) triggerFlip(secondsEl);

    daysEl.textContent = d;
    hoursEl.textContent = h;
    minutesEl.textContent = m;
    secondsEl.textContent = s;

    prev.d = d;
    prev.h = h;
    prev.m = m;
    prev.s = s;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ─── Copy Link ────────────────────────────────────────────────
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      copyLabel.textContent = 'Skopírované ✓';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyLabel.textContent = 'Kopírovať odkaz';
        copyBtn.classList.remove('copied');
      }, 2500);
    } catch {
      copyLabel.textContent = 'Chyba';
      setTimeout(() => { copyLabel.textContent = 'Kopírovať odkaz'; }, 2500);
    }
  });

  // ─── Snow System ──────────────────────────────────────────────
  const canvas = $('#snow-canvas');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  let dpr = 1;
  let snowflakes = [];
  let snowActive = true;
  let snowRAF = null;
  let angle = 0;

  function resizeCanvas() {
    dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createSnowflakes() {
    const count = Math.min(Math.round((W * H) / 12000), 300);
    snowflakes = [];
    for (let i = 0; i < count; i++) {
      snowflakes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 3 + 0.8,       // radius 0.8 – 3.8
        drift: Math.random() * 60,          // drift phase
        vx: Math.random() * 0.4 - 0.2,     // horizontal speed
        vy: Math.random() * 1.2 + 0.3,     // fall speed
        alpha: Math.random() * 0.5 + 0.3,  // opacity 0.3 – 0.8
        layer: Math.random()               // parallax layer (0=far, 1=near)
      });
    }
  }

  function drawSnow() {
    ctx.clearRect(0, 0, W, H);
    angle += 0.0015;

    for (let i = 0, len = snowflakes.length; i < len; i++) {
      const p = snowflakes[i];

      // Parallax: far flakes move slower
      const layerSpeed = 0.5 + p.layer * 0.5;

      p.x += Math.sin(angle + p.drift) * p.vx * layerSpeed;
      p.y += p.vy * layerSpeed;

      // Draw snowflake
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * layerSpeed})`;
      ctx.arc(p.x, p.y, p.r * layerSpeed, 0, 6.2832); // 2π
      ctx.fill();

      // Wrap around
      if (p.y > H + 10) {
        p.y = -10;
        p.x = Math.random() * W;
      }
      if (p.x > W + 30) p.x = -30;
      else if (p.x < -30) p.x = W + 30;
    }

    snowRAF = requestAnimationFrame(drawSnow);
  }

  function startSnow() {
    snowActive = true;
    if (!snowRAF) drawSnow();
  }

  function stopSnow() {
    snowActive = false;
    if (snowRAF) {
      cancelAnimationFrame(snowRAF);
      snowRAF = null;
      ctx.clearRect(0, 0, W, H);
    }
  }

  // Init snow
  resizeCanvas();
  createSnowflakes();
  startSnow();

  // Toggle snow
  toggleBtn.addEventListener('click', () => {
    if (snowActive) {
      stopSnow();
      snowLabel.textContent = 'Zapnúť sneh';
    } else {
      resizeCanvas();
      createSnowflakes();
      startSnow();
      snowLabel.textContent = 'Vypnúť sneh';
    }
  });

  // Resize handler (debounced)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCanvas();
      if (snowActive) {
        createSnowflakes();
      }
    }, 200);
  });

  // ─── Confetti System (Christmas Day) ──────────────────────────
  const confettiCanvas = $('#confetti-canvas');
  const confettiCtx = confettiCanvas.getContext('2d');
  let confettiPieces = [];
  let confettiRAF = null;
  const CONFETTI_COLORS = [
    '#ffd700', '#ff6b6b', '#2ecc71', '#3498db',
    '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c'
  ];

  function resizeConfetti() {
    const d = window.devicePixelRatio || 1;
    confettiCanvas.width = window.innerWidth * d;
    confettiCanvas.height = window.innerHeight * d;
    confettiCanvas.style.width = window.innerWidth + 'px';
    confettiCanvas.style.height = window.innerHeight + 'px';
    confettiCtx.setTransform(d, 0, 0, d, 0, 0);
  }

  function createConfetti(amount = 150) {
    confettiPieces = [];
    const w = window.innerWidth;
    for (let i = 0; i < amount; i++) {
      confettiPieces.push({
        x: Math.random() * w,
        y: Math.random() * -window.innerHeight,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        vx: Math.random() * 4 - 2,
        vy: Math.random() * 3 + 2,
        rot: Math.random() * 360,
        rotSpeed: Math.random() * 8 - 4,
        alpha: 1,
        decay: Math.random() * 0.002 + 0.001
      });
    }
  }

  function drawConfetti() {
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    confettiCtx.clearRect(0, 0, cw, ch);
    let alive = 0;

    for (let i = 0; i < confettiPieces.length; i++) {
      const p = confettiPieces[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rotSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0) continue;
      alive++;

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rot * Math.PI) / 180);
      confettiCtx.globalAlpha = p.alpha;
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      confettiCtx.restore();
    }

    if (alive > 0) {
      confettiRAF = requestAnimationFrame(drawConfetti);
    } else {
      confettiCtx.clearRect(0, 0, cw, ch);
      confettiRAF = null;
    }
  }

  function startConfetti() {
    resizeConfetti();
    createConfetti(200);
    if (!confettiRAF) drawConfetti();

    // Launch more bursts
    setTimeout(() => { createConfetti(100); drawConfetti(); }, 2000);
    setTimeout(() => { createConfetti(80); drawConfetti(); }, 4500);
  }

  // ─── Respect prefers-reduced-motion ───────────────────────────
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) {
    stopSnow();
    snowLabel.textContent = 'Zapnúť sneh';
  }
})();