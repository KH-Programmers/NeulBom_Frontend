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
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-[#FAE8FF] via-[#E2E8F0] to-[#FFFCED]">
          {children}
        </div>
      </body>
    </html>
  );
}
