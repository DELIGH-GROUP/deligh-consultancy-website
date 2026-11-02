"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { type Locale, localeLabel, navItems, t, ui } from "@/lib/i18n";
import { Arrow } from "./arrow";
import { languageCatalog } from "@/lib/language-catalog";
import RevealMotion from "./reveal-motion";

const regions = [
  { code: "IN", name: {en:"India",hi:"भारत",ar:"الهند"} }, { code: "GB", name: {en:"United Kingdom",hi:"यूनाइटेड किंगडम",ar:"المملكة المتحدة"} },
  { code: "AE", name: {en:"United Arab Emirates",hi:"संयुक्त अरब अमीरात",ar:"الإمارات العربية المتحدة"} }, { code: "US", name: {en:"United States",hi:"संयुक्त राज्य अमेरिका",ar:"الولايات المتحدة"} },
  { code: "IL", name: {en:"Israel",hi:"इज़राइल",ar:"إسرائيل"} },
  { code: "SA", name: {en:"Saudi Arabia",hi:"सऊदी अरब",ar:"المملكة العربية السعودية"} },
  { code: "CA", name: {en:"Canada",hi:"कनाडा",ar:"كندا"} },
  { code: "AU", name: {en:"Australia",hi:"ऑस्ट्रेलिया",ar:"أستراليا"} },
  { code: "SG", name: {en:"Singapore",hi:"सिंगापुर",ar:"سنغافورة"} },
  { code: "GL", name: {en:"Global",hi:"वैश्विक",ar:"عالمي"} }
];

type Consent = { essential: true; analytics: boolean; marketing: boolean; version: 1; savedAt: string };
const consentKey = "dc-consent-v1";

