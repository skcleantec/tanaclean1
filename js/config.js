/** @typedef {{ id: string, order: number, navLabel?: string, anchor?: string }} ModuleMeta */

export const SITE = {
  brand: '타나클린',
  tagline: '수도권 프리미엄 입주청소',
  url: 'https://tanaclean.co.kr',
  phone: '010-9266-9404',
  tel: 'tel:010-9266-9404',
  business: {
    name: '타나클린',
    ceo: '이민숙',
    opened: '2026.06.12',
    regNo: '571-20-02492',
    address: '인천광역시 미추홀구 수봉로 146-1, 2층 3호(주안동)',
    category: '건축물 일반 청소업',
  },
  hours: {
    weekday: '평일 08:00–20:00',
    weekend: '주말·공휴일 09:00–18:00',
  },
  colors: {
    green: '#1B5E20',
    red: '#B71C1C',
    accent: '#E53935',
    light: '#F1F8F1',
    highlight: '#A5D6A7',
  },
};

export const SEO = {
  title: '타나클린 | 수도권 프리미엄 입주청소',
  description:
    '독일 타나세제 MOU 공식 파트너. 친환경 전용 세제와 검증된 노하우로 수도권 입주청소·이사청소를 제공합니다. 결과 확인 후 결제, A/S 무상보장.',
  keywords:
    '입주청소, 수도권 입주청소, 인천 입주청소, 서울 입주청소, 경기 입주청소, 이사청소, 신축 입주청소, 타나클린, 타나세제, 친환경 입주청소, 프리미엄 입주청소',
  ogImage: 'assets/images/숨고_썸네일_01_브랜드.jpg',
  themeColor: '#1B5E20',
};

/** HTML 모듈 로드 순서 (modules/{id}/{id}.html) */
export const MODULE_ORDER = [
  'overlay',
  'nav',
  'hero',
  'trust-bar',
  'why',
  'trust-compare',
  'services',
  'gallery',
  'process',
  'tana',
  'reviews',
  'pricing',
  'extra-fees',
  'cta',
  'faq',
  'footer',
  'cta-float',
];
