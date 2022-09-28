/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["goldbelly.imgix.net"],
  },
};

module.exports = nextConfig;
