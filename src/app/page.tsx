'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
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

// Lazy Mount Hook - only mounts component when user scrolls near it
function useLazyMount(rootMargin = '500px') {
    const ref = useRef<HTMLDivElement>(null)
    const [shouldMount, setShouldMount] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldMount(true)
                    observer.disconnect()
                }
            },
            { rootMargin }
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [rootMargin])

    return { ref, shouldMount }
}

export default function Home() {
    const reelsMount = useLazyMount('600px')
    const showcaseMount = useLazyMount('600px')

    return (
        <main className="relative">
            {/* Entry Logo Section - Critical for LCP, loaded immediately */}
            <EntryLogo />

            {/* Image Showcase Gallery - Lazy mounted for GPU savings */}
            <div ref={showcaseMount.ref}>
                {showcaseMount.shouldMount ? <ImageShowcase /> : <div className="h-screen bg-bg-primary" />}
            </div>

            {/* Vertical Reels Carousel - Lazy mounted (heaviest component) */}
            <div ref={reelsMount.ref}>
                {reelsMount.shouldMount ? <ReelsCarousel /> : <div className="h-screen bg-bg-primary" />}
            </div>

            {/* Founder Message Section */}
            <FounderSection />

            {/* Minimal Footer */}
            <Footer />
        </main>
    )
}
