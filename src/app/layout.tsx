import Logo from "@/components/ui/logo";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Summary PDF | Summarize PDFs in seconds",
  description:
    "Turn PDF documents into clear summaries and structured insights with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${font.variable} flex min-h-full flex-col bg-gray-100 font-[family-name:var(--font-plus-jakarta-sans)] text-gray-900 antialiased`}
      >
        <header className="py-6 text-center">
          <Link href="/" className="inline-flex justify-center">
            <Logo />
          </Link>
        </header>

        <main className="grow overflow-hidden">{children}</main>
        <Toaster />
        <footer className="mx-auto mt-14 flex w-full max-w-7xl items-center justify-between px-4 py-6 md:mt-0">
          <p className="text-xs text-gray-400 md:text-sm">Summary PDF · AI document summaries</p>
          <p className="text-xs text-gray-400 md:text-sm">Maintained by Sunny Kumar</p>
        </footer>
      </body>
    </html>
  );
}
