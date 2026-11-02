import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, navItems, t } from "@/lib/i18n";
import { sectionContent } from "@/lib/sections";
import SectionPage from "@/components/section-page";
const sections=[...navItems.map(item=>item.slug),"privacy"];
export function generateStaticParams(){return locales.flatMap(locale=>sections.map(section=>({locale,section})));}
export async function generateMetadata({params}:{params:Promise<{locale:string;section:string}>}):Promise<Metadata>{
 const {locale,section}=await params; if(!isLocale(locale)) return {};
 const item=navItems.find(i=>i.slug===section);const title=item?t(item.label,locale):section==='privacy'?'Privacy':'DELIGH CONSULTANCY';
 return {title,description:(sectionContent[section] ? t(sectionContent[section].lead,locale) : title)};
}
export default async function ContentPage({params}:{params:Promise<{locale:string;section:string}>}){
 const {locale,section}=await params;
 if(!isLocale(locale)||!sections.includes(section)) notFound();
 return <SectionPage locale={locale} section={section}/>;
}
