'use client'

import { useState } from 'react'
import Image from 'next/image'

// Hardcoded data to avoid complex imports dependencies for now
const showcaseImages = [
    { id: 1, src: '/gallery/image-2.jpg', title: 'Luxury Interior 1' },
    { id: 2, src: '/gallery/image-3.jpg', title: 'Luxury Interior 2' },
    { id: 3, src: '/gallery/image-4.jpg', title: 'Luxury Interior 3' },
    { id: 4, src: '/gallery/image-5.jpg', title: 'Luxury Interior 4' },
    { id: 5, src: '/gallery/image-6.jpg', title: 'Luxury Interior 5' },
    { id: 6, src: '/gallery/image-7.jpg', title: 'Luxury Interior 6' },
]

const reels = [
    { id: 1, src: '/reels-mobile/reel-1.mp4', poster: '/gallery/image-2.jpg' },
    { id: 2, src: '/reels-mobile/reel-2.mp4', poster: '/gallery/image-3.jpg' },
    { id: 3, src: '/reels-mobile/reel-3.mp4', poster: '/gallery/image-4.jpg' },
]

export default function SafariMobileView() {
    return (
        <main className="bg-bg-primary min-h-screen pb-20 overflow-x-hidden">
            {/* 1. Static Hero Section */}
            <section className="h-screen w-full flex flex-col items-center justify-center relative px-6 text-center">
                <div className="absolute inset-0 bg-gold-primary/5 blur-3xl pointer-events-none" />

                <h1 className="font-display text-5xl text-gold-primary mb-4 relative z-10">
                    LUXURIIO<br /><span className="text-text-light text-4xl">CONCEPT</span>
                </h1>

                <p className="text-gold-muted text-sm uppercase tracking-widest max-w-xs mx-auto mb-8 relative z-10">
                    A Complete Interior Designing Solution
                </p>

                <div className="flex gap-6 relative z-10">
                    <a href="tel:+919695765696" className="p-3 rounded-full bg-bg-card border border-gold-muted/30 text-gold-primary">
                        <span className="sr-only">Call</span>
                        📞
                    </a>
                    <a href="https://wa.me/919695765696" className="p-3 rounded-full bg-bg-card border border-gold-muted/30 text-gold-primary">
                        <span className="sr-only">WhatsApp</span>
                        💬
                    </a>
                    <a href="mailto:luxuriioconcept@gmail.com" className="p-3 rounded-full bg-bg-card border border-gold-muted/30 text-gold-primary">
                        <span className="sr-only">Email</span>
                        ✉️
                    </a>
                </div>

                <div className="absolute bottom-10 animate-bounce text-gold-primary">
                    ↓
                </div>
            </section>

            {/* 2. Simple Gallery (Horizontal Snap Scroll) */}
            <section className="py-12 border-t border-bg-secondary/30">
                <h2 className="text-center font-display text-3xl text-gold-primary mb-8">Curated Masterpieces</h2>

                {/* Native Horizontal Scroll Container - extremely efficient */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-8 scrollbar-hide">
                    {showcaseImages.map((img) => (
                        <div key={img.id} className="snap-center shrink-0 w-[280px] h-[350px] relative rounded-xl overflow-hidden border border-gold-muted/20">
                            <Image
                                src={img.src}
                                alt={img.title}
                                fill
                                className="object-cover"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Simple Reels Grid (Vertical List) */}
            <section className="py-12 bg-bg-secondary/20">
                <h2 className="text-center font-display text-3xl text-gold-primary mb-8">Our Work</h2>

                <div className="flex flex-col gap-8 px-6 max-w-lg mx-auto">
                    {reels.map((reel) => (
                        <div key={reel.id} className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden border border-gold-muted/20 shadow-lg bg-black">
                            {/* Native Video Player - Simplest possible implementation */}
                            <video
                                src={reel.src}
                                poster={reel.poster}
                                controls
                                playsInline
                                muted
                                loop
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Founder Section (Static) */}
            <section className="py-20 px-6 max-w-lg mx-auto text-center relative">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gold-primary p-1">
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                        <Image
                            src="/img/founder.jpg"
                            alt="Yash Bhagwani"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <h3 className="font-display text-2xl text-gold-primary mb-2">Yash Bhagwani</h3>
                <p className="text-text-muted text-sm mb-8">Founder, Luxuriio Concept</p>

                <blockquote className="text-lg italic text-text-light/90 border-l-2 border-gold-primary pl-4 text-left">
                    "True luxury is not about excess, but about creating spaces that nurture the soul."
                </blockquote>
            </section>

            {/* 5. Simple Footer */}
            <footer className="py-8 text-center text-text-muted text-xs border-t border-bg-secondary/30">
                <p>© 2024 Luxuriio Concept.</p>
                <p className="mt-2">Designed for Excellence.</p>
            </footer>
        </main>
    )
}
