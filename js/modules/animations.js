export function initAnimations() {
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  const revEls = $$('[data-reveal]');
  revEls.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(26px)';
    el.style.transition = 'opacity .8s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1)';
  });

  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const sibs = Array.from(el.parentElement.querySelectorAll(':scope > [data-reveal]'));
      const i = sibs.indexOf(el);
      el.style.transitionDelay = `${i > 0 ? Math.min(i, 6) * 0.07 : 0}s`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      revObs.unobserve(el);
    });
  }, { threshold: 0.12 });
  revEls.forEach((el) => revObs.observe(el));

  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const dur = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const val = Math.round(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = val.toLocaleString('en-US') + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$('[data-count]').forEach((el) => countObs.observe(el));

  const barObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.style.width = `${e.target.getAttribute('data-pct')}%`;
      barObs.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  $$('[data-bar]').forEach((el) => barObs.observe(el));
}
