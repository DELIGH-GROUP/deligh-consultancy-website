import Link from 'next/link';
import {type Locale,type Copy,t,ui} from '@/lib/i18n';
import {services,industries} from '@/lib/data';
import {sectionContent} from '@/lib/sections';
import {Arrow} from './arrow';
import AboutPage from './about-page';

const copy=(en:string,hi:string,ar:string):Copy=>({en,hi,ar});
const officeCities = ['Prayagraj','Delhi','Lucknow','Hyderabad','Pune'];
const servicePhotos = [
 '/images/dc-generated-service-1.webp',
 '/images/dc-generated-service-2.webp',
 '/images/dc-generated-service-3.webp',
 '/images/dc-generated-service-4.webp',
 '/images/dc-generated-hero.webp',
 '/images/dc-generated-meeting.webp'
];
const industryPhotos = [
 '/images/dc-generated-hero.webp',
 '/images/dc-generated-service-2.webp',
 '/images/dc-generated-service-3.webp',
 '/images/dc-generated-service-4.webp',
 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88',
 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=88'
];
const picture=(id:string)=>`linear-gradient(0deg,rgba(3,20,37,.80),rgba(3,20,37,.06) 78%),url('${id.startsWith('/')?id:id}')`;

const serviceExplanations = [
 copy('Business structuring, strategic growth, transaction support and corporate decision-making.','व्यवसाय संरचना, strategic growth, transaction support और corporate decisions.','هيكلة الأعمال والنمو الاستراتيجي ودعم الصفقات.'),
 copy('Financial models, FP&A, funding readiness, forecasts and capital planning.','financial models, FP&A, funding readiness और capital planning.','النماذج المالية والتخطيط والجاهزية التمويلية.'),
 copy('Feasibility, project structuring, PPP support and EPCM coordination.','feasibility, project structuring, PPP support और EPCM coordination.','دراسات الجدوى وهيكلة المشاريع ودعم PPP.'),
 copy('IT strategy, ERP selection, cybersecurity governance and digital transformation.','IT strategy, ERP selection, cybersecurity governance और digital transformation.','استراتيجية التقنية واختيار ERP والحوكمة الرقمية.')
];
const industrySummaries = [
 copy('Capital projects, concession structures and long-horizon planning.','capital projects, concession structures और long-horizon planning.','مشاريع رأسمالية وهياكل امتياز وتخطيط طويل الأجل.'),
 copy('Institutional partnerships, student operations and education growth platforms.','institutional partnerships, student operations और education growth.','شراكات مؤسسية وعمليات تعليمية ومنصات نمو.'),
 copy('Banking, NBFC, treasury and capital allocation priorities.','banking, NBFC, treasury और capital allocation priorities.','الأولويات المصرفية والتمويلية وتخصيص رأس المال.'),
 copy('Platforms, SaaS, data systems and operating-model redesign.','platforms, SaaS, data systems और operating-model redesign.','المنصات وSaaS وأنظمة البيانات وإعادة تصميم التشغيل.'),
 copy('Expansion, capex planning and operating efficiency.','expansion, capex planning और operating efficiency.','التوسع وتخطيط النفقات الرأسمالية وكفاءة التشغيل.'),
 copy('Consumer channels, growth planning and multi-region distribution.','consumer channels, growth planning और distribution.','قنوات المستهلك والتوسع والتوزيع متعدد المناطق.'),
 copy('Warehousing, movement, procurement and network design.','warehousing, movement, procurement और network design.','التخزين والحركة والمشتريات وتصميم الشبكات.'),
 copy('Agri-linked systems, market access and food value chains.','agri-linked systems, market access और food value chains.','الأنظمة الزراعية والوصول إلى السوق وسلاسل الغذاء.'),
 copy('Asset strategy, development structuring and occupancy planning.','asset strategy, development structuring और occupancy planning.','استراتيجية الأصول وهيكلة التطوير وتخطيط الإشغال.'),
 copy('Public-service delivery, governance and programme execution.','public-service delivery, governance और programme execution.','تقديم الخدمات العامة والحوكمة وتنفيذ البرامج.')
];

