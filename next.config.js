/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lowlands.nl',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