function ChevronDown() { return <svg aria-hidden="true" className="utility-chevron" viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
const regionLanguageCodes: Record<string,string[]> = {
  IN:['en','hi'], GB:['en'], AE:['ar','en'], US:['en','es'], IL:['he','en'], SA:['ar','en'],
  CA:['en','fr'], AU:['en'], SG:['en','zh','ms','ta'], GL:[]
};

export default function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const languageBoxRef = useRef<HTMLDivElement | null>(null);
  const drawerCloseRef = useRef<HTMLButtonElement | null>(null);
  const [menu, setMenu] = useState(false);
  const [region, setRegion] = useState("GL");
  const [cookieDialog, setCookieDialog] = useState(false);
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageQuery, setLanguageQuery] = useState("");
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    try {
      const savedRegion = localStorage.getItem("dc-region");
      if (savedRegion && regions.some(r => r.code === savedRegion)) setRegion(savedRegion);
      const savedConsent = localStorage.getItem(consentKey);
      if (savedConsent) {
        const parsed: Consent = JSON.parse(savedConsent);
        if (parsed.version === 1 && parsed.essential === true) {
          setConsent(parsed); setAnalytics(parsed.analytics); setMarketing(parsed.marketing);
        } else setConsent(null);
      } else setConsent(null);
    } catch { setConsent(null); }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  useEffect(() => { setMenu(false); setLanguageOpen(false); }, [pathname]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLanguageOpen(false); setMenu(false); }
    };
    const clickOutside = (e: MouseEvent) => {
      if (languageBoxRef.current && !languageBoxRef.current.contains(e.target as Node)) setLanguageOpen(false);
    };
    const onScroll = () => setFloating(window.scrollY > 80);
    window.addEventListener("keydown", close);
    window.addEventListener("mousedown", clickOutside);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("mousedown", clickOutside);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerCloseRef.current?.focus();
    const trapFocus=(e:KeyboardEvent)=>{
      if(e.key!=='Tab') return;
      const drawer=document.getElementById('mobile-nav');
      if(!drawer) return;
      const items=Array.from(drawer.querySelectorAll<HTMLElement>('a,button:not([disabled])'));
      if(!items.length) return;
      const first=items[0],last=items[items.length-1];
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
    };
    document.addEventListener('keydown',trapFocus);
    return ()=>{document.body.style.overflow=previousOverflow;document.removeEventListener('keydown',trapFocus);};
  },[menu]);

  const switchLocale = (next: Locale) => {
    const updated = pathname.replace(/^\/[^/]+(?=\/|$)/, `/${next}`);
    setLanguageOpen(false);
    router.push(updated === pathname ? `/${next}` : updated);
  };

  const selectRegion = (next: string) => {
    setRegion(next);
    try { localStorage.setItem("dc-region", next); } catch {}
  };

  const saveConsent = (a: boolean, m: boolean) => {
    const saved: Consent = { essential: true, analytics: a, marketing: m, version: 1, savedAt: new Date().toISOString() };
    setConsent(saved); setAnalytics(a); setMarketing(m); setCookieDialog(false);
    try { localStorage.setItem(consentKey, JSON.stringify(saved)); } catch {}
  };

  const link = (slug: string) => `/${locale}/${slug}`;
  const currentLanguage = useMemo(() => languageCatalog.find(l => l.code === locale) ?? languageCatalog[0], [locale]);
  const filteredLanguages = useMemo(() => {
    const scope = regionLanguageCodes[region] ?? [];
    return languageCatalog.filter(l => (region === 'GL' || scope.includes(l.code)) &&
      (l.name + ' ' + l.english + ' ' + l.market).toLowerCase().includes(languageQuery.toLowerCase().trim()));
  }, [languageQuery,region]);

  return <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="website-shell">
    <a className="skip-link" href="#main">{t({en:"Skip to content",hi:"मुख्य सामग्री पर जाएँ",ar:"انتقل إلى المحتوى"},locale)}</a>

    <div className="utility-bar"><div className="container utility-inner">
      <div className="group-marquee" aria-label={t(ui.group,locale)}><span className="group-marquee-track" aria-hidden="true"><span>◆ &nbsp; {t(ui.group,locale)}</span><span>◆ &nbsp; {t(ui.group,locale)}</span></span></div>
      <div className="utility-tools">
        <label className="tool-label"><span>{t(ui.region, locale)}</span>
          <select aria-label={t(ui.region, locale)} value={region} onChange={e => selectRegion(e.target.value)}>
            {regions.map(r => <option value={r.code} key={r.code}>{t(r.name,locale)}</option>)}
          </select>
        </label>
        <span className="utility-divider" aria-hidden="true"/>
        <div className="language-control" ref={languageBoxRef}>
          <button type="button" className="language-trigger" aria-expanded={languageOpen} aria-controls="global-language-panel" onClick={() => setLanguageOpen(v => !v)}>
            <span>{t(ui.language,locale)}</span>
            <strong className="trigger-language"><img className="flag-icon" src={currentLanguage.flagAsset} alt="" aria-hidden="true" />{localeLabel[locale]}</strong>
            <ChevronDown/>
          </button>
          {languageOpen && <div className="language-panel" id="global-language-panel" role="region" aria-label={t({en:'Choose website language',hi:'वेबसाइट की भाषा चुनें',ar:'اختر لغة الموقع'},locale)}>
            <div className="language-panel-head"><strong>{t({en:'Select language',hi:'भाषा चुनें',ar:'اختر اللغة'},locale)}</strong><button type="button" aria-label={t(ui.close,locale)} onClick={() => setLanguageOpen(false)}>×</button></div>
            <input className="language-search" type="search" value={languageQuery} onChange={e=>setLanguageQuery(e.target.value)} placeholder={t({en:'Search languages...',hi:'भाषा खोजें...',ar:'البحث عن لغة...'},locale)}/>
            <div className="language-scroll"><div className="language-list">
              {filteredLanguages.map(l => <button type="button" key={l.code} disabled={!l.available} className={'language-option'+(l.code===locale?' current':'')+(l.available?'':' unavailable')} title={l.available ? l.english : 'Full site translation scheduled in a future patch'} onClick={() => { if (l.available) switchLocale(l.code as Locale); }}>
                <img className="language-flag-image" src={l.flagAsset} alt="" aria-hidden="true" />
                <span className="language-name" dir="auto"><strong>{l.name}</strong><small>{l.english}</small></span>
                <span className="language-status" aria-hidden="true">{l.code===locale?'✓':(!l.available?'Soon':'')}</span>
              </button>)}
            </div></div>
            <div className="language-panel-foot">{t({en:'Language options are filtered to your chosen region. Seven verified language editions are selectable globally; remaining translations are in preparation.',hi:'आपके चुने हुए क्षेत्र के अनुसार भाषाएँ दिखती हैं। अभी सात भाषाएँ उपलब्ध हैं; बाकी भाषाओं के अनुवाद तैयार किए जा रहे हैं।',ar:'تُعرض اللغات بحسب المنطقة المختارة. تتوفر سبع نسخ لغوية حالياً، وتجري مراجعة الترجمات الأخرى.'},locale)}</div>
          </div>}
        </div>
      </div>
    </div></div>

    <header className={floating ? "site-header floating" : "site-header"}><div className="container header-inner">
      <Link className="brand" href={`/${locale}`} aria-label={t({en:"DELIGH CONSULTANCY — Home",hi:"DELIGH CONSULTANCY — होम",ar:"DELIGH CONSULTANCY — الرئيسية"},locale)} onClick={() => setMenu(false)}>
        <span className="brand-mark" aria-hidden="true">DC</span>
        <span className="brand-text"><strong>DELIGH</strong><span>CONSULTANCY</span></span>
      </Link>
      <nav className="desktop-nav" aria-label={t({en:"Main navigation",hi:"मुख्य नेविगेशन",ar:"التنقل الرئيسي"},locale)}>
        {navItems.map(item => <Link key={item.slug} className={pathname === link(item.slug) || pathname.startsWith(link(item.slug)+"/") ? "nav-link active" : "nav-link"} href={link(item.slug)}>{t(item.label, locale)}</Link>)}
      </nav>
      <button className="menu-toggle" aria-label={menu ? t(ui.close, locale) : t(ui.menu, locale)} aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(v=>!v)}>
        <span className={menu ? "hamburger open" : "hamburger"}><i/><i/><i/></span>
      </button>
    </div></header>

    {menu && <div className="mobile-overlay" role="presentation">
      <button type="button" className="mobile-scrim" onClick={() => setMenu(false)} aria-label={t(ui.close,locale)} />
      <div className="mobile-navigation" id="mobile-nav" role="dialog" aria-modal="true" aria-label={t({en:'Site navigation',hi:'वेबसाइट नेविगेशन',ar:'التنقل في الموقع'},locale)}>
        <div className="mobile-nav-heading"><Link className="brand" href={`/${locale}`} onClick={() => setMenu(false)}><span className="brand-mark">DC</span><span className="brand-text"><strong>DELIGH</strong><span>CONSULTANCY</span></span></Link><button ref={drawerCloseRef} type="button" className="mobile-close" onClick={() => setMenu(false)} aria-label={t(ui.close,locale)}>×</button></div>
        <nav className="mobile-nav-links" aria-label={t({en:'Mobile navigation',hi:'मोबाइल नेविगेशन',ar:'قائمة الهاتف'},locale)}>
          {navItems.map((item,index) => <Link style={{animationDelay:`${index * 38}ms`}} key={item.slug} href={link(item.slug)} onClick={() => setMenu(false)}>{t(item.label,locale)} <Arrow /></Link>)}
        </nav>
        <div className="mobile-nav-bottom"><span>DELIGH GROUP</span><a href="mailto:reachus@deligh.org">reachus@deligh.org <Arrow/></a></div>
      </div>
    </div>}

    <main id="main">{children}</main>
    <RevealMotion/>

    <section className="site-contact-cta" aria-labelledby="site-contact-title">
      <div className="container site-contact-inner"><div><p className="contact-cta-eyebrow">DELIGH CONSULTANCY</p>
        <h2 id="site-contact-title">{t({en:'Let’s move your next decision forward.',hi:'अगले निर्णय की ओर साथ बढ़ें।',ar:'لنمضِ معاً نحو قرارك القادم.'},locale)}</h2>
        <p>{t({en:'Have a business challenge or partnership proposal? Connect directly with our team.',hi:'कोई व्यावसायिक चुनौती या साझेदारी का प्रस्ताव है? हमारी टीम से सीधे संपर्क करें।',ar:'هل لديك تحدٍّ تجاري أو اقتراح شراكة؟ تواصل مباشرة مع فريقنا.'},locale)}</p></div>
        <a className="site-contact-button" href="mailto:reachus@deligh.org?subject=DELIGH%20CONSULTANCY%20Enquiry">reachus@deligh.org <Arrow/></a>
      </div>
    </section>

    <footer className="footer">
      <div className="container footer-primary">
        <div className="footer-brand"><div className="footer-logo">DELIGH <span>CONSULTANCY</span></div>
          <p>{t(ui.footerStatement,locale)}</p><div className="footer-group">{t(ui.footerGroup,locale)}</div>
        </div>
        <div className="footer-links"><h3>{t({en:"Company",hi:"कंपनी",ar:"الشركة"},locale)}</h3>
          {["about","teams-offices","partners","careers"].map(s => {const item=navItems.find(n=>n.slug===s)!; return <Link href={link(s)} key={s}>{t(item.label,locale)}</Link>;})}</div>
        <div className="footer-links"><h3>{t({en:"Explore",hi:"विस्तार से",ar:"استكشف"},locale)}</h3>
          {["services","industries","work","insights"].map(s => {const item=navItems.find(n=>n.slug===s)!; return <Link href={link(s)} key={s}>{t(item.label,locale)}</Link>;})}</div>
        <div className="footer-links"><h3>{t({en:"Contact & policies",hi:"संपर्क और नीतियाँ",ar:"التواصل والسياسات"},locale)}</h3>
          <Link href={link("contact")}>{t(navItems[8].label,locale)}</Link>
          <Link href={link("privacy")}>{t({en:"Privacy notice",hi:"गोपनीयता सूचना",ar:"إشعار الخصوصية"},locale)}</Link>
          <button type="button" onClick={() => setCookieDialog(true)}>{t(ui.cookieSettings,locale)}</button>
        </div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} DELIGH CONSULTANCY. {t({en:"All rights reserved.",hi:"सभी अधिकार सुरक्षित।",ar:"جميع الحقوق محفوظة."},locale)}</span>
      <span>{t({en:"Corporate website foundation preview",hi:"कॉर्पोरेट वेबसाइट का प्रारंभिक संस्करण",ar:"نسخة تأسيسية من الموقع"},locale)}</span></div>
    </footer>

    {consent === null && !cookieDialog && <div className="cookie-banner" role="region" aria-label={t(ui.cookieTitle,locale)}>
      <div className="cookie-copy"><strong>{t(ui.cookieTitle,locale)}</strong><p>{t(ui.cookieText,locale)}</p></div>
      <div className="cookie-actions"><button onClick={() => saveConsent(false,false)} className="btn btn-outline">{t(ui.reject,locale)}</button><button onClick={() => setCookieDialog(true)} className="btn btn-outline">{t(ui.manage,locale)}</button><button onClick={() => saveConsent(true,true)} className="btn btn-navy">{t(ui.accept,locale)}</button></div>
    </div>}

    {cookieDialog && <div className="modal-backdrop" onMouseDown={e => {if(e.target === e.currentTarget) setCookieDialog(false)}}>
      <div className="consent-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
        <div className="modal-heading"><h2 id="cookie-title">{t(ui.cookieTitle,locale)}</h2><button className="modal-close" onClick={() => setCookieDialog(false)} aria-label={t(ui.close,locale)}>×</button></div>
        <p>{t(ui.cookieText,locale)}</p>
        <label className="consent-row"><span>{t(ui.necessary,locale)}</span><input type="checkbox" checked disabled /></label>
        <label className="consent-row"><span>{t(ui.analytics,locale)}</span><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/></label>
        <label className="consent-row"><span>{t(ui.marketing,locale)}</span><input type="checkbox" checked={marketing} onChange={e=>setMarketing(e.target.checked)}/></label>
        <div className="modal-actions"><button className="btn btn-outline" onClick={()=>saveConsent(false,false)}>{t(ui.reject,locale)}</button><button className="btn btn-navy" onClick={()=>saveConsent(analytics,marketing)}>{t(ui.save,locale)}</button></div>
      </div>
    </div>}
  </div>;
}
