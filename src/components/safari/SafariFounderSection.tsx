'use client'

import Image from 'next/image'

// Safari-optimized: No blur backgrounds, solid colors, simple fade-in
export default function SafariFounderSection() {
    return (
        <section className="relative py-20 px-4 bg-bg-primary overflow-hidden">
            {/* Solid gradient background instead of blurs */}
            <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary/20 to-bg-primary pointer-events-none" />

            <div className="relative max-w-lg mx-auto text-center">
                {/* Founder Image */}
                <div className="relative w-[200px] h-[200px] mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-gold-primary/30" />
                    <div className="absolute inset-2 rounded-full overflow-hidden">
                        <Image
                            src="/img/founder.jpg"
                            alt="Yash Bhagwani - Founder"
                            fill
                            className="object-cover object-top"
                            sizes="200px"
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* Founder Info */}
                <p className="text-gold-primary font-display text-xl mb-1">Yash Bhagwani</p>
                <p className="text-text-muted text-sm mb-8">
                    <span className="gold-gradient-text font-medium block">Founder, Luxuriio Concept</span>
                    Luxury Interior Designer from Lucknow
                </p>

                {/* Quote Card - Solid background instead of glass */}
                <div className="bg-bg-secondary/80 p-6 rounded-xl border border-gold-muted/20">
                    <svg className="w-8 h-8 text-gold-primary/40 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote>
                        <p className="font-display text-xl text-text-light leading-relaxed mb-4">
                            True luxury is not about excess, but about creating spaces that nurture the
                            <span className="gold-gradient-text"> soul</span>.
                        </p>
                        <p className="text-text-muted text-sm">
                            Every design we craft is a reflection of our commitment to excellence.
                        </p>
                    </blockquote>
                </div>

                {/* Simple line */}
                <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gold-muted/50 to-transparent max-w-xs mx-auto" />
            </div>
        </section>
    )
}
