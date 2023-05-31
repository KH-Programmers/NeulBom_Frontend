/** @type {import('next').NextConfig} */
const nextConfig = {};

const withPWA = require("next-pwa")({
  dest: "public",
  // enable pwa only in production environment
  disable: process.env.NODE_ENV !== "production",
});

module.exports = withPWA({
  experimental: {
    typedRoutes: true,
  },
});
