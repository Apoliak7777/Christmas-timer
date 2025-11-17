// script.js - countdown + snow + UI interactions

(() => {
  // Elements
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const toggleSnowBtn = document.getElementById('toggle-snow');
  const copyLinkBtn = document.getElementById('copy-link');

  // Compute next Dec 25 in local timezone
  function getNextChristmas() {
    const now = new Date();
    const year = now.getFullYear();
    const candidate = new Date(year, 11, 25, 0, 0, 0); // month 11 = December
    if (now > candidate) {
      return new Date(year + 1, 11, 25, 0, 0, 0);
    }
    return candidate;
  }

  let target = getNextChristmas();

  function pad(n, len = 2) {
    return String(n).padStart(len, '0');
  }

  function updateCountdown() {
    const now = new Date();
    let diff = target - now;
    if (diff <= 0) {
      // It's Christmas!
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      // Optionally change message
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  // Update every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Copy page URL
  copyLinkBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      copyLinkBtn.textContent = 'Skopírované ✓';
      setTimeout(() => (copyLinkBtn.textContent = 'Kopírovať odkaz'), 2000);
    } catch (e) {
      copyLinkBtn.textContent = 'Chyba';
      setTimeout(() => (copyLinkBtn.textContent = 'Kopírovať odkaz'), 2000);
    }
  });

  // --- Snow canvas ---
  const canvas = document.getElementById('snow-canvas');
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0;
  let snowflakes = [];
  let snowOn = true;
  let animationId = null;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function createSnowflakes(amount = 120) {
    snowflakes = [];
    for (let i = 0; i < amount; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3 + 1,
        d: Math.random() * 50,
        vx: Math.random() * 0.6 - 0.3,
        vy: Math.random() * 1 + 0.3,
        alpha: Math.random() * 0.6 + 0.4
      });
    }
  }
  createSnowflakes(Math.round((width * height) / 30000)); // scale with screen

  let angle = 0;
  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255,255,255,0.02)';
    ctx.fillRect(0,0,width,height);

    angle += 0.002;
    for (let i = 0; i < snowflakes.length; i++) {
      const p = snowflakes[i];
      p.x += Math.sin(angle + p.d) * p.vx;
      p.y += p.vy;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      if (p.y > height + 5) {
        p.x = Math.random() * width;
        p.y = -10;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;
    }
    animationId = requestAnimationFrame(draw);
  }

  function startSnow() {
    if (!snowOn) {
      snowOn = true;
    }
    if (!animationId) draw();
  }
  function stopSnow() {
    snowOn = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
      ctx.clearRect(0,0,width,height);
    }
  }

  // Initialize snow
  draw();

  // Toggle button
  toggleSnowBtn.addEventListener('click', () => {
    if (animationId) {
      stopSnow();
      toggleSnowBtn.textContent = 'Toggle Snow ❄️';
    } else {
      resize();
      createSnowflakes(Math.round((width * height) / 30000));
      startSnow();
      toggleSnowBtn.textContent = 'Toggle Snow ❄️';
    }
  });

  // Ensure snow re-created on orientation change / big resize
  window.addEventListener('orientationchange', () => {
    resize();
    createSnowflakes(Math.round((width * height) / 30000));
  });
})();