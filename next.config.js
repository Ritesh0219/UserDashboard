/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: [],
  },
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  env: {
    CUSTOM_KEY: "my-value",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
