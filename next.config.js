/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'daisyui.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig
