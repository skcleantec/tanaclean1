import { SITE } from '../config.js';

/** [data-quote-link] → 청소비서 폼 URL (새 창). URL 없으면 전화 연결 */
export function initQuoteLinks() {
  const url = (SITE.quoteUrl || '').trim();

  document.querySelectorAll('[data-quote-link]').forEach((el) => {
    if (url) {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    } else {
      el.href = SITE.tel;
      el.removeAttribute('target');
      el.removeAttribute('rel');
    }
  });
}
