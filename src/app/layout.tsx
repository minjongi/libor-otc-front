import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "../../styles/flaticon.css";
import "swiper/css";
import "swiper/css/bundle";

// Globals Styles
import "../../styles/globals.css";
import "../../styles/custom.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GoTop from "@/components/Layout/GoTop";
import Settings from "@/components/Layout/Settings";

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Libor - Crypto Currency Exchange",
  description:
    "Libor - Crypto Currency Exchange",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} expa-dark`}>
        {children}

        <GoTop />

        <Settings />
      </body>
    </html>
  );
}
