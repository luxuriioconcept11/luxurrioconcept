'use client'

import EntryLogo from '@/components/EntryLogo'
import ImageShowcase from '@/components/ImageShowcase'
import ReelsCarousel from '@/components/ReelsCarousel'
import FounderSection from '@/components/FounderSection'
import Footer from '@/components/Footer'

export default function Home() {
    return (
        <main className="relative">
            {/* Entry Logo Section */}
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
