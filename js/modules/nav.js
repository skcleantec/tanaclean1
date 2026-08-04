export function initNav() {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  const applyResponsive = () => {
    const w = window.innerWidth;
    const mobile = w < 900;
    const links = $('[data-navlinks]');
    const burger = $('[data-burger]');
    if (links) links.style.display = mobile ? 'none' : 'flex';
    if (burger) burger.style.display = mobile ? 'flex' : 'none';
    const bar = $('[data-mobilebar]');
    const floatBtn = $('[data-floatcta]');
    if (bar) bar.style.display = w < 720 ? 'flex' : 'none';
    if (floatBtn) floatBtn.style.display = w < 720 ? 'none' : 'flex';
  };
  applyResponsive();
  window.addEventListener('resize', applyResponsive);

  const nav = $('[data-nav]');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.setAttribute('data-scrolled', '');
      nav.style.padding = '12px 0';
    } else {
      nav.removeAttribute('data-scrolled');
      nav.style.padding = '16px 0';
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const menu = $('[data-mobilemenu]');
  const openMenu = () => {
    if (!menu) return;
    menu.style.display = 'block';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      menu.classList.add('is-open');
    });
  };
  const closeMenu = () => {
    if (!menu) return;
    menu.classList.remove('is-open');
    setTimeout(() => {
      menu.style.display = 'none';
      document.body.style.overflow = '';
    }, 320);
  };
  const burger = $('[data-burger]');
  if (burger) burger.addEventListener('click', openMenu);
  const closeBtn = $('[data-close]');
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  const backdrop = $('[data-mobilemenu-backdrop]');
  if (backdrop) backdrop.addEventListener('click', closeMenu);
  $$('[data-mlink]').forEach((a) => a.addEventListener('click', closeMenu));
}
