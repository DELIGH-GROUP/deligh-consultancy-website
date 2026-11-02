"use client";
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
export default function RevealMotion(){
 const pathname=usePathname();
 useEffect(()=>{
  if(typeof window==='undefined'||!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const elements=Array.from(document.querySelectorAll<HTMLElement>('.section-intro,.feature-card,.capsule-service,.sector-photo-card,.industry-tile,.about-feature,.about-introduction,.principle,.group-story,.building-story-card,.directory-photo-card,.full-service,.transaction-card,.office-entry,.teams-visual-intro,.site-contact-cta,.editorial-mini-card'));
  elements.forEach(el=>el.classList.add('dc-reveal'));
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('dc-visible');
      observer.unobserve(entry.target);
    });
  },{threshold:0.06,rootMargin:'0px 0px 40px 0px'});
  elements.forEach(el=>observer.observe(el));
  document.documentElement.classList.add('dc-motion');
  return ()=>{observer.disconnect();document.documentElement.classList.remove('dc-motion');elements.forEach(el=>el.classList.remove('dc-reveal','dc-visible'));};
 },[pathname]);
 return null;
}
