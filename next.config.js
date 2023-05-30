/** @type {import('next').NextConfig} */
const nextConfig = {};

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  experimental: {
    typedRoutes: true,
  },
});
