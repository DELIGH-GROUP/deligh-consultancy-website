# DELIGH CONSULTANCY — Foundation Patch 01

## Brand and group hierarchy

- DELIGH GROUP: group-level umbrella and reserved board governance.
- ITSDELIGH PRIVATE LIMITED: existing technology parent company (IT & Security), including products Deligh Mail, Deligh Tube, Deligh Drive, Deligh Workspace and future technology companies/SPUs.
- DELIGH CONSULTANCY: consulting parent brand, short name **DC**. Do not publish "LIMITED" until its legal status is confirmed.
- Additional parent companies may be added under DELIGH GROUP; operating companies retain appropriate delegated independence.

## Site implementation

- Next.js 16.4.3 App Router, React 19.2, TypeScript, strict type checking.
- Pure white backgrounds; restrained corporate navy / Deligh-blue gradients.
- English, Hindi, Arabic site routes. All first-patch UI/page copy and 15 service descriptions translated; correct RTL baseline.
- Region selection independent of language, persisted locally. No forced IP-based redirects.
- Consent preferences with persisted necessary / optional categories. **No third-party analytics/advertising trackers are installed.**
- 9 top-level navigation areas; 15 service detail routes x 3 languages.
- No fake client/project metrics, fictitious partners, imaginary offices or fabricated staff members.
- Site intentionally `noindex` and `robots disallow` until verified production launch.

## Requirements

Node.js 20.9+ and npm; Windows PowerShell 5.1 compatible installer included in the PATCH root.

## Local start (after installer)

```powershell
cd 'D:\DELIGH GROUP\DELIGH COUNSULTANCY'
npm install
npm run dev
```

Open http://localhost:3000 . Default redirects to `/en`.

## Quality checks

```powershell
npm run typecheck
npm test
npm run build
```

## Current scope limitations (intentional, not fake features)

1. **Contact backend not connected.** The Contact page explicitly says it cannot collect or send enquiries. Configure a real verified inbox and server-side data protection before enabling forms.
2. **Region detection not automatic yet.** User-selected region persists; later phase can add country suggestions without automatically overriding visitor choice.
3. **Translations are starter editorial drafts**, including Arabic/Hindi; production translation and legal review are required.
4. **Cookies preferences are stored**, but no optional tracking services are installed, and no tracking categories are activated by accepting.
5. **Architecture imagery uses remote Unsplash photos** and requires an internet connection to load; replace with properly licensed, brand-approved local media before public launch.
6. **DC monogram is a provisional typographic mark**, not an approved official logo.
7. **CMS, CRM, auth and backend are not yet present**; planned for later patches after content/design approval.
8. **All locations are proposed**, except claims explicitly verified later. External delivery partnerships not claimed unless verified.
9. **Legal/privacy page is foundation copy**, not a final public legal notice.

## Next patches

02: typography refinements, mega-menu, approved imagery/logo, page-level design review.
03: CMS data model, translation workflow and editorial admin.
04: verified enquiry forms, CRM, reviewable office/partner/team directories.
05: regional suggestion logic, SEO readiness, structured data and production deployment gates.

## Editorial media reference

- Architectural hero photograph: Unsplash image `photo-1621831337128-35676ca30868`, https://unsplash.com/photos/a-modern-curved-building-against-a-clear-sky-t22k8gDAJyE
- Secondary architectural photograph: Unsplash image `photo-1486406146926-c627a92ad1ab`.

Photo credits and usage terms should be retained in project records. Do not infer that these are DELIGH office buildings.
