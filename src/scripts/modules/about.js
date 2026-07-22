const statsBlocks = document.querySelectorAll('[data-about-stats]');

if (statsBlocks.length) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateValue = (el, target, duration = 1200) => {
    const match = target.match(/[\d.,]+/);
    if (!match) return;

    const raw = match[0];
    const numeric = parseFloat(raw.replace(/,/g, ''));
    const decimals = (raw.split('.')[1] || '').length;
    const prefix = target.slice(0, match.index);
    const suffix = target.slice(match.index + raw.length);
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (numeric * eased).toFixed(decimals);
      el.textContent = `${prefix}${current}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (!prefersReducedMotion) {
        entry.target.querySelectorAll('[data-stat-value]').forEach((el) => {
          animateValue(el, el.textContent.trim());
        });
      }
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  statsBlocks.forEach((block) => observer.observe(block));
}
