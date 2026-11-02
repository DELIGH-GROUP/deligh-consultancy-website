import Link from "next/link";
import { type Locale, t, ui } from "@/lib/i18n";
import { industries, services } from "@/lib/data";
import { Arrow } from "./arrow";

const IMG = {
  curved: "/images/dc-hd-curved-glass.webp",
  lobby: "/images/dc-hd-reception-lobby.webp",
  bridge: "/images/dc-hd-bridge-industrial.webp",
  meeting: "/images/dc-hd-executive-meeting.webp",
  analytics: "/images/dc-hd-financial-analytics.webp",
  workshop: "/images/dc-hd-strategy-workshop.webp",
  headquarters: "/images/dc-hd-group-headquarters.webp",
  teamwork: "/images/dc-hd-collaborative-office.webp",
  service1: "/images/dc-generated-service-1.webp",
  service2: "/images/dc-generated-service-2.webp",
  service3: "/images/dc-generated-service-3.webp",
  service4: "/images/dc-generated-service-4.webp",
  group: "/images/dc-generated-group.webp",
  hero: "/images/dc-generated-hero.webp",
  meeting2: "/images/dc-hd-collaborative-office.webp"
} as const;

const featured = [
  { slug: "corporate-advisory", photo: IMG.meeting },
  { slug: "financial-advisory", photo: IMG.analytics },
  { slug: "infrastructure-advisory", photo: IMG.bridge },
  { slug: "digital-it-advisory", photo: IMG.workshop }
];

const sectorImages = [IMG.bridge, IMG.service2, IMG.service3, IMG.teamwork];
const industryCardImages = [IMG.group, IMG.teamwork, IMG.meeting2, IMG.lobby, IMG.analytics, IMG.workshop, IMG.curved, IMG.service4];
const capsulePhotos = [IMG.lobby, IMG.headquarters, IMG.service1, IMG.meeting2, IMG.analytics, IMG.service4];

