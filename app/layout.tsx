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
        <link rel="icon" href="/public/favicon.ico" />
        <link rel="manifest" href="../assets/manifest.json" />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="57x57"
          href="../assets/icons/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="114x114"
          href="../assets/icons/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="72x72"
          href="../assets/icons/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="144x144"
          href="../assets/icons/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="60x60"
          href="../assets/icons/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="120x120"
          href="../assets/icons/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="76x76"
          href="../assets/icons/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="152x152"
          href="../assets/icons/apple-touch-icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="../assets/icons/favicon-196x196.png"
          sizes="196x196"
        />
        <link
          rel="icon"
          type="image/png"
          href="../assets/icons/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="../assets/icons/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="../assets/icons/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="../assets/icons/favicon-128.png"
          sizes="128x128"
        />
        <meta name="application-name" content="&nbsp;" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
        <meta
          name="msapplication-square150x150logo"
          content="../asssets/mstile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="../asssets/mstile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="../asssets/mstile-310x310.png"
        />
        <meta name="theme-color" content="#9E1915" />
      </head>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-[#FAE8FF] via-[#E2E8F0] to-[#FFFCED]">
          {children}
        </div>
      </body>
    </html>
  );
}
