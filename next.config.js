/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    // WebP first for Safari compatibility (AVIF can be slow to decode on older Safari)
    formats: ['image/webp', 'image/avif'],
    // Optimized device sizes for mobile-first approach
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 220, 280, 360],
    // 30 days cache
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Reduce quality for faster decoding
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  output: 'standalone',
  // Compress responses
  compress: true,
  // Enable strict mode for better debugging
  reactStrictMode: false, // Disabled to prevent double-renders in dev
  // Experimental optimizations for Safari
  experimental: {
    // Optimize package imports for smaller bundles
    optimizePackageImports: ['framer-motion', 'gsap'],
  },
  // Custom headers for better caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig


