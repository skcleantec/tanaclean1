/**
 * dist/index.html — CSS/HTML 인라인 + JS 번들 (배포용)
 * node scripts/build.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const MODULE_ORDER = [
  'overlay', 'nav', 'hero', 'trust-bar', 'why', 'trust-compare',
  'services', 'gallery', 'process', 'tana', 'reviews', 'pricing',
  'extra-fees', 'cta', 'faq', 'footer', 'cta-float',
];

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function read(p) { return fs.readFileSync(p, 'utf8'); }

function copyDir(src, dest) {
  ensureDir(dest);
  for (const f of fs.readdirSync(src)) {
    const s = path.join(src, f);
    const d = path.join(dest, f);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function stripExport(src, fnName) {
  return src
    .replace(new RegExp(`export function ${fnName}`), `function ${fnName}`)
    .replace(/^import .+;\n/gm, '');
}

/** index.html 의 SEO 메타 블록 재사용 (description ~ preconnect 직전) */
function getSeoHead() {
  const index = read(path.join(ROOT, 'index.html'));
  const match = index.match(/<meta name="description"[\s\S]*?(?=<link rel="preconnect")/);
  return match ? match[0].trim() : '';
}

function getSiteQuoteConfig() {
  const config = read(path.join(ROOT, 'js', 'config.js'));
  const quoteUrl = (config.match(/quoteUrl:\s*['"]([^'"]*)['"]/) || [, ''])[1];
  const tel = (config.match(/tel:\s*['"]([^'"]*)['"]/) || [, 'tel:010-9266-9404'])[1];
  return { quoteUrl: quoteUrl.trim(), tel };
}

function buildQuoteLinksInit() {
  const { quoteUrl, tel } = getSiteQuoteConfig();
  return `function initQuoteLinks() {
  var url = ${JSON.stringify(quoteUrl)};
  document.querySelectorAll('[data-quote-link]').forEach(function(el) {
    if (url) {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    } else {
      el.href = ${JSON.stringify(tel)};
      el.removeAttribute('target');
      el.removeAttribute('rel');
    }
  });
}`;
}

function build() {
  ensureDir(DIST);
  copyDir(path.join(ROOT, 'assets'), path.join(DIST, 'assets'));

  const modulesHtml = MODULE_ORDER.map((id) =>
    read(path.join(ROOT, 'modules', id, `${id}.html`))
  ).join('\n');

  const js = [
    stripExport(read(path.join(ROOT, 'js', 'modules', 'nav.js')), 'initNav'),
    stripExport(read(path.join(ROOT, 'js', 'modules', 'hero.js')), 'initHeroSlider'),
    stripExport(read(path.join(ROOT, 'js', 'modules', 'reviews.js')), 'initReviews'),
    stripExport(read(path.join(ROOT, 'js', 'modules', 'faq.js')), 'initFaq'),
    stripExport(read(path.join(ROOT, 'js', 'modules', 'animations.js')), 'initAnimations'),
    buildQuoteLinksInit(),
    'initNav(); initHeroSlider(); initReviews(); initFaq(); initAnimations(); initQuoteLinks();',
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>타나클린 | 수도권 프리미엄 입주청소</title>
  ${getSeoHead()}
  <style>
${read(path.join(ROOT, 'css', 'fonts.css'))}
${read(path.join(ROOT, 'css', 'base.css'))}
${read(path.join(ROOT, 'modules', 'nav', 'nav.css'))}
${read(path.join(ROOT, 'css', 'tana-partner.css'))}
  </style>
</head>
<body>
${modulesHtml}
<script>${js}</script>
</body>
</html>`;

  fs.writeFileSync(path.join(DIST, 'index.html'), html, 'utf8');
  console.log('Built dist/index.html (' + (Buffer.byteLength(html) / 1024 / 1024).toFixed(2) + ' MB)');
}

build();
