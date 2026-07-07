const ROTATE_MS = 3500;

export function initServicesHighlight() {
  const cards = [...document.querySelectorAll('[data-service-card]')];
  if (!cards.length) return;

  let index = 0;
  let timer = null;

  const setActive = (i) => {
    cards.forEach((card, idx) => {
      card.classList.toggle('is-active', idx === i);
    });
  };

  const next = () => {
    index = (index + 1) % cards.length;
    setActive(index);
  };

  const start = () => {
    stop();
    timer = setInterval(next, ROTATE_MS);
  };

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  setActive(index);
  start();

  cards.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => {
      stop();
      setActive(idx);
    });
    card.addEventListener('mouseleave', start);
  });
}
