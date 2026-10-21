import type { Metadata, Viewport } from "next";
import { Hind_Siliguri } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import BackspacePreventer from "@/components/BackspacePreventer";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Duo Corner | Exclusive Couple Gifts | Cash on Delivery",
  description:
    "Premium couple gift boxes, matching bracelets and exclusive couple collections.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#e11d48",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${hindSiliguri.variable} antialiased font-sans`}>
          <BackspacePreventer />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}