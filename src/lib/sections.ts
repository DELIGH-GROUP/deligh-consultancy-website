import type { Copy } from "./i18n";
export type Section = { slug: string; title: Copy; lead: Copy; body: Copy };
export const sectionContent: Record<string, Section> = {
  "about": {
    "slug": "about",
    "title": {
      "en": "Independent advice. Connected perspective.",
      "hi": "स्वतंत्र परामर्श। समन्वित दृष्टिकोण।",
      "ar": "استشارات مستقلة ورؤية مترابطة."
    },
    "lead": {
      "en": "DELIGH CONSULTANCY is being developed as the multidisciplinary advisory parent within DELIGH GROUP. We intend to combine deep specialist judgement, disciplined processes and delivery partnerships.",
      "hi": "DELIGH CONSULTANCY को DELIGH GROUP के भीतर बहु-विषयक परामर्श की मूल कंपनी के रूप में विकसित किया जा रहा है। हमारा उद्देश्य विशेषज्ञ निर्णय, व्यवस्थित प्रक्रियाएँ और डिलीवरी साझेदारियाँ जोड़ना है।",
      "ar": "يجري تطوير DELIGH CONSULTANCY لتكون الشركة الأم للاستشارات متعددة التخصصات ضمن مجموعة DELIGH، تجمع بين الخبرة المتخصصة والعمليات المنضبطة وشراكات التنفيذ."
    },
    "body": {
      "en": "Our structure is designed to let different practices operate with accountability while sharing knowledge and selectively collaborating with group and outside companies.",
      "hi": "हमारी संरचना विभिन्न प्रैक्टिस को जवाबदेही के साथ स्वतंत्र रूप से काम करने और समूह व बाहरी कंपनियों के साथ उचित सहयोग की अनुमति देने के लिए बनाई गई है।",
      "ar": "صُمم هيكلنا لتمكين التخصصات من العمل بمساءلة مع تبادل المعرفة والتعاون الانتقائي مع شركات المجموعة والشركات الخارجية."
    }
  },
  "work": {
    "slug": "work",
    "title": {
      "en": "Defined scope. Disciplined delivery.",
      "hi": "स्पष्ट कार्यक्षेत्र। अनुशासित कार्यान्वयन।",
      "ar": "نطاق واضح وتنفيذ منضبط."
    },
    "lead": {
      "en": "Our engagement process begins with understanding the client’s business challenge, defining success and assembling the appropriate expertise.",
      "hi": "हमारी परियोजना प्रक्रिया ग्राहक की व्यावसायिक चुनौती समझने, सफलता के मानक तय करने और उपयुक्त विशेषज्ञों को जोड़ने से शुरू होती है।",
      "ar": "تبدأ عملية العمل بفهم تحدي العميل وتحديد معايير النجاح وتجميع الخبرات المناسبة."
    },
    "body": {
      "en": "Verified case studies and project outcomes will be added after delivery and client-approved disclosure. We do not present sample scenarios as completed client work.",
      "hi": "वास्तविक केस स्टडी और परिणाम परियोजना पूरी होने तथा ग्राहक की अनुमति के बाद जोड़े जाएँगे। उदाहरणों को पूर्ण ग्राहक परियोजना की तरह प्रस्तुत नहीं किया जाएगा।",
      "ar": "ستضاف دراسات الحالة والنتائج الموثقة بعد الإنجاز وموافقة العميل على النشر، ولن نعرض الأمثلة الافتراضية كأعمال منفذة."
    }
  },
  "insights": {
    "slug": "insights",
    "title": {
      "en": "Perspectives for a changing economy.",
      "hi": "बदलती अर्थव्यवस्था के लिए दृष्टिकोण।",
      "ar": "رؤى لاقتصاد متغير."
    },
    "lead": {
      "en": "Our editorial programme will focus on the questions faced by business leaders: capital allocation, infrastructure, operations, emerging technology and long-term growth.",
      "hi": "हमारे प्रस्तावित लेख और शोध पूँजी आवंटन, अवसंरचना, संचालन, उभरती तकनीक और दीर्घकालीन विकास जैसे व्यावसायिक सवालों पर केंद्रित होंगे।",
      "ar": "سيركز برنامجنا التحريري على أسئلة قادة الأعمال حول تخصيص رأس المال والبنية التحتية والتشغيل والتكنولوجيا والنمو طويل الأجل."
    },
    "body": {
      "en": "Research and articles will appear here when reviewed and published. No fictional reports or publication dates are displayed.",
      "hi": "समीक्षा और प्रकाशन के बाद शोध और लेख यहाँ उपलब्ध होंगे। काल्पनिक रिपोर्ट या प्रकाशन तिथियाँ नहीं दिखाई जाती हैं।",
      "ar": "ستنشر الأبحاث والمقالات هنا بعد مراجعتها واعتمادها، دون تقارير أو تواريخ نشر غير حقيقية."
    }
  },
  "teams-offices": {
    "slug": "teams-offices",
    "title": {
      "en": "People and presence.",
      "hi": "हमारी टीम और उपस्थिति।",
      "ar": "فرقنا وحضورنا."
    },
    "lead": {
      "en": "Our proposed corporate headquarters is Prayagraj, with a planned network spanning Delhi, Lucknow, Hyderabad and Pune. International clients may be served through approved remote or partner arrangements.",
      "hi": "प्रस्तावित मुख्यालय प्रयागराज है। दिल्ली, लखनऊ, हैदराबाद और पुणे तक नेटवर्क विकसित करने की योजना है। अंतरराष्ट्रीय ग्राहकों को उपयुक्त रिमोट या साझेदार व्यवस्था के माध्यम से सेवाएँ दी जा सकती हैं।",
      "ar": "يقع المقر الرئيسي المقترح في براياجراج، مع شبكة مخطط لها في دلهي ولكناو وحيدر آباد وبونه. ويمكن خدمة العملاء الدوليين عبر ترتيبات معتمدة عن بعد أو مع الشركاء."
    },
    "body": {
      "en": "Only verified office addresses and approved professional biographies will be made public. A proposed city is not represented as a staffed operational office.",
      "hi": "केवल सत्यापित कार्यालय पते और स्वीकृत प्रोफेशनल परिचय ही प्रकाशित किए जाएँगे। प्रस्तावित शहर को चालू कार्यालय नहीं बताया जाएगा।",
      "ar": "لن تنشر سوى عناوين المكاتب الموثقة والسير المهنية المعتمدة، ولن توصف المدن المخطط لها بأنها مكاتب عاملة."
    }
  },
  "partners": {
    "slug": "partners",
    "title": {
      "en": "Independent specialists. Shared purpose.",
      "hi": "स्वतंत्र विशेषज्ञ। साझा उद्देश्य।",
      "ar": "خبرات مستقلة وهدف مشترك."
    },
    "lead": {
      "en": "Our model connects qualified domain specialists, external service firms and technology partners around clearly scoped client needs.",
      "hi": "हमारा मॉडल ग्राहक की स्पष्ट जरूरतों के अनुसार योग्य विशेषज्ञों, बाहरी सेवा कंपनियों और तकनीकी साझेदारों को जोड़ता है।",
      "ar": "يربط نموذجنا بين الخبراء المؤهلين والشركات الخدمية الخارجية والشركاء التقنيين وفق احتياجات واضحة للعملاء."
    },
    "body": {
      "en": "ITSDELIGH PRIVATE LIMITED is the distinct technology parent within DELIGH GROUP. Other partner names and logos will be displayed only after relationship and brand-use verification.",
      "hi": "ITSDELIGH PRIVATE LIMITED, DELIGH GROUP की स्वतंत्र तकनीकी मूल कंपनी है। अन्य साझेदारों के नाम और लोगो संबंध तथा अनुमति सत्यापित होने पर ही प्रकाशित होंगे।",
      "ar": "تعد ITSDELIGH PRIVATE LIMITED الشركة التقنية الأم المستقلة داخل DELIGH GROUP. ولن تُعرض أسماء وشعارات الشركاء الآخرين إلا بعد التحقق من العلاقة وحقوق الاستخدام."
    }
  },
  "careers": {
    "slug": "careers",
    "title": {
      "en": "Build expertise. Create impact.",
      "hi": "विशेषज्ञता बढ़ाएँ। प्रभाव पैदा करें।",
      "ar": "نمِ الخبرة واصنع الأثر."
    },
    "lead": {
      "en": "Our talent model will include consulting professionals, analysts, delivery specialists and independent expert associates across disciplines.",
      "hi": "हमारे प्रतिभा मॉडल में विभिन्न विषयों के परामर्श पेशेवर, विश्लेषक, डिलीवरी विशेषज्ञ और स्वतंत्र विशेषज्ञ सहयोगी शामिल हो सकते हैं।",
      "ar": "سيشمل نموذج المواهب الاستشاريين والمحللين والمتخصصين في التنفيذ والخبراء المستقلين عبر التخصصات."
    },
    "body": {
      "en": "Open positions will be published with verified employment terms, location expectations and an official application route.",
      "hi": "सत्यापित रोजगार शर्तों, स्थान और आधिकारिक आवेदन माध्यम के साथ रिक्तियाँ प्रकाशित की जाएँगी।",
      "ar": "ستنشر الوظائف المتاحة بشروط عمل موثقة وتوقعات واضحة للموقع وقناة تقديم رسمية."
    }
  },
  "contact": {
    "slug": "contact",
    "title": {
      "en": "Start a conversation.",
      "hi": "बातचीत की शुरुआत करें।",
      "ar": "ابدأ الحوار."
    },
    "lead": {
      "en": "Whether your challenge relates to finance, enterprise systems, infrastructure or institutional growth, a defined brief helps identify the right advisory route.",
      "hi": "वित्त, उद्यम प्रणाली, अवसंरचना या संस्थागत विकास से जुड़ी समस्या हो—स्पष्ट विवरण सही परामर्श प्रक्रिया तय करने में मदद करता है।",
      "ar": "سواء تعلق التحدي بالتمويل أو الأنظمة المؤسسية أو البنية التحتية أو النمو المؤسسي، يساعد وصف واضح للمشروع على تحديد مسار الاستشارة المناسب."
    },
    "body": {
      "en": "The secure enquiry system and verified corporate contact channels will be activated before public launch. This preview does not send or collect enquiries.",
      "hi": "सार्वजनिक लॉन्च से पहले सुरक्षित enquiry प्रणाली और सत्यापित कंपनी संपर्क सक्रिय किए जाएँगे। यह प्रीव्यू enquiries भेजता या एकत्र नहीं करता।",
      "ar": "سيتم تفعيل نظام الاستفسارات الآمن وقنوات الاتصال المؤسسية الموثقة قبل الإطلاق العام. لا يرسل هذا العرض الاستفسارات ولا يجمعها."
    }
  }
};
