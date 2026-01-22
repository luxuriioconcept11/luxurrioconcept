'use client'

import Image from 'next/image'

// Safari-optimized: Reduced images, CSS-only animation, no Framer Motion
const images = [
    { id: 1, src: '/gallery/image-2.jpg', title: 'Interior 1' },
    { id: 2, src: '/gallery/image-3.jpg', title: 'Interior 2' },
    { id: 3, src: '/gallery/image-4.jpg', title: 'Interior 3' },
    { id: 4, src: '/gallery/image-5.jpg', title: 'Interior 4' },
    { id: 5, src: '/gallery/image-6.jpg', title: 'Interior 5' },
    { id: 6, src: '/gallery/image-7.jpg', title: 'Interior 6' },
]

export default function SafariImageShowcase() {
    return (
        <section className="relative py-16 bg-bg-primary overflow-hidden border-t border-bg-secondary/30">
            {/* Title */}
            <div className="text-center mb-12 px-4">
                <h2 className="font-display text-3xl md:text-4xl text-text-light mb-2">
                    Curated <span className="gold-gradient-text">Masterpieces</span>
                </h2>
                <div className="h-1 w-[100px] bg-gold-primary mx-auto rounded-full" />
            </div>

            {/* Simple Grid - No animation, no marquee */}
            <div className="grid grid-cols-2 gap-3 px-4 max-w-lg mx-auto">
                {images.map((img) => (
                    <div
                        key={img.id}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gold-muted/30 bg-bg-card"
                    >
                        <Image
                            src={img.src}
                            alt={img.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 200px"
                            loading="lazy"
                            quality={60}
                        />
                    </div>
                ))}
            </div>

            {/* Subtle glow - reduced blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold-primary/5 rounded-full blur-[50px] pointer-events-none" />
        </section>
    )
}
