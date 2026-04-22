import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { AppProviders } from "@/components/AppProviders";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const fontSerif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

const themeScript = `
  try {
    const storedTheme = localStorage.getItem("theme");
    const theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : "dark";
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "dark";
  }
`;

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: `${siteConfig.name} | Portfolio`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${siteConfig.name} | Portfolio`,
    description: siteConfig.description,
    url: absoluteUrl(),
    siteName: siteConfig.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Portfolio`,
    description: siteConfig.description
  }
};

export const viewport: Viewport = {
  themeColor: "#090b13",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable}`} suppressHydrationWarning>
      <body className="font-sans text-foreground antialiased" suppressHydrationWarning>
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <ThemeProvider>
          <AppProviders />
          <div className="relative min-h-screen overflow-x-clip">
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
              <div className="space-nebula absolute inset-0" />
              <div className="space-stars absolute inset-0 opacity-60" />
            </div>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
