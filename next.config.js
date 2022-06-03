/** @type {import('types').NextBundleAnalyzer} */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// const withBundleAnalyzer = require("@next/bundle-analyzer");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["drive.google.com"],
  },
  webpack: (config) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config.experiments.topLevelAwait = true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    newNextLinkBehavior: true,
  },
  // ...withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(),
};

module.exports = config;
