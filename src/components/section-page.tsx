import Link from 'next/link';
import { type Locale, type Copy, t, ui } from '@/lib/i18n';
import { services, industries } from '@/lib/data';
import { sectionContent } from '@/lib/sections';
import { Arrow } from './arrow';
import AboutPage from './about-page';

const copy = (en: string, hi: string, ar: string): Copy => ({ en, hi, ar });
const IMG = {
  curved: '/images/dc-hd-curved-glass.webp',
  lobby: '/images/dc-hd-reception-lobby.webp',
  bridge: '/images/dc-hd-bridge-industrial.webp',
  meeting: '/images/dc-hd-executive-meeting.webp',
  analytics: '/images/dc-hd-financial-analytics.webp',
  workshop: '/images/dc-hd-strategy-workshop.webp',
  headquarters: '/images/dc-hd-group-headquarters.webp',
  teamwork: '/images/dc-hd-collaborative-office.webp',
  service1: '/images/dc-generated-service-1.webp',
  service2: '/images/dc-generated-service-2.webp',
  service3: '/images/dc-generated-service-3.webp',
  service4: '/images/dc-generated-service-4.webp',
  group: '/images/dc-generated-group.webp',
  hero: '/images/dc-generated-hero.webp',
  meeting2: '/images/dc-hd-collaborative-office.webp',
  prayagraj: '/images/dc-city-prayagraj.webp',
  delhi: '/images/dc-city-delhi.webp',
  lucknow: '/images/dc-city-lucknow.webp',
  hyderabad: '/images/dc-city-hyderabad.webp',
  pune: '/images/dc-city-pune.webp',
  workHero: '/images/dc-hero-work.webp',
  insightsHero: '/images/dc-hero-insights.webp',
  partnersHero: '/images/dc-hero-partners.webp',
  careersHero: '/images/dc-hero-careers.webp',
  contactHero: '/images/dc-hero-contact.webp',
  teamsReceptionHero: '/images/dc-hero-teams-reception.webp'
} as const;
const servicePhotos = [IMG.meeting, IMG.analytics, IMG.bridge, IMG.workshop, IMG.service1, IMG.lobby];
const serviceMiniPhotos = [IMG.group, IMG.curved, IMG.bridge, IMG.teamwork, IMG.analytics, IMG.meeting2, IMG.workshop, IMG.lobby, IMG.service3];
const industryPhotos = [IMG.bridge, IMG.analytics, IMG.curved, IMG.teamwork, IMG.service2, IMG.lobby];
const industryMiniPhotos = [IMG.workshop, IMG.meeting2, IMG.service4, IMG.group, IMG.teamwork, IMG.service1];
const picture = (id: string) => `linear-gradient(0deg,rgba(3,20,37,.76),rgba(3,20,37,.04) 78%),url('${id}')`;
const pageHeroImages: Record<string, string> = {
  services: IMG.analytics,
  industries: IMG.bridge,
  privacy: IMG.teamwork,
  'teams-offices': IMG.teamsReceptionHero,
  work: IMG.workHero,
  insights: IMG.insightsHero,
  partners: IMG.partnersHero,
  careers: IMG.careersHero,
  contact: IMG.contactHero
};

