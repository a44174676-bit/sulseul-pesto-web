import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Leaf,
  Wheat,
  Utensils,
  Salad,
  Plus,
  Phone,
  Mail,
} from "lucide-react";
import { site, emailHref, inquiryHref } from "./config/site";
import { products } from "./data/products";

const navigation = [
  ["story", "브랜드 이야기"],
  ["products", "우리의 페스토"],
  ["table", "한 스푼의 일상"],
  ["partners", "함께하기"],
] as const;
function Botanical({
  variant = "cham",
  className = "",
}: {
  variant?: "cham" | "perilla";
  className?: string;
}) {
  return (
    <svg viewBox="0 0 400 440" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M200 422C197 320 223 200 262 64M204 346C151 276 109 226 71 179M214 282C265 228 306 203 349 191M224 229C188 176 167 126 153 78" />
        {(variant === "cham"
          ? [
              [250, 99, -28],
              [233, 165, 20],
              [219, 241, -25],
              [170, 292, -55],
              [122, 238, -60],
              [281, 229, 40],
              [325, 202, 50],
              [184, 149, -35],
              [160, 99, -30],
            ]
          : [
              [250, 119, -28],
              [229, 226, 20],
              [151, 267, -55],
              [293, 224, 50],
              [177, 145, -35],
            ]
        ).map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path
              fill="currentColor"
              fillOpacity=".15"
              d={
                variant === "cham"
                  ? "M0 20C-60 2-58-49-35-76L-15-65 0-99 15-65 35-76C58-49 60 2 0 20Z"
                  : "M0 24C-61 6-66-37-48-73L-32-65-19-88-7-78 0-105 13-79 28-88 35-65 52-70C67-27 49 9 0 24Z"
              }
            />
            <path d="M0 19V-83M0-45-30-63M0-20 34-47M0-4-35-30" />
          </g>
        ))}
      </g>
    </svg>
  );
}
function Jar({
  tone = "cham",
  small = false,
}: {
  tone?: "cham" | "perilla";
  small?: boolean;
}) {
  return (
    <div
      className={`jar ${tone} ${small ? "jar-small" : ""}`}
      aria-hidden="true"
    >
      <div className="jar-lid" />
      <div className="jar-glass">
        <div className="jar-label">
          <span className="jar-brand">슬슬</span>
          <span className="jar-brand second">페스토</span>
          <span className="jar-en">SULSEUL PESTO</span>
          <span className="jar-rule" />
          <span className="jar-type">
            {tone === "cham" ? "참나물" : "깻잎"} 페스토
          </span>
          <span className="jar-caption">개발 콘셉트 이미지</span>
        </div>
      </div>
    </div>
  );
}
function Header({ home }: { home: boolean }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="header">
      <a className="wordmark" href="/" aria-label="슬슬페스토 홈">
        슬슬페스토<span>SULSEUL PESTO</span>
      </a>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        id="site-nav"
        className={open ? "nav open" : "nav"}
        aria-label="주 메뉴"
      >
        {navigation.map(([id, label]) => (
          <a
            key={id}
            href={`${home ? "" : "/"}#${id}`}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          className="nav-contact"
          href={`${home ? "" : "/"}#contact`}
          onClick={() => setOpen(false)}
        >
          제휴 문의 <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  );
}
function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <a href="/" className="wordmark">
          슬슬페스토<span>SULSEUL PESTO</span>
        </a>
        <p>우리의 나물로, 조금 더 새로운 일상.</p>
        <a href="/privacy/">
          개인정보 안내 <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>대표 {site.founder} · 법인 설립 준비 중</span>
        <span>© {new Date().getFullYear()} SULSEUL PESTO</span>
      </div>
    </footer>
  );
}
function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-line" /> KOREAN GREENS, A NEW EVERYDAY.
          </p>
          <h1 id="hero-title">
            나물, 이제
            <br />
            무치지 말고
            <br />
            <span>한 스푼.</span>
            <span className="headline-dot" />
          </h1>
          <p className="hero-description">
            익숙한 우리 나물의 새로운 쓰임.
            <br />
            한국의 로컬 식재료를 일상의 페스토로 만듭니다.
          </p>
          <div className="hero-actions">
            <a href="#products" className="button solid">
              우리의 페스토 <ArrowUpRight size={18} />
            </a>
            <a href="#partners" className="text-link">
              함께 만들어가요 <ArrowRight size={17} />
            </a>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-circle" />
          <Botanical className="hero-botanical" />
          <span className="art-note">
            From our greens,
            <br />
            to your everyday.
          </span>
          <div className="hero-jar">
            <Jar />
          </div>
          <span className="round-seal">
            우리 나물의
            <br />
            <strong>새로운 발견</strong>
            <Leaf size={22} />
          </span>
          <p className="concept-note">
            브랜드·패키지 콘셉트 일러스트 · 실제 제품과 다를 수 있습니다.
          </p>
        </div>
        <div className="hero-bottom">
          <span>가장 익숙한 재료에서 시작하는, 새로운 식탁</span>
          <a href="#story">
            SCROLL TO DISCOVER <span>↓</span>
          </a>
        </div>
      </section>
      <div className="brand-strip">
        <span>우리 땅의 식재료</span>
        <Plus size={14} />
        <span>요리하는 마음</span>
        <Plus size={14} />
        <span>한 스푼의 새로운 일상</span>
      </div>
      <section id="story" className="section story">
        <div className="section-heading">
          <p className="eyebrow">01 / OUR STORY</p>
          <h2>
            늘 곁에 있던 나물,
            <br />
            조금 다른 가능성.
          </h2>
        </div>
        <div className="story-body">
          <p className="large-copy">
            우리에게 익숙한 맛이
            <br />
            새로운 일상이 될 수 있도록.
          </p>
          <p>
            슬슬페스토는 김태완 창업자의 조리 경험에서 출발합니다. 매일의
            식탁에서 만나는 한국 나물을, 더 간편하고 다양한 방식으로 즐길 수
            없을까 하는 생각을 담았습니다.
          </p>
          <p>
            참나물과 깻잎처럼 친숙한 식재료에 페스토라는 새로운 쓰임을 더합니다.
            빵에 바르고, 면에 버무리고, 샐러드에 곁들이는 한 스푼. 작은 변화로
            풍성해지는 식문화를 만들어갑니다.
          </p>
          <div className="founder">
            <span className="founder-mark">
              <Leaf size={23} />
            </span>
            <span>
              슬슬페스토 창업자 <strong>{site.founder}</strong>
            </span>
          </div>
        </div>
      </section>
      <section id="products" className="section products">
        <div className="section-heading row">
          <div>
            <p className="eyebrow">02 / OUR PESTO</p>
            <h2>
              우리 나물로 만든,
              <br />
              우리의 페스토.
            </h2>
          </div>
          <p>
            식탁에 새로운 선택을 더할 두 가지 페스토.
            <br />
            지금은 더 좋은 한 스푼을 준비하고 있습니다.
          </p>
        </div>
        <div className="product-grid">
          {products.map((p, i) => (
            <article key={p.id} className="product-card">
              <div className={`product-art ${p.tone}`}>
                <span className="product-number">
                  0{i + 1} / {p.english}
                </span>
                <Botanical variant={p.tone} className="product-botanical" />
                <Jar tone={p.tone} small />
                <span className="product-art-note">패키지 콘셉트 일러스트</span>
              </div>
              <div className="product-info">
                <div className="product-title">
                  <h3>{p.name}</h3>
                  <span className="status">
                    <span />
                    {p.status}
                  </span>
                </div>
                <p>{p.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="product-disclaimer">
          현재 제품 개발 단계입니다. 제품의 구성·용량·가격·출시 일정은 확정 후
          안내합니다. 현재 판매하지 않습니다.
        </p>
      </section>
      <section id="table" className="section table">
        <div className="section-heading row">
          <div>
            <p className="eyebrow">03 / ON YOUR TABLE</p>
            <h2>
              한 스푼이면,
              <br />
              일상이 조금 새로워져요.
            </h2>
          </div>
          <p>
            어렵게 요리하지 않아도 괜찮아요.
            <br />
            좋아하는 음식에 슬슬, 곁들여보세요.
          </p>
        </div>
        <div className="usage-grid">
          {[
            {
              icon: Wheat,
              title: "빵 위에, 가볍게",
              sub: "BREAD & BRUNCH",
              text: "바삭하게 구운 빵에 페스토를 펴 발라보세요. 간단한 브런치 아이디어가 됩니다.",
              kind: "bread",
            },
            {
              icon: Utensils,
              title: "파스타에, 향긋하게",
              sub: "PASTA & NOODLES",
              text: "삶은 면에 페스토를 버무려보세요. 익숙한 파스타를 새롭게 즐기는 방법입니다.",
              kind: "pasta",
            },
            {
              icon: Salad,
              title: "샐러드에, 산뜻하게",
              sub: "SALAD & BOWLS",
              text: "좋아하는 채소와 곡물 위에 페스토를 곁들여보세요. 한 그릇의 색다른 조합을 찾아보세요.",
              kind: "salad",
            },
          ].map(({ icon: Icon, title, sub, text, kind }, i) => (
            <article className="usage-card" key={kind}>
              <div className={`food-art ${kind}`} aria-hidden="true">
                <div className="plate">
                  <Icon strokeWidth={0.8} />
                  <span className="food-leaf">
                    <Leaf />
                  </span>
                </div>
                <span className="food-no">0{i + 1}</span>
              </div>
              <p className="eyebrow">{sub}</p>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="usage-note">
          활용 아이디어입니다. 실제 조리 시 확정된 제품의 원재료·알레르기·보관
          안내를 확인해 주세요.
        </p>
      </section>
      <section id="partners" className="partners">
        <div>
          <p className="eyebrow">04 / GROW TOGETHER</p>
          <h2>
            좋은 재료의 가능성,
            <br />
            함께 넓혀가요.
          </h2>
          <p>
            우리 나물의 새로운 쓰임을 함께 고민할 파트너를 기다립니다.
            <br />
            작은 아이디어부터 편하게 이야기해 주세요.
          </p>
          <a className="button light" href={inquiryHref}>
            이메일로 협력 문의 <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="partner-list">
          {[
            ["01", "베이커리 · 카페", "메뉴와 식재료의 새로운 조합"],
            ["02", "여행사 · 숙박업체", "지역의 맛을 전하는 식문화 경험"],
            ["03", "OEM 제조업체", "제품 개발과 제조 협력"],
            ["04", "그 밖의 파트너", "함께 만들고 싶은 다양한 아이디어"],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span>{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
              <ArrowUpRight size={21} />
            </div>
          ))}
        </div>
      </section>
      <section id="contact" className="section contact">
        <div>
          <p className="eyebrow">05 / SAY HELLO</p>
          <h2>슬슬, 이야기 나눠요.</h2>
          <p>브랜드와 제품 개발, 협력에 대한 문의를 기다립니다.</p>
        </div>
        <div className="contact-links">
          <a href={emailHref}>
            <Mail size={20} />
            <span>{site.email}</span>
            <ArrowUpRight size={20} />
          </a>
          <a href={site.phoneHref}>
            <Phone size={20} />
            <span>{site.phone}</span>
            <ArrowUpRight size={20} />
          </a>
          <p>
            담당: {site.founder} · 이메일 버튼을 누르면 메일 앱이 열립니다.
            <br />이 사이트에서는 문의 내용을 직접 수집하지 않습니다.
          </p>
        </div>
      </section>
    </>
  );
}
function Privacy() {
  return (
    <section className="legal section">
      <p className="eyebrow">PRIVACY NOTICE</p>
      <h1>개인정보 안내</h1>
      <p className="large-copy">현재는 이메일과 전화로 문의를 받습니다.</p>
      <h2>사이트 내 문의 수집</h2>
      <p>
        이 사이트에는 회원가입, 결제, 문의 제출 폼이 없습니다. 별도의 분석·광고
        도구를 설치하지 않았으며, 앱에서 쿠키나 로컬 저장소를 사용하지 않습니다.
      </p>
      <h2>이메일·전화 문의</h2>
      <p>
        연락처 링크를 선택하면 사용자의 메일 또는 전화 앱으로 이동합니다. 직접
        보낸 이메일이나 통화 내용에는 개인정보가 포함될 수 있습니다. 문의에
        불필요한 민감정보는 보내지 말아 주세요.
      </p>
      <h2>운영 준비 및 추후 안내</h2>
      <p>
        슬슬페스토는 법인 설립 준비 단계입니다. 개인정보 처리의 운영주체, 처리
        근거, 보유기간 등 확정되지 않은 조건은 임의로 기재하지 않습니다. 이
        페이지는 현재 사이트 기능에 대한 안내이며, 정식 개인정보 처리방침을
        대신하지 않습니다.
      </p>
      <p>
        문의폼은 운영주체·수집항목·이용목적·보유기간·처리위탁 여부·권리 행사
        방법 등 실제 처리조건을 확인하고 필요한 안내와 동의 절차를 마련한 후에
        활성화할 예정입니다. 정식 공개 전 호스팅 제공자의 접속 로그 처리도
        확인해야 합니다.
      </p>
      <h2>연락처</h2>
      <p>
        연락 담당: {site.founder}
        <br />
        <a href={emailHref}>{site.email}</a>
        <br />
        <a href={site.phoneHref}>{site.phone}</a>
      </p>
      <a className="button solid" href="/">
        홈으로 돌아가기 <ArrowRight size={18} />
      </a>
    </section>
  );
}
function NotFound() {
  return (
    <section className="not-found section">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <Leaf size={64} strokeWidth={1} />
      <h1>잠시, 다른 길로 왔네요.</h1>
      <p>
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        슬슬페스토의 첫 화면에서 다시 만나세요.
      </p>
      <a className="button solid" href="/">
        홈으로 돌아가기 <ArrowRight size={18} />
      </a>
    </section>
  );
}
export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const home = path === "/";
  const privacy = path === "/privacy";
  useEffect(() => {
    document.title = home
      ? "슬슬페스토 | 나물, 이제 무치지 말고 한 스푼."
      : privacy
        ? "개인정보 안내 | 슬슬페스토"
        : "페이지를 찾을 수 없습니다 | 슬슬페스토";
    const desc = document.querySelector('meta[name="description"]');
    if (!home)
      desc?.setAttribute(
        "content",
        privacy
          ? "슬슬페스토의 현재 문의 방식과 개인정보 처리 준비사항을 안내합니다."
          : "요청하신 페이지를 찾을 수 없습니다. 슬슬페스토 홈으로 이동해 주세요.",
      );
  }, [home, privacy]);
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 바로가기
      </a>
      <Header home={home} />
      <main id="main" tabIndex={-1}>
        {home ? <Home /> : privacy ? <Privacy /> : <NotFound />}
      </main>
      <Footer />
    </>
  );
}
