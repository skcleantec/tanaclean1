export function initFaq() {
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  $$('[data-faq]').forEach((item) => {
    const btn = item.querySelector('[data-faq-btn]');
    const panel = item.querySelector('[data-faq-panel]');
    const icon = item.querySelector('[data-faq-icon]');
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const open = panel.style.maxHeight && panel.style.maxHeight !== '0px';

      $$('[data-faq]').forEach((o) => {
        if (o === item) return;
        const p = o.querySelector('[data-faq-panel]');
        const ic = o.querySelector('[data-faq-icon]');
        if (p) p.style.maxHeight = '0px';
        if (ic) { ic.style.transform = 'rotate(0deg)'; ic.textContent = '+'; }
        o.style.borderColor = '#E3E8E3';
      });

      if (open) {
        panel.style.maxHeight = '0px';
        if (icon) { icon.style.transform = 'rotate(0deg)'; icon.textContent = '+'; }
        item.style.borderColor = '#E3E8E3';
      } else {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
        if (icon) icon.style.transform = 'rotate(45deg)';
        item.style.borderColor = 'rgba(183,28,28,0.5)';
      }
    });
  });
}
