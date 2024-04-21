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
  nextConfig.experimental = {
    esmExternals: "loose",
  };
}
module.exports = nextConfig;
