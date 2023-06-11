/** @type {import('next').NextConfig} */
const nextConfig = {};

if (process.env.NODE_ENV === "production") {
  const withPWA = require("next-pwa")({
    dest: "public",
    // enable pwa only in production environment
    disable: process.env.NODE_ENV !== "production",
  });

  module.exports = withPWA({
    ...nextConfig,
    experimental: {
      esmExternals: "loose",
    },
  });
} else {
  module.exports = nextConfig;
}
