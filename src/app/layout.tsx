import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/shared/Navbar";
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
        {/* Navbar diletakkan di sini agar muncul di Home, About, Project, dan Contact */}
        <Navbar />
        
        {/* Main content akan mengisi sisa ruang */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Anda bisa menambahkan Footer global di sini nantinya */}
      </body>
    </html>
  );
}