'use client'

import { useState } from 'react'
import Image from 'next/image'

// Safari-optimized: No 3D, no GSAP, no video autoplay
// Simple horizontal scroll with poster images
const reels = [
    { id: 1, title: 'Living Room', poster: '/gallery/image-2.jpg', video: '/reels-mobile/reel-1.mp4' },
    { id: 2, title: 'Bedroom', poster: '/gallery/image-3.jpg', video: '/reels-mobile/reel-2.mp4' },
    { id: 3, title: 'Kitchen', poster: '/gallery/image-4.jpg', video: '/reels-mobile/reel-3.mp4' },
]

export default function SafariReelsCarousel() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null)

    return (
        <section className="relative py-16 bg-bg-primary overflow-hidden">
            {/* Title */}
            <div className="text-center mb-8 px-4">
                <h2 className="font-display text-2xl tracking-[0.2em] text-gold-primary uppercase">
                    Our Work
                </h2>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex gap-4 px-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {reels.map((reel) => (
                    <div
                        key={reel.id}
                        className="flex-shrink-0 w-[260px] h-[400px] rounded-xl overflow-hidden border border-gold-muted/30 bg-bg-card snap-center relative"
                        onClick={() => setActiveVideo(reel.video)}
                    >
                        <Image
                            src={reel.poster}
                            alt={reel.title}
                            fill
                            className="object-cover"
                            sizes="260px"
                            loading="lazy"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="w-16 h-16 rounded-full bg-gold-primary/90 flex items-center justify-center">
                                <svg className="w-6 h-6 text-bg-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-text-light font-medium">{reel.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setActiveVideo(null)}
                >
                    <div className="relative w-full max-w-sm aspect-[9/16] rounded-xl overflow-hidden">
                        <video
                            src={activeVideo}
                            autoPlay
                            playsInline
                            muted
                            loop
                            className="w-full h-full object-cover"
                        />
                        <button
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"
                            onClick={() => setActiveVideo(null)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}
