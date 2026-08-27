import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/widgets/navbar";
import { Footer } from "@/widgets/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Ilham Hakim | Director of Photography",
  description: "Portfolio of Muhammad Ilham Hakim, a Film and Television professional based in Bandung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
    >
      <body className="bg-[#0a0a0a] text-white selection:bg-white selection:text-black min-h-screen flex flex-col">
        <Navbar />
        
        <main className="grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}