export default function Home({ locale }: { locale: Locale }) {
  const href = (path: string) => `/${locale}/${path}`;

  return <>
    <section className="hero" aria-labelledby="home-hero-title">
      <div className="hero-grid">
        <div className="hero-content">
          <h1 id="home-hero-title">{t(ui.heroTitle, locale)}</h1>
          <p className="hero-lead">{t({ en: 'Strategy, financial, infrastructure, enterprise and technology advisory for a changing world.', hi: 'बदलती दुनिया के लिए strategy, financial, infrastructure, enterprise और technology advisory।', ar: 'استشارات في الاستراتيجية والتمويل والبنية التحتية والمؤسسات والتقنية لعالم متغير.' }, locale)}</p>
          <div className="hero-actions">
            <Link className="btn btn-navy" href={href('services')}>{t(ui.explore, locale)} <Arrow /></Link>
            <Link className="text-link" href={href('about')}>{t({ en: 'Who We Are', hi: 'हम कौन हैं', ar: 'من نحن' }, locale)} <Arrow /></Link>
          </div>
        </div>
        <div className="hero-visual" role="img" aria-label={t(ui.brandAlt, locale)}><div className="hero-image" /></div>
      </div>
    </section>

    <div className="brand-band"><div className="container brand-band-inner">
      <span><b aria-hidden="true" className="pillar-icon">▤</b><span>{t({ en: 'Strategic Insight', hi: 'रणनीतिक समझ', ar: 'رؤية استراتيجية' }, locale)}<small>{t({ en: 'Business and market perspective', hi: 'व्यवसाय और बाजार दृष्टि', ar: 'رؤية الأعمال والأسواق' }, locale)}</small></span></span>
      <span><b aria-hidden="true" className="pillar-icon">◎</b><span>{t({ en: 'Execution Focus', hi: 'कार्यान्वयन फोकस', ar: 'التركيز على التنفيذ' }, locale)}<small>{t({ en: 'From strategy to measurable outcomes', hi: 'रणनीति से measurable outcomes', ar: 'من الاستراتيجية إلى النتائج القابلة للقياس' }, locale)}</small></span></span>
      <span><b aria-hidden="true" className="pillar-icon">♧</b><span>{t({ en: 'Expert Teams', hi: 'विशेषज्ञ टीमें', ar: 'فرق الخبراء' }, locale)}<small>{t({ en: 'Multidisciplinary and sector experienced', hi: 'बहु-विषयक और sector experienced', ar: 'خبرات متعددة التخصصات والقطاعات' }, locale)}</small></span></span>
      <span><b aria-hidden="true" className="pillar-icon">◎</b><span>{t({ en: 'Global Perspective', hi: 'वैश्विक दृष्टिकोण', ar: 'منظور عالمي' }, locale)}<small>{t({ en: 'Local understanding, worldwide reach', hi: 'स्थानीय समझ, वैश्विक पहुंच', ar: 'فهم محلي ووصول عالمي' }, locale)}</small></span></span>
    </div></div>

    <section className="section container" id="expertise">
      <div className="section-intro"><div><h2>{t({ en: 'Our Expertise', hi: 'हमारी विशेषज्ञता', ar: 'خبراتنا' }, locale)}</h2></div><div><p>{t({ en: 'Corporate, financial, infrastructure and technology advisory, designed around complex business challenges.', hi: 'जटिल business challenges के लिए corporate, financial, infrastructure और technology advisory।', ar: 'استشارات مؤسسية ومالية وبنية تحتية وتقنية مهيأة للتحديات المعقدة.' }, locale)}</p><Link className="inline-arrow" href={href('services')}>{t(ui.allServices, locale)} <Arrow /></Link></div></div>
      <div className="feature-cards">{featured.map((item) => { const service = services.find((s) => s.slug === item.slug)!; return <Link key={item.slug} className="feature-card" href={href(`services/${service.slug}`)}>
        <div className="feature-photo" style={{ backgroundImage: `linear-gradient(0deg,rgba(3,20,37,.82),rgba(3,20,37,.04) 72%),url('${item.photo}')` }} />
        <div className="feature-card-copy"><h3>{t(service.title, locale)}</h3><p>{t(service.summary, locale)}</p><span className="feature-arrow" aria-hidden="true"><Arrow diagonal /></span></div>
      </Link>; })}</div>
      <div className="service-capsule-grid" aria-label={t({ en: 'More advisory practices', hi: 'अन्य परामर्श सेवाएँ', ar: 'ممارسات استشارية إضافية' }, locale)}>
        {services.filter((s) => !featured.some((f) => f.slug === s.slug)).slice(0, 6).map((s, i) => <Link href={href(`services/${s.slug}`)} key={s.slug} className="capsule-service">
          <span className="capsule-photo" style={{ backgroundImage: `url('${capsulePhotos[i]}')` }} aria-hidden="true" />
          <span className="capsule-copy"><strong>{t(s.title, locale)}</strong><small>{t(s.summary, locale)}</small></span>
          <span className="capsule-arrow"><Arrow diagonal /></span>
        </Link>)}
      </div>
    </section>

    <section className="about-feature"><div className="container about-feature-grid">
      <div className="about-feature-photo" role="img" aria-label={t({ en: 'Business leaders collaborating in a contemporary office', hi: 'आधुनिक कार्यालय में विशेषज्ञों की चर्चा', ar: 'قادة أعمال يتعاونون في مكتب حديث' }, locale)} />
      <div className="about-feature-body"><span className="section-label">{t({ en: 'Who we are', hi: 'हम कौन हैं', ar: 'من نحن' }, locale)}</span><h2>{t({ en: 'A trusted advisory partner for a changing world.', hi: 'बदलती दुनिया के लिए भरोसेमंद advisory partner।', ar: 'شريك استشاري موثوق لعالم متغير.' }, locale)}</h2><p>{t({ en: 'DELIGH CONSULTANCY is being developed as the consulting parent within DELIGH GROUP, bringing together business strategy, finance, infrastructure, enterprise and technology perspectives in one accountable organisation.', hi: 'DELIGH CONSULTANCY को DELIGH GROUP के consulting parent के रूप में विकसित किया जा रहा है, जो business strategy, finance, infrastructure, enterprise और technology perspectives को एक accountable organisation में जोड़ता है।', ar: 'يتم تطوير DELIGH CONSULTANCY لتكون الشركة الأم للاستشارات ضمن DELIGH GROUP، وتجمع بين خبرات الأعمال والتمويل والبنية التحتية والتقنية ضمن مؤسسة واحدة مسؤولة.' }, locale)}</p><p>{t({ en: 'Each engagement begins with an understanding of the business, a clearly defined scope, and the right specialists working towards practical outcomes.', hi: 'हर कार्य की शुरुआत व्यवसाय को समझने, स्पष्ट कार्यक्षेत्र तय करने और व्यावहारिक परिणामों के लिए उपयुक्त विशेषज्ञों को साथ लाने से होती है।', ar: 'يبدأ كل تكليف بفهم الأعمال وتحديد نطاق واضح وتجميع الخبراء المناسبين لتحقيق نتائج عملية.' }, locale)}</p><Link className="inline-arrow" href={href('about')}>{t(ui.exploreApproach, locale)} <Arrow /></Link></div>
    </div></section>

    <section className="section container sectors-section"><div className="section-intro"><div><h2>{t(ui.sectorsTitle, locale)}</h2></div><div><p>{t(ui.sectorsLead, locale)}</p><Link className="inline-arrow" href={href('industries')}>{t({ en: 'Explore industries', hi: 'उद्योग देखें', ar: 'استكشف القطاعات' }, locale)} <Arrow /></Link></div></div>
      <div className="sector-photo-grid">{industries.slice(0, 4).map((industry, index) => <Link href={href('industries')} className="sector-photo-card" key={index}>
        <div className="sector-photo" style={{ backgroundImage: `linear-gradient(0deg,rgba(4,24,41,.84),rgba(4,24,41,.08) 74%),url('${sectorImages[index]}')` }} />
        <h3>{t(industry.title, locale)}</h3><span className="feature-arrow" aria-hidden="true"><Arrow diagonal /></span>
      </Link>)}</div>
      <div className="industry-more-grid">{industries.slice(4, 12).map((industry, index) => <Link href={href('industries')} className="sector-photo-card sector-photo-card-sm" key={index}>
        <div className="sector-photo" style={{ backgroundImage: `linear-gradient(0deg,rgba(4,24,41,.82),rgba(4,24,41,.08) 74%),url('${industryCardImages[index]}')` }} />
        <h3>{t(industry.title, locale)}</h3><span className="feature-arrow" aria-hidden="true"><Arrow diagonal /></span>
      </Link>)}</div>
    </section>

    <section className="navy-feature"><div className="container navy-feature-inner"><div><h2>{t(ui.globalTitle, locale)}</h2></div><div><p>{t(ui.globalText, locale)}</p><Link className="light-link" href={href('teams-offices')}>{t(ui.teamLink, locale)} <Arrow /></Link></div></div></section>

    <section className="section container">
      <div className="section-intro"><div><h2>{t(ui.insightsTitle, locale)}</h2></div><div><p>{t(ui.insightsLead, locale)}</p><Link className="inline-arrow" href={href('insights')}>{t(ui.insightLink, locale)} <Arrow /></Link></div></div>
      <div className="insights-panel"><div><span className="section-label">{t({ en: 'Insights & perspectives', hi: 'विश्लेषण और दृष्टिकोण', ar: 'الرؤى ووجهات النظر' }, locale)}</span><h3>{t({ en: 'Ideas grounded in business realities.', hi: 'व्यावसायिक वास्तविकताओं पर आधारित विचार।', ar: 'أفكار تنطلق من واقع الأعمال.' }, locale)}</h3></div><p>{t({ en: 'Research notes, market commentary and practical operating viewpoints will appear here as our editorial programme develops. We are intentionally avoiding vague AI-style filler content.', hi: 'जैसे-जैसे editorial programme विकसित होगा, research notes, market commentary और practical viewpoints यहाँ आएंगे। हम जानबूझकर vague AI-style filler content से बच रहे हैं।', ar: 'ستظهر هنا ملاحظات بحثية وتعليقات سوقية ورؤى تشغيلية عملية مع تطور البرنامج التحريري. نحن نتجنب عمداً المحتوى العام وغير الدقيق.' }, locale)}</p></div>
    </section>
  </>;
}
