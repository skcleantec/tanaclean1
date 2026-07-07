export function initHeroSlider() {
  const slides = Array.from(document.querySelectorAll('[data-hero-slide]'));
  const dots = Array.from(document.querySelectorAll('[data-hero-dot]'));
  if (slides.length <= 1) return;

  let idx = 0;
  setInterval(() => {
    slides[idx].style.opacity = '0';
    idx = (idx + 1) % slides.length;
    slides[idx].style.opacity = '1';
    dots.forEach((d, i) => {
      d.style.background = i === idx ? '#E53935' : 'rgba(255,255,255,0.3)';
    });
  }, 3500);
}
