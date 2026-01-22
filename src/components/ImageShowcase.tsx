'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Use smaller images for better performance (avoid the huge 5MB+ images)
const showcaseImages = [
    { id: 1, src: '/gallery/image-2.jpg', title: 'Luxury Interior 1' },
    { id: 2, src: '/gallery/image-3.jpg', title: 'Luxury Interior 2' },
    { id: 3, src: '/gallery/image-4.jpg', title: 'Luxury Interior 3' },
    { id: 4, src: '/gallery/image-5.jpg', title: 'Luxury Interior 4' },
    { id: 5, src: '/gallery/image-6.jpg', title: 'Luxury Interior 5' },
    { id: 6, src: '/gallery/image-7.jpg', title: 'Luxury Interior 6' },
    { id: 7, src: '/gallery/image-8.jpg', title: 'Luxury Interior 7' },
    { id: 8, src: '/gallery/image-9.jpg', title: 'Luxury Interior 8' },
    { id: 9, src: '/gallery/image-10.jpg', title: 'Luxury Interior 9' },
    { id: 10, src: '/gallery/image-11.jpg', title: 'Luxury Interior 10' },
    { id: 11, src: '/gallery/image-12.jpg', title: 'Luxury Interior 11' },
    { id: 12, src: '/gallery/image-13.jpg', title: 'Luxury Interior 12' },
]

export default function ImageShowcase() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    // Superfast lazy load - larger rootMargin for early pre-loading
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true)
                        observer.disconnect()
                    }
                })
            },
            {
                rootMargin: '400px', // Start loading 400px before section is visible
                threshold: 0
            }
        )

        observer.observe(container)
        return () => observer.disconnect()
    }, [])

    // Split images for two rows (6 each for better mobile performance)
    const row1 = showcaseImages.slice(0, 6)
    const row2 = showcaseImages.slice(6, 12)

    // Duplicating for infinite loop effect
    const marqueeRow1 = [...row1, ...row1, ...row1]
    const marqueeRow2 = [...row2, ...row2, ...row2]

    return (
        <section ref={containerRef} className="relative pt-12 pb-24 bg-bg-primary overflow-hidden border-t border-bg-secondary/30">

            {/* Section Header - Always visible immediately */}
            <div className="text-center mb-16 px-4 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                    className="font-display text-4xl md:text-5xl lg:text-6xl text-text-light mb-4"
                >
                    {/* "Curated " */}
                    <span className="inline-block mr-2 md:mr-4">
                        {Array.from("Curated").map((char, index) => (
                            <motion.span
                                key={`cur-${index}`}
                                className="inline-block"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>

                    {/* "Masterpieces" */}
                    <span className="inline-block gold-gradient-text">
                        {Array.from("Masterpieces").map((char, index) => (
                            <motion.span
                                key={`mas-${index}`}
                                className="inline-block"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                </motion.div>
                <div className="h-1 w-[100px] bg-gold-primary mx-auto rounded-full" />
            </div>

            {/* Marquee Container - Always render the structure, images lazy load individually */}
            <div className="flex flex-col gap-6 md:gap-12 rotate-[-1deg] md:rotate-[-2deg] scale-100 md:scale-105 origin-center">

                {/* Row 1: Left Scroll */}
                <div className="relative flex overflow-hidden group/row">
                    <div className="absolute inset-y-0 left-0 w-8 md:w-20 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-8 md:w-20 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

                    <div className="flex gap-4 md:gap-8 px-4 animate-marquee hover-pause">
                        {marqueeRow1.map((img, i) => (
                            <ShowcaseCard key={`${img.id}-r1-${i}`} image={img} priority={i < 3} shouldLoad={isVisible} />
                        ))}
                    </div>
                </div>

                {/* Row 2: Right Scroll */}
                <div className="relative flex overflow-hidden group/row">
                    <div className="absolute inset-y-0 left-0 w-8 md:w-20 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-8 md:w-20 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

                    <div className="flex gap-4 md:gap-8 px-4 animate-marquee-reverse hover-pause">
                        {marqueeRow2.map((img, i) => (
                            <ShowcaseCard key={`${img.id}-r2-${i}`} image={img} priority={false} shouldLoad={isVisible} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[150px] pointer-events-none" />
        </section>
    )
}

function ShowcaseCard({ image, priority = false, shouldLoad = true }: { image: typeof showcaseImages[0], priority?: boolean, shouldLoad?: boolean }) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div className="group relative w-[220px] h-[160px] md:w-[360px] md:h-[250px] flex-shrink-0 cursor-pointer transition-all duration-500 hover:z-50 hover:scale-110">
            {/* Main Card */}
            <div className="w-full h-full rounded-lg overflow-hidden border border-gold-muted/30 bg-bg-card hover:border-gold-primary/80 transition-all duration-300 shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* Image */}
                <div className="relative w-full h-full bg-bg-secondary">
                    {/* Loading skeleton - always show until image loads */}
                    {!isLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-bg-secondary via-bg-card to-bg-secondary animate-pulse" />
                    )}
                    {shouldLoad && (
                        <Image
                            src={image.src}
                            alt={image.title}
                            fill
                            className={`object-cover transition-all duration-700 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                            sizes="(max-width: 768px) 220px, 360px"
                            loading={priority ? "eager" : "lazy"}
                            quality={60}
                            onLoad={() => setIsLoaded(true)}
                        />
                    )}
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
            </div>
        </div>
    )
}

