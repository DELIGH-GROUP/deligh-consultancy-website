import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import { isLocale, locales, t } from "@/lib/i18n";
import ServicePage from "@/components/service-page";
export function generateStaticParams(){return locales.flatMap(locale=>services.map(s=>({locale,slug:s.slug})));}
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata>{
 const {locale,slug}=await params;if(!isLocale(locale)) return {};
 const entry=services.find(s=>s.slug===slug);return entry?{title:t(entry.title,locale),description:t(entry.summary,locale)}:{};
}
export default async function DetailPage({params}:{params:Promise<{locale:string;slug:string}>}){
 const {locale,slug}=await params;
 if(!isLocale(locale)||!services.some(s=>s.slug===slug)) notFound();
 return <ServicePage locale={locale} slug={slug}/>;
}
