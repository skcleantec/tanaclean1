# 타나클린 랜딩페이지 가이드

## 1. 설계 원칙

| 원칙 | 설명 |
|------|------|
| **코드 쏠림 방지** | `index.html`은 셸만. 섹션·스타일·로직은 각각 분리 |
| **HTML / CSS / JS 독립** | 수정할 파일을 바로 찾을 수 있게 구성 |
| **새 메뉴 = 새 모듈** | 기존 파일에 끼워 넣지 않고 `modules/{이름}/` 폴더 추가 |

Cursor AI 규칙: `.cursor/rules/landing-page-modules.mdc`

---

## 2. 폴더 구조

```
landingpage/타나클린/
├── index.html                 # 진입점 (CSS/JS 링크 + #app-root)
├── css/
│   ├── fonts.css              # @font-face (Noto Sans/Serif KR)
│   └── base.css               # reset, 애니메이션, 공통 클래스
├── js/
│   ├── config.js              # 전화번호·브랜드·모듈 순서
│   ├── main.js                # 진입점
│   ├── loader.js              # HTML 모듈 fetch 로드
│   └── modules/               # 섹션별 JS
│       ├── nav.js
│       ├── hero.js
│       ├── reviews.js
│       ├── faq.js
│       └── animations.js
├── modules/                   # 섹션별 HTML
│   ├── nav/
│   │   ├── module.json
│   │   └── nav.html
│   ├── hero/
│   ├── …
│   └── _template/             # 새 모듈 템플릿
├── assets/
│   ├── images/
│   └── fonts/
├── scripts/
│   ├── migrate-to-modules.js  # (1회) standalone → 모듈 변환
│   └── build.js               # dist 조립
└── dist/                      # 배포용 빌드 출력
```

---

## 3. 섹션(모듈) 목록

| order | id | 네비 | 앵커 |
|------:|----|------|------|
| 0 | overlay | — | — |
| 1 | nav | — | — |
| 2 | hero | — | #top |
| 3 | trust-bar | — | — |
| 4 | why | 브랜드 | #why |
| 5 | trust-compare | — | — |
| 6 | services | 서비스 | #services |
| 7 | gallery | 시공사례 | #gallery |
| 8 | process | 진행과정 | #process |
| 9 | tana | — | — |
| 10 | reviews | 후기 | #reviews |
| 11 | pricing | — | #pricing |
| 12 | extra-fees | — | — |
| 13 | cta | — | — |
| 14 | faq | FAQ | #faq |
| 15 | footer | — | — |
| 16 | cta-float | — | — |

---

## 4. 새 메뉴(섹션) 추가 방법

1. `modules/_template/` 를 복사 → `modules/이벤트/` 등
2. `module.json` 수정 (id, order, navLabel, anchor)
3. `이벤트.html` 에 마크업 작성
4. `js/config.js` → `MODULE_ORDER` 배열에 id 추가
5. (선택) `js/modules/이벤트.js` + `main.js`에서 init
6. (선택) `css/modules/이벤트.css` + `index.html` link

---

## 5. 자주 수정하는 파일

| 변경 내용 | 파일 |
|-----------|------|
| 전화번호·CTA | `js/config.js` + 각 HTML의 `tel:` (추후 config 연동 가능) |
| 히어로 문구 | `modules/hero/hero.html` |
| FAQ | `modules/faq/faq.html` |
| 후기 텍스트/패턴 | `js/modules/reviews.js` |
| 로고·시공사례 이미지 | `assets/images/` |
| 공통 색·애니메이션 | `css/base.css` |

---

## 6. 미리보기 & 빌드

```bash
# 개발 미리보기 (모듈 fetch — 로컬 서버 필수)
cd landingpage/타나클린
npx --yes serve . -p 5500
# → http://localhost:5500/index.html

# 배포용 단일 HTML 조립
node scripts/build.js
# → dist/index.html
```

> `file://`로 `index.html`을 직접 열면 모듈 로드가 실패할 수 있습니다.

---

## 7. 레거시 파일

| 파일 | 용도 |
|------|------|
| `타나클린 랜딩페이지 (standalone).html` | 이전 28MB 번들 (참고/백업) |
| `_unpacked/` | standalone 언팩 결과 (마이그레이션 원본) |

**일상 수정은 `index.html` + `modules/` + `css/` + `js/` 만 사용하세요.**
