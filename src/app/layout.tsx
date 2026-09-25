import { Geist, Geist_Mono } from "next/font/google";
import { SkipToContent } from "@/shared/a11y/SkipToContent";
import { buildRootMetadata } from "@/shared/seo/metadata-builders";
import { JsonLd, buildWebSiteJsonLd } from "@/shared/seo/json-ld";
import { Providers } from "./providers";
import { PromoBanner, SiteFooter, SiteNavbar } from "@/shared/ui";
import "./globals.css";
import { CartSidebar } from "@/modules/cart/presentation/components/CartSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = buildRootMetadata();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#f5f3ef] text-stone-900">
        <JsonLd data={buildWebSiteJsonLd()} />
        <SkipToContent />
        <Providers>
          <CartSidebar />
          <PromoBanner />
          <SiteNavbar />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
