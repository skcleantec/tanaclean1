import { loadModules } from './loader.js';
import { initNav } from './modules/nav.js';
import { initHeroSlider } from './modules/hero.js';
import { initReviews } from './modules/reviews.js';
import { initFaq } from './modules/faq.js';
import { initAnimations } from './modules/animations.js';
import { initQuoteLinks } from './modules/quote-links.js';
import { initServicesHighlight } from './modules/services.js';

async function boot() {
  try {
    await loadModules();
    initNav();
    initHeroSlider();
    initReviews();
    initFaq();
    initAnimations();
    initQuoteLinks();
    initServicesHighlight();
  } catch (err) {
    console.error('[타나클린]', err);
    const root = document.getElementById('app-root');
    if (root) {
      root.innerHTML = `<div style="padding:40px;font-family:sans-serif;color:#B71C1C;">
        <h2>페이지 로드 오류</h2>
        <p>로컬 서버로 열어주세요: <code>npx serve . -p 5500</code></p>
        <pre>${err.message}</pre>
      </div>`;
    }
  }
}

boot();
