'use client'

import dynamic from 'next/dynamic'
import EntryLogo from '@/components/EntryLogo'

// Dynamic imports for components below the fold - improves initial page load
const ImageShowcase = dynamic(() => import('@/components/ImageShowcase'), {
    loading: () => (
        <div className="h-[600px] bg-bg-primary flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold-primary/30 border-t-gold-primary rounded-full animate-spin" />
        </div>
    ),
    ssr: true
})

const ReelsCarousel = dynamic(() => import('@/components/ReelsCarousel'), {
    loading: () => (
        <div className="h-[700px] bg-bg-primary flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold-primary/30 border-t-gold-primary rounded-full animate-spin" />
        </div>
    ),
    ssr: false // Disable SSR for video-heavy component
})

const FounderSection = dynamic(() => import('@/components/FounderSection'), {
    loading: () => <div className="h-[400px] bg-bg-primary" />,
    ssr: true
})

const Footer = dynamic(() => import('@/components/Footer'), {
    loading: () => <div className="h-[200px] bg-bg-primary" />,
    ssr: true
})

export default function Home() {
    return (
        <main className="relative">
            {/* Entry Logo Section - Critical above-fold, loaded immediately */}
            <EntryLogo />

            {/* Image Showcase Gallery - Lazy loaded */}
            <ImageShowcase />

            {/* Vertical Reels Carousel - Lazy loaded, no SSR for videos */}
            <ReelsCarousel />

            {/* Founder Message Section - Lazy loaded */}
            <FounderSection />

            {/* Minimal Footer - Lazy loaded */}
            <Footer />
        </main>
    )
}

