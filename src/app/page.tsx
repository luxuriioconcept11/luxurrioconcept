'use client'

import dynamic from 'next/dynamic'
import { useIsSafari } from '@/hooks/useIsSafari'
import EntryLogo from '@/components/EntryLogo'

// Standard components (Chrome/Desktop)
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

// Safari-optimized components (lightweight)
const SafariImageShowcase = dynamic(() => import('@/components/safari/SafariImageShowcase'), {
    loading: () => <div className="h-96 bg-bg-primary" />,
    ssr: false
})

const SafariReelsCarousel = dynamic(() => import('@/components/safari/SafariReelsCarousel'), {
    loading: () => <div className="h-96 bg-bg-primary" />,
    ssr: false
})

const SafariFounderSection = dynamic(() => import('@/components/safari/SafariFounderSection'), {
    loading: () => <div className="h-96 bg-bg-primary" />,
    ssr: false
})

const Footer = dynamic(() => import('@/components/Footer'), {
    loading: () => <div className="h-48 bg-bg-primary" />,
    ssr: true
})

export default function Home() {
    const { isSafariMobile } = useIsSafari()

    return (
        <main className="relative">
            {/* Entry Logo Section - Critical for LCP, loaded immediately */}
            <EntryLogo />

            {/* Image Showcase Gallery */}
            {isSafariMobile ? <SafariImageShowcase /> : <ImageShowcase />}

            {/* Vertical Reels Carousel */}
            {isSafariMobile ? <SafariReelsCarousel /> : <ReelsCarousel />}

            {/* Founder Message Section */}
            {isSafariMobile ? <SafariFounderSection /> : <FounderSection />}

            {/* Minimal Footer */}
            <Footer />
        </main>
    )
}
