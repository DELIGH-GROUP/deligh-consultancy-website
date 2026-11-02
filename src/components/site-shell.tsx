"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { type Locale, localeLabel, navItems, t, ui } from "@/lib/i18n";
import { Arrow } from "./arrow";
import { languageCatalog } from "@/lib/language-catalog";

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

export default function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const languageBoxRef = useRef<HTMLDivElement | null>(null);
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
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setLanguageOpen(false); };
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
  const filteredLanguages = useMemo(() => languageCatalog.filter(l => (l.name + ' ' + l.english + ' ' + l.market).toLowerCase().includes(languageQuery.toLowerCase().trim())), [languageQuery]);

  return <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="website-shell">
    <a className="skip-link" href="#main">{t({en:"Skip to content",hi:"मुख्य सामग्री पर जाएँ",ar:"انتقل إلى المحتوى"},locale)}</a>

    <div className="utility-bar"><div className="container utility-inner">
      <span className="utility-group">◈ &nbsp; {t(ui.group, locale)}</span>
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
            <span aria-hidden="true">⌄</span>
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
            <div className="language-panel-foot">{t({en:'Major global and Indian languages are listed here. Complete site translations are currently active for English, Hindi, Arabic, French, German, Spanish and Portuguese; additional language builds will follow in upcoming patches.',hi:'यहाँ प्रमुख वैश्विक और भारतीय भाषाएँ सूचीबद्ध हैं। अभी English, Hindi, Arabic, French, German, Spanish और Portuguese पूर्ण रूप से सक्रिय हैं; अन्य भाषाओं के पूर्ण संस्करण अगले patches में जोड़े जाएंगे।',ar:'تظهر هنا اللغات العالمية والهندية الرئيسية. الترجمات الكاملة للموقع متاحة حالياً بالإنجليزية والهندية والعربية والفرنسية والألمانية والإسبانية والبرتغالية، وسيتم إضافة اللغات الأخرى في ترقيات لاحقة.'},locale)}</div>
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

    {menu && <div className="mobile-navigation" id="mobile-nav"><nav className="container" aria-label={t({en:"Mobile navigation",hi:"मोबाइल नेविगेशन",ar:"قائمة الهاتف"},locale)}>
      {navItems.map(item => <Link key={item.slug} href={link(item.slug)} onClick={() => setMenu(false)}>{t(item.label,locale)} <Arrow /></Link>)}
    </nav></div>}

    <main id="main">{children}</main>

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
