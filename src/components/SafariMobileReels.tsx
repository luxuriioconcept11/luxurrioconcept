'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// Props interface matching the parent ReelsCarousel
interface ReelItem {
    id: number
    title: string
    src: string
    poster: string
}

export default function SafariMobileReels({ items }: { items: ReelItem[] }) {
    const [playingId, setPlayingId] = useState<number | null>(null)

    // Handle play request - strictly one video at a time
    const handlePlay = (id: number) => {
        setPlayingId(id)
    }

    return (
        <div className="w-full h-[60vh] flex items-center justify-center py-10">
            {/* Horizontal Snap Scroll Container */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-8 w-full h-full items-center no-scrollbar pb-8">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="relative flex-shrink-0 w-[260px] h-[380px] snap-center rounded-2xl overflow-hidden bg-black/40 border border-white/10"
                    >
                        {/* 1. Poster Image (Always visible initially) */}
                        <div className={`absolute inset-0 transition-opacity duration-300 ${playingId === item.id ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            <Image
                                src={item.poster}
                                alt={item.title}
                                fill
                                className="object-cover"
                                sizes="260px"
                            />

                            {/* Play Button Overlay */}
                            <button
                                onClick={() => handlePlay(item.id)}
                                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                            >
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-gold-primary/30 flex items-center justify-center group">
                                    <svg
                                        className="w-8 h-8 text-gold-primary ml-1 group-hover:scale-110 transition-transform"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </button>

                            {/* Title (Only on poster) */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-gold-primary font-display text-lg tracking-wide">{item.title}</h3>
                            </div>
                        </div>

                        {/* 2. Video Player (Only rendered when clicked) */}
                        {playingId === item.id && (
                            <div className="absolute inset-0 bg-black">
                                <video
                                    src={item.src}
                                    className="w-full h-full object-cover"
                                    controls
                                    autoPlay
                                    playsInline
                                    webkit-playsinline="true"
                                />
                                {/* Close button to stop playback */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); setPlayingId(null); }}
                                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white/80"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
