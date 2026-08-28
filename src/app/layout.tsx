import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/widgets/navbar";
import { Footer } from "@/widgets/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ilhamhakim-portfolio.vercel.app"),
  title: {
    default: "Muhammad Ilham Hakim | Director of Photography & Filmmaker",
    template: "%s | Muhammad Ilham Hakim",
  },
  description:
    "Official portfolio of Muhammad Ilham Hakim, a Director of Photography, Cinematographer, and Lighting Specialist based in Bandung. Exploring cinematic visual soul through light and frames.",
  keywords: [
    "Muhammad Ilham Hakim",
    "Ilham Hakim",
    "Director of Photography",
    "Cinematographer Bandung",
    "DOP Indonesia",
    "Filmmaker Bandung",
    "Camera Person",
    "Gaffer",
    "Lighting Technician",
    "Film and Television Portfolio",
    "Cinematography Portfolio",
    "Visual Storytelling",
  ],
  authors: [{ name: "Muhammad Ilham Hakim" }],
  creator: "Muhammad Ilham Hakim",
  publisher: "Muhammad Ilham Hakim",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: "/",
    title: "Muhammad Ilham Hakim | Director of Photography & Filmmaker",
    description:
      "Official portfolio of Muhammad Ilham Hakim, a Director of Photography and Visual Storyteller based in Bandung. Exploring cinematic visual soul through light and frames.",
    siteName: "Muhammad Ilham Hakim Portfolio",
    images: [
      {
        url: "/images/profile-ilham.webp",
        width: 1200,
        height: 630,
        alt: "Muhammad Ilham Hakim - Director of Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ilham Hakim | Director of Photography & Filmmaker",
    description:
      "Official portfolio of Muhammad Ilham Hakim, a Director of Photography and Visual Storyteller based in Bandung.",
    images: ["/images/profile-ilham.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ilhamhakim-portfolio.vercel.app/#person",
      name: "Muhammad Ilham Hakim",
      alternateName: "Ilham Hakim",
      jobTitle: "Director of Photography",
      description:
        "Director of Photography and Filmmaker based in Bandung, specializing in cinematic storytelling, lighting, and camera work.",
      image: "https://ilhamhakim-portfolio.vercel.app/images/profile-ilham.webp",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bandung",
        addressCountry: "ID",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Institut Seni Budaya Indonesia (ISBI) Bandung",
      },
      knowsAbout: [
        "Cinematography",
        "Direction of Photography",
        "Lighting",
        "Camera Operation",
        "Film and Television Production",
      ],
      sameAs: [
        "https://instagram.com/ilhamhakim",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://ilhamhakim-portfolio.vercel.app/#website",
      url: "https://ilhamhakim-portfolio.vercel.app",
      name: "Muhammad Ilham Hakim Portfolio",
      publisher: {
        "@id": "https://ilhamhakim-portfolio.vercel.app/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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