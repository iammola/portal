/** @type {import('next').NextConfig} */
const config = {
  swcMinify: true,
  reactStrictMode: true,
  images: { domains: ["drive.google.com"] },
  experimental: { newNextLinkBehavior: true },
};

module.exports = config;
