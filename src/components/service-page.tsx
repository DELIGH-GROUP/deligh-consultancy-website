import Link from "next/link";
import { type Locale, t, ui } from "@/lib/i18n";
import { services } from "@/lib/data";
import { PageHeading } from "./section-page";
import { Arrow } from "./arrow";

export default function ServicePage({locale, slug}:{locale:Locale;slug:string}) {
  const service=services.find(s=>s.slug===slug);
  if(!service) return null;
  return <>
    <PageHeading locale={locale} eyebrow={`${t(ui.capabilitiesLabel,locale)} / DELIGH CONSULTANCY`} title={service.title} lead={service.summary}/>
    <section className="section container service-detail-grid"><div>
      <Link className="back-link" href={`/${locale}/services`}>← {t(ui.back,locale)}</Link>
      <h2>{t(ui.methodology,locale)}</h2><p>{t(ui.methodologyLead,locale)}</p>
      <div className="method-steps">{[
        {en:"Understand the context",hi:"स्थिति को समझना",ar:"فهم السياق"},
        {en:"Define the engagement",hi:"कार्य का दायरा तय करना",ar:"تحديد نطاق العمل"},
        {en:"Assemble expertise",hi:"उपयुक्त विशेषज्ञ जोड़ना",ar:"تجميع الخبرات"},
        {en:"Deliver with accountability",hi:"जवाबदेही के साथ कार्यान्वयन",ar:"التنفيذ بمساءلة"}
      ].map((step,i)=><div key={i}><span>0{i+1}</span><h3>{t(step,locale)}</h3></div>)}</div>
    </div><aside className="detail-aside"><span className="eyebrow">DELIGH CONSULTANCY</span><h3>{t(service.title,locale)}</h3><p>{t(service.summary,locale)}</p><Link href={`/${locale}/contact`} className="btn btn-navy">{t(ui.discuss,locale)} <Arrow/></Link></aside></section>
  </>;
}
