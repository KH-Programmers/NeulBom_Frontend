import React from "react";

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
