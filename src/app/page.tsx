'use client'

import dynamic from 'next/dynamic'
import EntryLogo from '@/components/EntryLogo'

// Dynamic imports for below-fold components - reduces initial JS bundle for faster LCP
const ImageShowcase = dynamic(() => import('@/components/ImageShowcase'), {
    loading: () => <div className="h-screen bg-bg-primary" />,
    ssr: true
})

const ReelsCarousel = dynamic(() => import('@/components/ReelsCarousel'), {
    loading: () => <div className="h-screen bg-bg-primary" />,
    ssr: true
})

const FounderSection = dynamic(() => import('@/components/FounderSection'), {
    loading: () => <div className="h-96 bg-bg-primary" />,
    ssr: true
})

const Footer = dynamic(() => import('@/components/Footer'), {
    loading: () => <div className="h-48 bg-bg-primary" />,
    ssr: true
})

export default function Home() {
    return (
        <main className="relative">
            {/* Entry Logo Section - Critical for LCP, loaded immediately */}
            <EntryLogo />

            {/* Image Showcase Gallery */}
            <ImageShowcase />

            {/* Vertical Reels Carousel */}
            <ReelsCarousel />

            {/* Founder Message Section */}
            <FounderSection />

            {/* Minimal Footer */}
            <Footer />
        </main>
    )
}