const serviceExplanations = [
  copy('Business structuring, strategic growth, transaction support and corporate decision-making.', 'व्यवसाय संरचना, strategic growth, transaction support और corporate decisions.', 'هيكلة الأعمال والنمو الاستراتيجي ودعم الصفقات.'),
  copy('Financial models, FP&A, funding readiness, forecasts and capital planning.', 'financial models, FP&A, funding readiness और capital planning.', 'النماذج المالية والتخطيط والجاهزية التمويلية.'),
  copy('Feasibility, project structuring, PPP support and EPCM coordination.', 'feasibility, project structuring, PPP support और EPCM coordination.', 'دراسات الجدوى وهيكلة المشاريع ودعم PPP.'),
  copy('IT strategy, ERP selection, cybersecurity governance and digital transformation.', 'IT strategy, ERP selection, cybersecurity governance और digital transformation.', 'استراتيجية التقنية واختيار ERP والحوكمة الرقمية.')
];
const industrySummaries = [
  copy('Capital projects, concession structures and long-horizon planning.', 'पूँजीगत परियोजनाएँ, रियायत संरचना और दीर्घकालीन योजना।', 'المشاريع الرأسمالية وهياكل الامتياز والتخطيط طويل المدى.'),
  copy('Financial institutions, capital allocation and regulatory operating models.', 'वित्तीय संस्थाएँ, पूँजी आवंटन और नियामकीय संचालन मॉडल।', 'المؤسسات المالية وتخصيص رأس المال ونماذج التشغيل التنظيمية.'),
  copy('Energy transition, utility networks and project economics.', 'ऊर्जा बदलाव, उपयोगिता नेटवर्क और परियोजना अर्थशास्त्र।', 'انتقال الطاقة وشبكات المرافق واقتصاديات المشاريع.'),
  copy('Platforms, SaaS, data systems and digital operating models.', 'प्लेटफॉर्म, SaaS, डेटा प्रणालियाँ और डिजिटल संचालन मॉडल।', 'المنصات والبرمجيات وأنظمة البيانات ونماذج التشغيل الرقمية.'),
  copy('Institutional partnerships, education services and student operations.', 'संस्थागत साझेदारियाँ, शिक्षा सेवाएँ और छात्र संचालन।', 'الشراكات المؤسسية والخدمات التعليمية وعمليات الطلاب.'),
  copy('Care delivery models, operational effectiveness and digital enablement.', 'देखभाल सेवा मॉडल, संचालन सुधार और डिजिटल क्षमताएँ।', 'نماذج تقديم الرعاية والكفاءة التشغيلية والتمكين الرقمي.'),
  copy('Capacity expansion, capex planning and operating efficiency.', 'उत्पादन विस्तार, पूँजीगत निवेश और संचालन दक्षता।', 'توسيع الطاقة الإنتاجية وتخطيط النفقات وكفاءة التشغيل.'),
  copy('Customer experience, retail networks and responsible growth.', 'ग्राहक अनुभव, रिटेल नेटवर्क और जिम्मेदार विकास।', 'تجربة العملاء وشبكات التجزئة والنمو المسؤول.'),
  copy('Warehousing, movement, procurement and network design.', 'भंडारण, परिवहन, खरीद और नेटवर्क डिजाइन।', 'التخزين والنقل والمشتريات وتصميم الشبكات.'),
  copy('Agricultural value chains, food systems and market access.', 'कृषि मूल्य शृंखला, खाद्य प्रणालियाँ और बाजार पहुँच।', 'سلاسل القيمة الزراعية والأنظمة الغذائية والوصول للأسواق.'),
  copy('Asset strategy, development structuring and occupancy planning.', 'परिसंपत्ति रणनीति, विकास संरचना और उपयोग योजना।', 'استراتيجية الأصول وهيكلة التطوير وتخطيط الإشغال.'),
  copy('Public-service programmes, governance and delivery coordination.', 'लोकसेवा कार्यक्रम, शासन और कार्यान्वयन समन्वय।', 'برامج الخدمات العامة والحوكمة وتنسيق التنفيذ.')
];

const officeCards = [
  { city: 'Prayagraj', status: copy('Proposed headquarters', 'प्रस्तावित मुख्यालय', 'المقر الرئيسي المقترح'), image: IMG.prayagraj },
  { city: 'Delhi', status: copy('Planned regional presence', 'प्रस्तावित क्षेत्रीय उपस्थिति', 'حضور إقليمي مخطط له'), image: IMG.delhi },
  { city: 'Lucknow', status: copy('Planned regional presence', 'प्रस्तावित क्षेत्रीय उपस्थिति', 'حضور إقليمي مخطط له'), image: IMG.lucknow },
  { city: 'Hyderabad', status: copy('Planned regional presence', 'प्रस्तावित क्षेत्रीय उपस्थिति', 'حضور إقليمي مخطط له'), image: IMG.hyderabad },
  { city: 'Pune', status: copy('Planned regional presence', 'प्रस्तावित क्षेत्रीय उपस्थिति', 'حضور إقليمي مخطط له'), image: IMG.pune }
];
const partnerCards = [
  { title: copy('Technology & engineering', 'तकनीक और इंजीनियरिंग', 'التقنية والهندسة'), image: IMG.group },
  { title: copy('Finance & corporate services', 'वित्त और कॉर्पोरेट सेवाएँ', 'الخدمات المالية والمؤسسية'), image: IMG.service1 },
  { title: copy('Infrastructure & EPCM', 'अवसंरचना और EPCM', 'البنية التحتية وإدارة المشاريع'), image: IMG.bridge },
  { title: copy('Certification & regulatory coordination', 'प्रमाणन और नियामकीय समन्वय', 'تنسيق الشهادات والامتثال'), image: IMG.lobby },
  { title: copy('Education & international services', 'शिक्षा और अंतरराष्ट्रीय सेवाएँ', 'التعليم والخدمات الدولية'), image: IMG.meeting2 },
  { title: copy('Independent domain specialists', 'स्वतंत्र क्षेत्र विशेषज्ञ', 'خبراء مستقلون'), image: IMG.service4 }
];

