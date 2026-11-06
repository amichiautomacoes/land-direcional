import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { brand } from "@/content/brand";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/components/controls.css";
import "@/styles/components/navigation.css";
import "@/styles/sections/hero.css";
import "@/styles/sections/properties.css";
import "@/styles/sections/purchase.css";
import "@/styles/sections/editorial.css";
import "@/styles/sections/closing.css";
import "@/styles/motion.css";

const roboto = localFont({
  src: [
    { path: "../../public/fonts/roboto-regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/roboto-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000",
  ),
  title: brand.title,
  description: brand.description,
  icons: { icon: { url: "/images/brand/direcional.svg", type: "image/svg+xml" } },
  openGraph: { title: brand.title, description: brand.description, locale: "pt_BR", type: "website" },
};

export const viewport: Viewport = { themeColor: "#003ca5" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={roboto.variable}><body>{children}</body></html>;
}
