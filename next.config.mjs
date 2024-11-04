/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_APOLLO_URL: process.env.NEXT_APOLLO_URL,
    PINATA_JWT: process.env.PINATA_JWT,
  },
};

export default nextConfig;