function VisualHero({ locale, kicker, title, lead, image }: { locale: Locale; kicker: Copy; title: Copy; lead: Copy; image: string }) {
  return <section className="section-page-hero"><div className="section-page-hero-media" style={{ backgroundImage: `url('${image}')` }} /><div className="container section-page-hero-inner"><div className="section-page-copy"><p className="eyebrow hero-kicker">{t(kicker, locale)}</p><h1>{t(title, locale)}</h1><p>{t(lead, locale)}</p></div></div></section>;
}

export function PageHeading({ locale, eyebrow, title, lead }: { locale: Locale; eyebrow?: string; title: Copy; lead: Copy }) {
  return <section className="page-heading"><div className="container">
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h1>{t(title, locale)}</h1><p>{t(lead, locale)}</p>
  </div></section>;
}

export default function SectionPage({ locale, section }: { locale: Locale; section: string }) {
  const tr = (en: string, hi: string, ar: string) => t(copy(en, hi, ar), locale);
  if (section === 'about') return <AboutPage locale={locale} />;

  if (section === 'services') return <>
    <VisualHero locale={locale} kicker={copy('Services', 'सेवाएँ', 'الخدمات')} title={copy('Consulting across the decisions that matter.', 'महत्वपूर्ण निर्णयों के लिए प्रभावी परामर्श।', 'استشارات للقرارات التي تصنع الفرق.')} lead={copy('Explore the advisory practices within our evolving multidisciplinary platform. Our specialists connect strategic direction with measurable execution, from initial assessment to delivery oversight.', 'हमारे evolving multidisciplinary platform की advisory practices देखें। हमारे विशेषज्ञ शुरुआत से कार्यान्वयन तक रणनीतिक दिशा और व्यावहारिक परिणामों को जोड़ते हैं।', 'استكشف الممارسات الاستشارية ضمن منصتنا المتطورة، ونربط التوجيه الاستراتيجي بالتنفيذ العملي من التقييم حتى المتابعة.')} image={pageHeroImages.services} />
    <section className="section container"><div className="directory-visual-grid">{services.slice(0, 6).map((s, i) => <Link className="directory-photo-card" key={s.slug} href={`/${locale}/services/${s.slug}`}><span className="directory-photo" style={{ backgroundImage: picture(servicePhotos[i]) }} /><span className="directory-photo-content"><strong>{t(s.title, locale)}</strong><small>{t(s.summary, locale)}</small></span><span className="directory-arrow"><Arrow diagonal /></span></Link>)}</div><div className="full-services-grid full-services-capsule-grid">{services.slice(6).map((s, i) => <Link className="full-service" key={s.slug} href={`/${locale}/services/${s.slug}`}>
      <span className="directory-mini-photo" aria-hidden="true" style={{ backgroundImage: `url('${serviceMiniPhotos[i]}')` }} />
      <span className="directory-service-copy"><h2>{t(s.title, locale)}</h2><p>{t(s.summary, locale)}</p><span className="inline-arrow">{t(ui.explore, locale)} <Arrow /></span></span></Link>)}</div></section>
    <section className="section container service-editorial-row">{serviceExplanations.map((text, index) => <article key={index} className="editorial-mini-card"><div className="editorial-mini-image" style={{ backgroundImage: picture(servicePhotos[index]) }} /><div><p>{t(text, locale)}</p></div></article>)}</section>
  </>;

  if (section === 'industries') return <>
    <VisualHero locale={locale} kicker={copy('Industries', 'उद्योग', 'القطاعات')} title={copy('Sector context is essential to better advice.', 'बेहतर सलाह के लिए sector context जरूरी है।', 'فهم القطاع أساس الاستشارة الأفضل.')} lead={copy('Industry-specific insight informs how we assess opportunities, manage complexity and coordinate delivery across sectors.', 'उद्योग-विशिष्ट समझ से हम अवसरों का मूल्यांकन करते हैं, जटिलताओं को संभालते हैं और विभिन्न क्षेत्रों में प्रभावी समन्वय करते हैं।', 'توجهنا خبرتنا القطاعية في تقييم الفرص وإدارة التعقيد وتنسيق التنفيذ عبر القطاعات.')} image={pageHeroImages.industries} />
    <section className="section container"><div className="directory-visual-grid">{industries.slice(0, 6).map((s, i) => <div className="directory-photo-card" key={i}><span className="directory-photo" style={{ backgroundImage: picture(industryPhotos[i]) }} /><span className="directory-photo-content"><strong>{t(s.title, locale)}</strong><small>{t(industrySummaries[i], locale)}</small></span></div>)}</div><div className="industry-grid all-industries industry-image-grid">{industries.slice(6).map((industry, i) => <article className="industry-tile industry-story-card-lite" key={i}>
      <span className="industry-tile-photo" aria-hidden="true" style={{ backgroundImage: `url('${industryMiniPhotos[i]}')` }} />
      <h3>{t(industry.title, locale)}</h3><p>{t(industrySummaries[i + 6], locale)}</p>
      <span className="industry-tile-action">{tr('Sector overview', 'क्षेत्र परिचय', 'نظرة على القطاع')} <Arrow diagonal /></span>
    </article>)}</div></section>
  </>;

  if (section === 'privacy') return <>
    <VisualHero locale={locale} kicker={copy('Policies', 'नीतियाँ', 'السياسات')} title={copy('Privacy & website preferences', 'गोपनीयता और वेबसाइट विकल्प', 'الخصوصية وتفضيلات الموقع')} lead={copy('Foundation preview: this page is not a final corporate privacy notice.', 'प्रारंभिक preview: यह अंतिम corporate privacy notice नहीं है।', 'نسخة أولية: هذه ليست إشعار الخصوصية المؤسسي النهائي.')} image={pageHeroImages.privacy} />
    <section className="container prose-page"><p>{t(ui.cookieText, locale)}</p><p>{tr('The live privacy notice will identify the legal operator, data categories, purposes, rights, retention, transfers and contact point after these details are confirmed. Do not publish this preview as an operational legal notice.', 'अंतिम policy में verification के बाद legal operator, data categories, purposes, rights, retention और contact details जोड़ी जाएंगी। इस preview को final legal notice मानकर publish न करें।', 'ستحدد السياسة النهائية الجهة القانونية وأنواع البيانات والأغراض والحقوق ومدد الاحتفاظ وبيانات التواصل بعد التحقق. لا تنشر هذه النسخة كإشعار قانوني نهائي.')}</p></section>
  </>;

  const entry = sectionContent[section];
  if (!entry) return null;
  const heroImage = pageHeroImages[section] ?? IMG.curved;

  return <>
    <VisualHero locale={locale} kicker={copy('DELIGH CONSULTANCY', 'DELIGH CONSULTANCY', 'DELIGH CONSULTANCY')} title={entry.title} lead={entry.lead} image={heroImage} />
    {section === 'teams-offices' && <section className="container teams-visual-intro"><div className="teams-visual-photo" role="img" aria-label={tr('Concept image of professionals in a meeting', 'पेशेवर बैठक की अवधारणा छवि', 'صورة مفاهيمية لاجتماع مهني')} /><div className="teams-visual-copy"><h2>{tr('People and expertise, connected across disciplines.', 'विभिन्न क्षेत्रों में जुड़े विशेषज्ञ और उनकी क्षमताएँ।', 'خبرات وكفاءات مترابطة عبر التخصصات.')}</h2><p>{tr('Meet our developing professional network and explore the regional offices and client-service locations we are planning. We distinguish planned presence from operational offices.', 'हमारे विकसित होते expert network और proposed regional offices को जानें। planned और operational offices को अलग दिखाया जाता है।', 'اكتشف شبكتنا المهنية ومكاتبنا الإقليمية المخطط لها. نميز بين المكاتب القائمة والمواقع المخطط لها.')}</p></div></section>}
    <section className="container section generic-content"><div className="generic-main"><p>{t(entry.body, locale)}</p>
      {section === 'contact' && <div className="notice-box"><strong>{tr('Enquiry system status', 'संपर्क प्रणाली की स्थिति', 'حالة نظام التواصل')}</strong><p>{t(ui.noContactBackend, locale)}</p></div>}
      {section === 'work' && <div className="transaction-grid">{[
        { title: copy('Education growth advisory', 'शिक्षा विकास advisory', 'استشارات نمو التعليم'), desc: copy('Illustrative engagement: admissions strategy, outreach funnel design and institutional expansion support.', 'उदाहरणात्मक engagement: admissions strategy, outreach funnel design और institutional expansion support.', 'مهمة توضيحية: استراتيجية القبول وتصميم قنوات التوعية ودعم التوسع المؤسسي.') },
        { title: copy('ERP & transformation blueprint', 'ERP और transformation blueprint', 'مخطط ERP والتحول'), desc: copy('Illustrative mandate: requirement mapping, implementation planning and operating-model alignment for a large internal platform.', 'उदाहरणात्मक mandate: requirement mapping, implementation planning और operating-model alignment.', 'تفويض توضيحي: تحديد المتطلبات وخطة التنفيذ ومواءمة نموذج التشغيل.') },
        { title: copy('Infrastructure project readiness', 'infrastructure project readiness', 'جاهزية مشاريع البنية التحتية'), desc: copy('Illustrative brief: project structuring, PPP readiness and execution coordination for capital-intensive development.', 'उदाहरणात्मक brief: project structuring, PPP readiness और execution coordination.', 'موجز توضيحي: هيكلة المشروع وجاهزية PPP والتنسيق التنفيذي.') }
      ].map((card, idx) => <article className="transaction-card" key={idx}><h3>{t(card.title, locale)}</h3><p>{t(card.desc, locale)}</p></article>)}</div>}
      {section === 'insights' && <div className="transaction-grid">{[
        copy('Capital strategy and growth readiness', 'capital strategy और growth readiness', 'استراتيجية رأس المال وجاهزية النمو'),
        copy('Operational systems for modern institutions', 'modern institutions के लिए operational systems', 'الأنظمة التشغيلية للمؤسسات الحديثة'),
        copy('Technology governance beyond implementation', 'implementation से आगे की technology governance', 'حوكمة التقنية بعد التنفيذ')
      ].map((topic, idx) => <article className="transaction-card" key={idx}><h3>{t(topic, locale)}</h3><p>{tr('Insight preview content will be expanded with articles, interviews and sector commentary.', 'insight preview content को articles, interviews और sector commentary से expand किया जाएगा।', 'سيتم توسيع محتوى الرؤى بمقالات ومقابلات وتعليقات قطاعية.')}</p></article>)}</div>}
      {section === 'teams-offices' && <div className="office-grid office-grid--spaced">{officeCards.map((card) => <article className="office-entry office-entry--media" key={card.city}><div className="office-entry-image" style={{ backgroundImage: `url('${card.image}')` }} /><div className="office-entry-copy"><h3>{card.city}</h3><p>{t(card.status, locale)}</p></div></article>)}</div>}
      {section === 'partners' && <div className="office-grid office-grid--spaced">{partnerCards.map((card, i) => <article className="office-entry office-entry--media" key={i}><div className="office-entry-image" style={{ backgroundImage: `url('${card.image}')` }} /><div className="office-entry-copy"><h3>{t(card.title, locale)}</h3></div></article>)}</div>}
    </div><aside className="generic-aside"><h3>{t(ui.approachTitle, locale)}</h3><p>{t(ui.approachText, locale)}</p><Link className="inline-arrow" href={`/${locale}/services`}>{t(ui.allServices, locale)} <Arrow /></Link></aside>
    </section>
  </>;
}
