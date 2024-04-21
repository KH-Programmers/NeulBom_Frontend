/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/*/**",
      },
    ],
  },
};

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
