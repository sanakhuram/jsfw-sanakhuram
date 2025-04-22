/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.noroff.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // ... other config options
};

module.exports = nextConfig;
