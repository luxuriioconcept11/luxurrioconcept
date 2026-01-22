/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    // Optimized device sizes for mobile-first approach
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 220, 280, 360],
    // Minimize quality for faster loading on mobile
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
  },
  output: 'standalone',
  // Enable experimental optimizations
  experimental: {
    optimizeCss: true,
  },
  // Compress responses
  compress: true,
}

module.exports = nextConfig

