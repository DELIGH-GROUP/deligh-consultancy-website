import { globalTranslations } from "./global-translations";
export const locales = ["en", "hi", "ar", "fr", "de", "es", "pt"] as const;
export type Locale = (typeof locales)[number];
export type Copy = { en: string; hi: string; ar: string };
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const localeLabel: Record<Locale, string> = { en: "English", hi: "हिन्दी", ar: "العربية", fr:"Français", de:"Deutsch", es:"Español", pt:"Português" };
export const t = (copy: Copy, locale: Locale): string => {
  if (locale === "en" || locale === "hi" || locale === "ar") return copy[locale];
  return globalTranslations[locale]?.[copy.en] ?? copy.en;
};

export const navItems = [
  { slug: "about", label: { en: "Who We Are", hi: "हमारे बारे में", ar: "من نحن" } },
  { slug: "services", label: { en: "Services", hi: "सेवाएँ", ar: "الخدمات" } },
  { slug: "industries", label: { en: "Industries", hi: "उद्योग", ar: "القطاعات" } },
  { slug: "work", label: { en: "Our Work", hi: "हमारा कार्य", ar: "أعمالنا" } },
  { slug: "insights", label: { en: "Insights", hi: "विश्लेषण", ar: "الرؤى" } },
  { slug: "teams-offices", label: { en: "Teams & Offices", hi: "टीम और कार्यालय", ar: "الفرق والمكاتب" } },
  { slug: "partners", label: { en: "Partners", hi: "साझेदार", ar: "الشركاء" } },
  { slug: "careers", label: { en: "Careers", hi: "करियर", ar: "الوظائف" } },
  { slug: "contact", label: { en: "Contact", hi: "संपर्क", ar: "اتصل بنا" } },
] as const;

