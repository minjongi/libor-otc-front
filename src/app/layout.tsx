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

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import GoTop from "@/components/Layout/GoTop";
import Settings from "@/components/Layout/Settings";

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Libor - Crypto Currency Exchange",
  description: "Libor - Crypto Currency Exchange",
};

export default async function LocaleLayout({
                                             children,
                                           }: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
      <html lang="en">
      <body className={`${interSans.variable} expa-dark`}>
      <NextIntlClientProvider messages={messages}>
        {children}

        <GoTop />
        <Settings />
      </NextIntlClientProvider>
      </body>
      </html>
  );
}