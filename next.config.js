/** @type {import('types').NextBundleAnalyzer} */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const withBundleAnalyzer = require("@next/bundle-analyzer");

/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  images: { domains: ["drive.google.com"] },
  experimental: { newNextLinkBehavior: true },
  ...withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(),
};
