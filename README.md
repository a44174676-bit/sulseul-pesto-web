# 슬슬페스토 공식 홈페이지

React 19 · TypeScript · Vite · Tailwind CSS 4 기반 한국어 반응형 브랜드 사이트입니다. 제품은 개발 중이며 주문·결제·회원가입·문의 제출 폼이 없습니다. 현재 사이트는 김태완 창업자의 최종 콘텐츠 승인 전 검토용입니다.

## 로컬 실행

Node.js 24 LTS 및 npm을 사용합니다. `.nvmrc`가 있으면 `nvm use`로 선택할 수 있습니다.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run build
npm run preview
```

`npm run build`는 타입 검사 → Vite 빌드 → 개인정보 및 404 정적 HTML 생성을 수행합니다. 결과물은 `dist/`입니다. 외부 API·데이터베이스·인증키는 필요하지 않습니다.

클라우드에서 기본 npm 캐시 경로가 쓰기 불가능하면 `npm ci --cache /workspace/.npm-cache`를 사용하세요. 각각의 클라우드 작업은 격리되어 있으므로 기존 체크아웃을 사용하고 별도 Git worktree를 생성할 필요가 없습니다.

## 화면과 데이터

- `/`: 메인, 브랜드, 제품, 활용법, B2B, 연락처
- `/privacy/`: 현재 개인정보 안내 (확정된 정식 처리방침이 아님)
- 미등록 경로: 404 안내. Netlify는 HTTP 404로 응답합니다.
- `src/config/site.ts`: 연락처·이메일 문의 제목
- `src/data/products.ts`: 제품 카드 데이터
- `src/App.tsx`: 화면 문구와 자체 제작 SVG/CSS 콘셉트 일러스트
- `src/style.css`: 반응형 디자인, 브랜드 색상, 키보드 포커스
- `public/`: 파비콘, 소셜 이미지, 검색 로봇 안내

자세한 수정 절차는 [콘텐츠 운영 매뉴얼](docs/CONTENT.md)을 확인하세요. 모든 시각 자료는 프로젝트에서 직접 작성했으며 로고·실제품 사진이 아닌 교체용 디자인입니다. 웹폰트와 외부 이미지 요청이 없습니다.

## 브라우저 검증

Playwright 및 axe를 이용해 360·768·1440px, 메뉴, 키보드, 개인정보/404 직접 진입, 링크, 문서 가로 넘침, WCAG A/AA 자동 검사를 수행합니다.

```sh
# 시스템 Chromium이 있는 Linux 환경
npm run build
npm run test:e2e
# 다른 설치 경로
CHROMIUM_PATH=/path/to/chromium npm run test:e2e
```

기본 경로는 `/usr/bin/chromium`입니다. 없으면 OS의 Chromium을 설치하거나 `npx playwright install chromium`으로 설치 후 실행 파일 경로를 지정하세요. 자동 검사는 실제 메일 전송·전화 통화, 보조공학 실사용, 최종 식품 표시 검토를 대신하지 않습니다. Vite preview의 미등록 경로는 개발 편의상 200으로 응답할 수 있습니다. 실제 HTTP 404 처리는 Netlify에서 확인하세요.

## GitHub 및 Netlify 연결

기존 저장소: `https://github.com/a44174676-bit/sulseul-pesto-web` (V-TYPE 프로젝트와 분리).

1. 이 프로젝트를 해당 저장소의 `main` 브랜치에 저장합니다.
2. Netlify에 로그인하고 **Add new project → Import an existing project → GitHub**를 선택합니다 (UI 명칭은 변경될 수 있음).
3. `a44174676-bit/sulseul-pesto-web`만 선택해 필요한 저장소 접근을 허용합니다.
4. Production branch `main`, Base directory 비움, Build command `npm run build`, Publish directory `dist`를 확인합니다. `netlify.toml`에 빌드와 보안 헤더, 404 설정이 포함되어 있습니다.
5. Deploy 후 실제 사이트의 `/`, `/privacy/`, 임의의 없는 경로(HTTP 404), 모바일 메뉴, 전화·메일 링크를 확인합니다.
6. 최종 콘텐츠 승인 전에는 검토용으로만 공유합니다. 검색 차단은 접근 제한이 아니므로 비공개 검토가 필요하면 Netlify의 접근 제한 기능을 별도로 설정하세요.
7. 창업자 승인 후 아래 공개 체크리스트를 완료하고 정식 도메인을 연결합니다.

배포용 비밀키를 소스에 넣지 마세요. 이 프로젝트는 런타임 환경변수가 필요하지 않습니다. Netlify 계정 연결과 실제 배포가 수행되지 않았다면 배포 URL은 없습니다.

## 정식 공개 전 체크리스트

- 김태완 창업자의 문구·연락처·브랜드 디자인·제품 표현 승인
- 법인 설립 준비 상태와 사업자 관련 표기 적정성 확인
- 최종 로고·사진으로 교체 및 이미지 대체 텍스트 확인
- 개인정보 운영주체·보유기간·문의 이메일 처리·Netlify 로그 등 실제 처리조건 확인 후 정책 확정 (미확정 내용을 임의로 채우지 않기)
- `index.html`의 `robots`를 `index, follow`로, `public/robots.txt`를 `Allow: /`로 변경
- 실제 운영 도메인 확정 후 canonical, 절대 URL `og:url`·`og:image`, sitemap 추가. 소셜 이미지의 SVG는 일부 SNS가 지원하지 않으므로 승인된 PNG/JPEG로 교체
- 전화·이메일 기기별 실제 연결, 수동 키보드·스크린리더, Netlify HTTP 상태 및 소셜 미리보기 확인

첫 버전의 범위에는 가격·재고·온라인 결제·회원가입이 없습니다. 인증·특허·판매 실적·제품 효능 등의 미확인 사실을 추가하지 마세요.
