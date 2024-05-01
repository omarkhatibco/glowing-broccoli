/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
