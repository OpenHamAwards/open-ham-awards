import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { locales, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import "../globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Open Ham Awards — Amateur Radio Contest & Award Management",
  description:
    "The professional open-source platform for managing Ham Radio rankings, activators, and automated log cross-validation.",
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${inter.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-zinc-900 text-zinc-200 antialiased">
        {children}
      </body>
    </html>
  );
}