export const ui = {
  group: { en: "Part of DELIGH GROUP", hi: "DELIGH GROUP का हिस्सा", ar: "جزء من مجموعة DELIGH" },
  heroEyebrow: { en: "Corporate • Financial • Enterprise Advisory", hi: "कॉर्पोरेट • वित्तीय • उद्यम परामर्श", ar: "الاستشارات المؤسسية والمالية واستشارات الأعمال" },
  heroTitle: { en: "Clarity for complex decisions.", hi: "जटिल निर्णयों के लिए स्पष्ट दिशा।", ar: "وضوح في القرارات المعقدة." },
  heroLead: { en: "Independent thinking, specialist expertise and technology-connected execution for organisations navigating change.", hi: "बदलाव के दौर में संस्थाओं के लिए स्वतंत्र सोच, विशेषज्ञता और तकनीक-सक्षम कार्यान्वयन।", ar: "تفكير مستقل وخبرات متخصصة وتنفيذ مدعوم بالتقنية للمؤسسات التي تواجه التغيير." },
  explore: { en: "Explore our services", hi: "हमारी सेवाएँ देखें", ar: "استكشف خدماتنا" },
  discuss: { en: "Discuss your requirements", hi: "अपनी आवश्यकता बताइए", ar: "ناقش متطلباتك" },
  practiceEyebrow: { en: "WHAT WE DO", hi: "हम क्या करते हैं", ar: "ماذا نقدم" },
  practiceTitle: { en: "Expertise across business-critical decisions.", hi: "व्यवसाय के महत्वपूर्ण निर्णयों में विशेषज्ञता।", ar: "خبرات تغطي القرارات الأساسية للأعمال." },
  practiceLead: { en: "Our evolving consulting platform brings together business, financial, infrastructure and digital perspectives.", hi: "हमारा विकसित होता परामर्श मंच व्यवसाय, वित्त, आधारभूत संरचना और डिजिटल दृष्टिकोण को साथ लाता है।", ar: "تجمع منصتنا الاستشارية المتطورة بين الرؤى التجارية والمالية والبنية التحتية والرقمية." },
  allServices: { en: "View all services", hi: "सभी सेवाएँ देखें", ar: "عرض جميع الخدمات" },
  approachEyebrow: { en: "OUR APPROACH", hi: "हमारा दृष्टिकोण", ar: "منهجنا" },
  approachTitle: { en: "Independent advice. Connected execution.", hi: "स्वतंत्र परामर्श। समन्वित कार्यान्वयन।", ar: "مشورة مستقلة وتنفيذ مترابط." },
  approachText: { en: "DELIGH CONSULTANCY is designed to coordinate qualified domain experts and delivery partners while keeping client objectives at the centre. ITSDELIGH PRIVATE LIMITED remains a distinct technology company within DELIGH GROUP.", hi: "DELIGH CONSULTANCY का उद्देश्य योग्य क्षेत्र विशेषज्ञों और डिलीवरी पार्टनर्स को जोड़ना है, जबकि ग्राहक के लक्ष्य सबसे महत्वपूर्ण रहें। ITSDELIGH PRIVATE LIMITED, DELIGH GROUP की अलग तकनीकी कंपनी है।", ar: "صُممت DELIGH CONSULTANCY للتنسيق بين خبراء القطاعات وشركاء التنفيذ المؤهلين مع إبقاء أهداف العملاء في المقدمة. وتظل ITSDELIGH PRIVATE LIMITED شركة تقنية مستقلة ضمن DELIGH GROUP." },
  exploreApproach: { en: "Discover who we are", hi: "हमारे बारे में जानें", ar: "تعرف علينا" },
  sectorsEyebrow: { en: "SECTORS", hi: "क्षेत्र", ar: "القطاعات" },
  sectorsTitle: { en: "Grounded in industry context.", hi: "हर उद्योग के संदर्भ को समझते हुए।", ar: "فهم عميق لسياق القطاعات." },
  sectorsLead: { en: "Advisory requirements differ by sector. Our delivery model is built to bring relevant domain knowledge to each engagement.", hi: "हर उद्योग की परामर्श आवश्यकताएँ अलग होती हैं। हमारा मॉडल प्रत्येक प्रोजेक्ट में संबंधित विशेषज्ञता जोड़ने के लिए बनाया गया है।", ar: "تختلف الاحتياجات الاستشارية من قطاع إلى آخر. ويهدف نموذجنا إلى توفير الخبرات المناسبة لكل مهمة." },
  globalEyebrow: { en: "CONNECTED PERSPECTIVE", hi: "जुड़ा हुआ दृष्टिकोण", ar: "رؤية مترابطة" },
  globalTitle: { en: "One corporate identity. A wider network of expertise.", hi: "एक कॉर्पोरेट पहचान। विशेषज्ञता का व्यापक नेटवर्क।", ar: "هوية مؤسسية واحدة وشبكة أوسع من الخبرات." },
  globalText: { en: "From our proposed headquarters in Prayagraj to regional and cross-border client engagements, we are building an organisation with clear accountability, relevant partnerships and room to grow.", hi: "प्रस्तावित प्रयागराज मुख्यालय से क्षेत्रीय और अंतरराष्ट्रीय ग्राहकों तक, हम स्पष्ट जवाबदेही, उपयोगी साझेदारियों और विस्तार की क्षमता वाला संगठन बना रहे हैं।", ar: "من مقرنا الرئيسي المقترح في براياجراج إلى التعامل مع العملاء إقليمياً ودولياً، نبني مؤسسة تقوم على المساءلة والشراكات المناسبة وإمكانات النمو." },
  teamLink: { en: "Teams & Offices", hi: "टीम और कार्यालय", ar: "الفرق والمكاتب" },
  insightsEyebrow: { en: "PERSPECTIVES", hi: "दृष्टिकोण", ar: "وجهات نظر" },
  insightsTitle: { en: "Questions worth examining.", hi: "महत्वपूर्ण सवाल, गहन विचार।", ar: "أسئلة تستحق الدراسة." },
  insightsLead: { en: "Our research agenda spans financial planning, infrastructure delivery, digital operating models and enterprise transformation.", hi: "हमारे प्रस्तावित शोध विषय वित्तीय योजना, अवसंरचना, डिजिटल संचालन और उद्यम परिवर्तन से जुड़े हैं।", ar: "تشمل أجندتنا البحثية التخطيط المالي وتنفيذ مشاريع البنية التحتية ونماذج التشغيل الرقمية وتحول المؤسسات." },
  footerStatement: { en: "Advisory shaped by substance, independence and long-term thinking.", hi: "गंभीर विशेषज्ञता, स्वतंत्रता और दीर्घकालीन सोच पर आधारित परामर्श।", ar: "استشارات قائمة على الخبرة والاستقلالية والتفكير طويل الأمد." },
  footerGroup: { en: "A DELIGH GROUP business", hi: "DELIGH GROUP का व्यवसाय", ar: "إحدى شركات DELIGH GROUP" },
  planned: { en: "Planned capability", hi: "प्रस्तावित क्षमता", ar: "قدرة مخطط لها" },
  back: { en: "Back to services", hi: "सेवाओं पर वापस जाएँ", ar: "العودة إلى الخدمات" },
  methodology: { en: "Our engagement approach", hi: "हमारा परामर्श तरीका", ar: "منهج العمل" },
  methodologyLead: { en: "We define the problem, agree a transparent scope, bring suitable expertise and measure delivery against agreed milestones. Availability depends on project requirements and specialist capacity.", hi: "हम समस्या को समझते हैं, स्पष्ट कार्यक्षेत्र तय करते हैं, उपयुक्त विशेषज्ञता जोड़ते हैं और सहमत लक्ष्यों के अनुसार कार्य की समीक्षा करते हैं। उपलब्धता परियोजना और विशेषज्ञ क्षमता पर निर्भर करती है।", ar: "نحدد المشكلة ونُقر نطاقاً واضحاً للعمل ونوفر الخبرات الملائمة ونقيس التنفيذ وفق مراحل متفق عليها. وتعتمد الإتاحة على متطلبات المشروع وتوافر المختصين." },
  cookieTitle: { en: "Your privacy choices", hi: "आपकी गोपनीयता के विकल्प", ar: "خيارات الخصوصية" },
  cookieText: { en: "Only essential storage is needed for this preview. Optional categories are off by default; no analytics or advertising scripts are installed.", hi: "इस प्रीव्यू में केवल आवश्यक स्टोरेज चाहिए। वैकल्पिक श्रेणियाँ शुरू में बंद हैं और कोई एनालिटिक्स या विज्ञापन स्क्रिप्ट नहीं लगाई गई है।", ar: "يحتاج هذا العرض إلى التخزين الضروري فقط. الفئات الاختيارية معطلة افتراضياً ولا توجد نصوص تحليلات أو إعلانات مثبتة." },
  necessary: { en: "Necessary (always on)", hi: "आवश्यक (हमेशा चालू)", ar: "ضروري (دائماً)" },
  analytics: { en: "Analytics (not yet installed)", hi: "विश्लेषण (अभी स्थापित नहीं)", ar: "التحليلات (غير مثبتة بعد)" },
  marketing: { en: "Marketing (not yet installed)", hi: "मार्केटिंग (अभी स्थापित नहीं)", ar: "التسويق (غير مثبت بعد)" },
  accept: { en: "Accept all", hi: "सभी स्वीकारें", ar: "قبول الكل" },
  reject: { en: "Reject optional", hi: "वैकल्पिक अस्वीकारें", ar: "رفض الاختياري" },
  manage: { en: "Manage choices", hi: "विकल्प चुनें", ar: "إدارة الخيارات" },
  save: { en: "Save preferences", hi: "विकल्प सहेजें", ar: "حفظ التفضيلات" },
  cookieSettings: { en: "Cookie settings", hi: "कुकी सेटिंग्स", ar: "إعدادات ملفات تعريف الارتباط" },
  region: { en: "Region", hi: "क्षेत्र", ar: "المنطقة" },
  language: { en: "Language", hi: "भाषा", ar: "اللغة" },
  menu: { en: "Menu", hi: "मेन्यू", ar: "القائمة" },
  close: { en: "Close", hi: "बंद करें", ar: "إغلاق" },
  officePlanned: { en: "Planned regional presence", hi: "प्रस्तावित क्षेत्रीय उपस्थिति", ar: "حضور إقليمي مخطط له" },
  comingLater: { en: "Verified case studies and announcements will be published as engagements are completed and approved for disclosure.", hi: "परियोजनाएँ पूरी होने और प्रकाशन की अनुमति मिलने के बाद सत्यापित केस स्टडी और घोषणाएँ प्रकाशित होंगी।", ar: "ستنشر دراسات الحالات والإعلانات الموثقة بعد اكتمال الأعمال والموافقة على الإفصاح عنها." },
  capabilitiesLabel: { en: "OUR CAPABILITIES", hi: "हमारी क्षमताएँ", ar: "قدراتنا" },
  industriesLabel: { en: "INDUSTRIES", hi: "उद्योग", ar: "القطاعات" },
  privacyLabel: { en: "PRIVACY", hi: "गोपनीयता", ar: "الخصوصية" },
  insightLink: { en: "Explore insights", hi: "विश्लेषण देखें", ar: "استكشف الرؤى" },
  strategic: { en: "Strategic advisory", hi: "रणनीतिक परामर्श", ar: "الاستشارات الاستراتيجية" },
  brandAlt: { en: "Modern corporate architectural facade", hi: "आधुनिक कॉर्पोरेट भवन का बाहरी दृश्य", ar: "واجهة مبنى مؤسسي حديث" },
  noContactBackend: { en: "Contact form submissions are not enabled in this foundation preview. A verified business inbox and secure submission service will be connected before public launch.", hi: "इस प्रारंभिक प्रीव्यू में संपर्क फ़ॉर्म जमा करने की सुविधा चालू नहीं है। सार्वजनिक लॉन्च से पहले सत्यापित व्यावसायिक ईमेल और सुरक्षित सेवा जोड़ी जाएगी।", ar: "إرسال نماذج التواصل غير مفعل في هذه النسخة التأسيسية. سيتم ربط بريد أعمال موثق وخدمة إرسال آمنة قبل الإطلاق العام." },
} satisfies Record<string, Copy>;
