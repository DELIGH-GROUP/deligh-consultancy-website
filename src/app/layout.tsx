import type { Metadata } from "next";
import "@/styles/globals.css";
export const metadata: Metadata = {
  title: { default: "DELIGH CONSULTANCY | Corporate & Enterprise Advisory", template: "%s | DELIGH CONSULTANCY" },
  description: "DELIGH CONSULTANCY: multidisciplinary corporate, finance, infrastructure, enterprise and technology-related advisory within DELIGH GROUP.",
  robots: { index: false, follow: false }, // Preview must not enter public search engines.
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
