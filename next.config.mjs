/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_APOLLO_URL: process.env.NEXT_APOLLO_URL,
  },
};

export default nextConfig;
