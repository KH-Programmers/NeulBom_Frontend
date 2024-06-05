import React from "react";

import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

export const metadata = {
  title: "NeulBom",
  description: "당신 손 안의 작은 학교, 늘봄",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-color-mode="light">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta
          name="naver-site-verification"
          content="f6555e8e303eee6b50e1e3e0916f6bb95979a5f4"
        />
        <GoogleAnalytics gaId="G-6BHVX6H7ME" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-[#FAE8FF] via-[#E2E8F0] to-[#FFFCED]">
          {children}
        </div>
      </body>
    </html>
  );
}