function VisualHero({locale,kicker,title,lead,image}:{locale:Locale;kicker:Copy;title:Copy;lead:Copy;image:string}) {
  return <section className="section-page-hero"><div className="section-page-hero-media" style={{backgroundImage:`linear-gradient(90deg,rgba(7,26,45,.10),rgba(7,26,45,.10)),url('${image}')`}}/><div className="container section-page-hero-inner"><div className="section-page-copy"><p className="eyebrow hero-kicker">{t(kicker,locale)}</p><h1>{t(title,locale)}</h1><p>{t(lead,locale)}</p></div></div></section>;
}

export function PageHeading({locale,eyebrow,title,lead}:{locale:Locale;eyebrow?:string;title:Copy;lead:Copy}){
 return <section className="page-heading"><div className="container">
  {eyebrow && <p className="eyebrow">{eyebrow}</p>}
  <h1>{t(title,locale)}</h1><p>{t(lead,locale)}</p>
 </div></section>;
}

export default function SectionPage({locale,section}:{locale:Locale;section:string}){
 const tr=(en:string,hi:string,ar:string)=>t(copy(en,hi,ar),locale);
 if(section==='about') return <AboutPage locale={locale}/>;
 if(section==='services') return <>
  <VisualHero locale={locale} kicker={copy('Services','सेवाएँ','الخدمات')} title={copy('Consulting across the decisions that matter.','महत्वपूर्ण निर्णयों के लिए प्रभावी परामर्श।','استشارات للقرارات التي تصنع الفرق.')} lead={copy('Explore the advisory practices within our evolving multidisciplinary platform. Each section is presented visually so the offer is easier to understand at a glance.','हमारे evolving multidisciplinary platform की advisory practices देखें। हर section को visually present किया गया है ताकि offer तुरंत समझ आए।','استكشف الممارسات الاستشارية ضمن منصتنا المتطورة، وقد قُدمت هذه الخدمات بصرياً لتكون مفهومة بسرعة.')} image={'/images/dc-generated-service-2.webp'}/>
  <section className="section container"><div className="directory-visual-grid">{services.slice(0,6).map((s,i)=><Link className="directory-photo-card" key={s.slug} href={`/${locale}/services/${s.slug}`}><span className="directory-photo" style={{backgroundImage:picture(servicePhotos[i])}}/><span className="directory-photo-content"><strong>{t(s.title,locale)}</strong><small>{t(s.summary,locale)}</small></span><span className="directory-arrow"><Arrow diagonal/></span></Link>)}</div><div className="full-services-grid">{services.slice(6).map((s,i)=><Link className="full-service" key={s.slug} href={`/${locale}/services/${s.slug}`}><span className="item-no">{String(i+7).padStart(2,'0')}</span><h2>{t(s.title,locale)}</h2><p>{t(s.summary,locale)}</p><span className="inline-arrow">{t(ui.explore,locale)} <Arrow/></span></Link>)}</div></section>
  <section className="section container service-editorial-row">{serviceExplanations.map((text,index)=><article key={index} className="editorial-mini-card"><div className="editorial-mini-image" style={{backgroundImage:picture(servicePhotos[index])}}/><div><span className="item-no">{String(index+1).padStart(2,'0')}</span><p>{t(text,locale)}</p></div></article>)}</section>
 </>;
 if(section==='industries') return <>
  <VisualHero locale={locale} kicker={copy('Industries','उद्योग','القطاعات')} title={copy('Sector context is essential to better advice.','बेहतर सलाह के लिए sector context जरूरी है।','فهم القطاع أساس الاستشارة الأفضل.')} lead={copy('Industry coverage should not look empty. These sector cards now combine clear imagery, concise explanation and hover-led motion for a more premium presentation.','industry coverage को खाली नहीं दिखना चाहिए। इसलिए इन sector cards में clear imagery, concise explanation और hover-led motion जोड़ा गया है।','يجب ألا تبدو تغطية القطاعات فارغة؛ لذلك تجمع هذه البطاقات بين الصور الواضحة والشرح المختصر والحركة التفاعلية.')} image={'/images/dc-generated-service-3.webp'}/>
  <section className="section container"><div className="directory-visual-grid">{industries.slice(0,6).map((s,i)=><div className="directory-photo-card" key={i}><span className="directory-photo" style={{backgroundImage:picture(industryPhotos[i])}}/><span className="directory-photo-content"><strong>{t(s.title,locale)}</strong><small>{t(industrySummaries[i],locale)}</small></span></div>)}</div><div className="industry-grid all-industries">{industries.slice(6,16).map((s,i)=><div className="industry-tile industry-story-card-lite" key={i}><span>{String(i+7).padStart(2,'0')}</span><h3>{t(s.title,locale)}</h3><p>{t(industrySummaries[i+6] ?? industrySummaries[0],locale)}</p><div className="industry-tile-action">{tr('Sector view','सेक्टर दृष्टि','نظرة قطاعية')} <Arrow diagonal/></div></div>)}</div></section>
 </>;
 if(section==='privacy') return <>
  <VisualHero locale={locale} kicker={copy('Policies','नीतियाँ','السياسات')} title={copy('Privacy & website preferences','गोपनीयता और वेबसाइट विकल्प','الخصوصية وتفضيلات الموقع')} lead={copy('Foundation preview: this page is not a final corporate privacy notice.','प्रारंभिक preview: यह अंतिम corporate privacy notice नहीं है।','نسخة أولية: هذه ليست إشعار الخصوصية المؤسسي النهائي.')} image={'/images/dc-generated-meeting.webp'}/>
  <section className="container prose-page"><p>{t(ui.cookieText,locale)}</p><p>{tr('The live privacy notice will identify the legal operator, data categories, purposes, rights, retention, transfers and contact point after these details are confirmed. Do not publish this preview as an operational legal notice.','अंतिम policy में verification के बाद legal operator, data categories, purposes, rights, retention और contact details जोड़ी जाएंगी। इस preview को final legal notice मानकर publish न करें।','ستحدد السياسة النهائية الجهة القانونية وأنواع البيانات والأغراض والحقوق ومدد الاحتفاظ وبيانات التواصل بعد التحقق. لا تنشر هذه النسخة كإشعار قانوني نهائي.')}</p></section>
 </>;
 const entry=sectionContent[section];if(!entry)return null;
 return <>
  <VisualHero locale={locale} kicker={copy('DELIGH CONSULTANCY','DELIGH CONSULTANCY','DELIGH CONSULTANCY')} title={entry.title} lead={entry.lead} image={section==='teams-offices'?'/images/dc-generated-meeting.webp':section==='work'?'/images/dc-generated-service-1.webp':section==='insights'?'/images/dc-generated-service-2.webp':section==='partners'?'/images/dc-generated-group.webp':'/images/dc-generated-hero.webp'}/>
  {section==='teams-offices' && <section className="container teams-visual-intro"><div className="teams-visual-photo" role="img" aria-label={tr('Concept image of professionals in a meeting','पेशेवर बैठक की अवधारणा छवि','صورة مفاهيمية لاجتماع مهني')}/><div className="teams-visual-copy"><h2>{tr('People and expertise, connected across disciplines.','विभिन्न क्षेत्रों में जुड़े विशेषज्ञ और उनकी क्षमताएँ।','خبرات وكفاءات مترابطة عبر التخصصات.')}</h2><p>{tr('Meet our developing professional network and explore the regional offices and client-service locations we are planning. We distinguish planned presence from operational offices.','हमारे विकसित होते expert network और proposed regional offices को जानें। planned और operational offices को अलग दिखाया जाता है।','اكتشف شبكتنا المهنية ومكاتبنا الإقليمية المخطط لها. نميز بين المكاتب القائمة والمواقع المخطط لها.')}</p></div></section>}
  <section className="container section generic-content"><div className="generic-main"><p>{t(entry.body,locale)}</p>
   {section==='contact' && <div className="notice-box"><strong>{tr('Enquiry system status','संपर्क प्रणाली की स्थिति','حالة نظام التواصل')}</strong><p>{t(ui.noContactBackend,locale)}</p></div>}
   {section==='work' && <div className="transaction-grid">{[
    {title:copy('Education growth advisory','शिक्षा विकास advisory','استشارات نمو التعليم'),desc:copy('Illustrative engagement: admissions strategy, outreach funnel design and institutional expansion support.','उदाहरणात्मक engagement: admissions strategy, outreach funnel design और institutional expansion support.','مهمة توضيحية: استراتيجية القبول وتصميم قنوات التوعية ودعم التوسع المؤسسي.')},
    {title:copy('ERP & transformation blueprint','ERP और transformation blueprint','مخطط ERP والتحول'),desc:copy('Illustrative mandate: requirement mapping, implementation planning and operating-model alignment for a large internal platform.','उदाहरणात्मक mandate: requirement mapping, implementation planning और operating-model alignment.','تفويض توضيحي: تحديد المتطلبات وخطة التنفيذ ومواءمة نموذج التشغيل.')},
    {title:copy('Infrastructure project readiness','infrastructure project readiness','جاهزية مشاريع البنية التحتية'),desc:copy('Illustrative brief: project structuring, PPP readiness and execution coordination for capital-intensive development.','उदाहरणात्मक brief: project structuring, PPP readiness और execution coordination.','موجز توضيحي: هيكلة المشروع وجاهزية PPP والتنسيق التنفيذي.')}
   ].map((card,idx)=><article className="transaction-card" key={idx}><span className="item-no">{String(idx+1).padStart(2,'0')}</span><h3>{t(card.title,locale)}</h3><p>{t(card.desc,locale)}</p></article>)}</div>}
   {section==='insights' && <div className="transaction-grid">{[
    copy('Capital strategy and growth readiness','capital strategy और growth readiness','استراتيجية رأس المال وجاهزية النمو'),
    copy('Operational systems for modern institutions','modern institutions के लिए operational systems','الأنظمة التشغيلية للمؤسسات الحديثة'),
    copy('Technology governance beyond implementation','implementation से आगे की technology governance','حوكمة التقنية بعد التنفيذ')
   ].map((topic,idx)=><article className="transaction-card" key={idx}><span className="item-no">{String(idx+1).padStart(2,'0')}</span><h3>{t(topic,locale)}</h3><p>{tr('Insight preview content will be expanded with articles, interviews and sector commentary.','insight preview content को articles, interviews और sector commentary से expand किया जाएगा।','سيتم توسيع محتوى الرؤى بمقالات ومقابلات وتعليقات قطاعية.')}</p></article>)}</div>}
   {section==='teams-offices' && <div className="office-grid">{officeCities.map((city,i)=><div className="office-entry" key={city}><span className="item-no">{String(i+1).padStart(2,'0')}</span><h3>{city}</h3><p>{i===0?tr('Proposed headquarters','प्रस्तावित मुख्यालय','المقر الرئيسي المقترح'):t(ui.officePlanned,locale)}</p></div>)}</div>}
   {section==='partners' && <div className="office-grid">{[
    copy('Technology & engineering','तकनीक और इंजीनियरिंग','التقنية والهندسة'),
    copy('Finance & corporate services','वित्त और कॉर्पोरेट सेवाएँ','الخدمات المالية والمؤسسية'),
    copy('Infrastructure & EPCM','अवसंरचना और EPCM','البنية التحتية وإدارة المشاريع'),
    copy('Certification & regulatory coordination','प्रमाणन और नियामकीय समन्वय','تنسيق الشهادات والامتثال'),
    copy('Education & international services','शिक्षा और अंतरराष्ट्रीय सेवाएँ','التعليم والخدمات الدولية'),
    copy('Independent domain specialists','स्वतंत्र क्षेत्र विशेषज्ञ','خبراء مستقلون'),
   ].map((p,i)=><div className="office-entry" key={i}><span className="item-no">{String(i+1).padStart(2,'0')}</span><h3>{t(p,locale)}</h3></div>)}</div>}
  </div><aside className="generic-aside"><h3>{t(ui.approachTitle,locale)}</h3><p>{t(ui.approachText,locale)}</p><Link className="inline-arrow" href={`/${locale}/services`}>{t(ui.allServices,locale)} <Arrow/></Link></aside>
  </section>
 </>;
}
