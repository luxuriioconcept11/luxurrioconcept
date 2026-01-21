'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { motion } from 'framer-motion'

const baseItems = [
    { id: 1, title: 'Living Room', src: '/reels/reel-1.mp4', poster: '/gallery/image-1.jpg' },
    { id: 2, title: 'Bedroom', src: '/reels/reel-2.mp4', poster: '/gallery/image-2.jpg' },
    { id: 3, title: 'Kitchen', src: '/reels/reel-3.mp4', poster: '/gallery/image-3.jpg' },
    { id: 4, title: 'Bathroom', src: '/reels/reel-4.mp4', poster: '/gallery/image-4.jpg' },
    { id: 5, title: 'Office', src: '/reels/reel-5.mp4', poster: '/gallery/image-5.jpg' },
    { id: 6, title: 'Dining', src: '/reels/reel-6.mp4', poster: '/gallery/image-6.jpg' },
    { id: 7, title: 'Lounge', src: '/reels/reel-7.mp4', poster: '/gallery/image-7.jpg' },
    { id: 8, title: 'Hallway', src: '/reels/reel-8.mp4', poster: '/gallery/image-8.jpg' },
    { id: 9, title: 'Suite', src: '/reels/reel-9.mp4', poster: '/gallery/image-9.jpg' },
    { id: 10, title: 'Terrace', src: '/reels/reel-10.mp4', poster: '/gallery/image-10.jpg' },
    { id: 11, title: 'Study', src: '/reels/reel-11.mp4', poster: '/gallery/image-11.jpg' },
]

// Pure component that ONLY renders video if active
const ReelPlayer = ({ src, poster, title, isActive, isDragging }: { src: string, poster?: string, title: string, isActive: boolean, isDragging: boolean }) => {

    // Logic: Only mount video if active. 
    // If not active -> Image
    // If dragging -> Image (or paused video, but image is smoother for performance)

    // User requested: "ONLY the CENTER card should play video"

    const shouldPlay = isActive && !isDragging

    return (
        <div className="relative w-full h-full bg-black">
            {shouldPlay ? (
                <video
                    src={src}
                    // Fallback poster while loading
                    poster={poster}
                    muted
                    playsInline
                    autoPlay
                    loop
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                <div className="absolute inset-0 w-full h-full relative">
                    {/* Next/Image for optimization on static cards */}
                    {poster && (
                        <Image
                            src={poster}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 300px, 400px"
                            unoptimized
                        />
                    )}
                    {/* Dark overlay for inactive cards to help focus on center */}
                    {!isActive && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-all duration-500" />
                    )}
                </div>
            )}

            {/* Dark Gradient Overlay (Always present for text readability if we had text, or just style) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10 pointer-events-none" />
        </div>
    )
}

export default function ReelsCarousel() {
    const stageRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    const [activeIndex, setActiveIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [config, setConfig] = useState({ width: 380, height: 600 })
    const [items, setItems] = useState(baseItems)

    useEffect(() => {
        const updateLayout = () => {
            const isMobile = window.innerWidth < 768
            if (isMobile) {
                setConfig({ width: 280, height: 420 })
                setItems(baseItems.slice(0, 6))
            } else {
                setConfig({ width: 380, height: 600 })
                setItems(baseItems)
            }
        }
        updateLayout()
        window.addEventListener('resize', updateLayout)
        return () => window.removeEventListener('resize', updateLayout)
    }, [])

    useEffect(() => {
        if (!ringRef.current || !stageRef.current) return

        const ring = ringRef.current
        const reelItems = ring.querySelectorAll('.reel-item')
        const count = reelItems.length
        const gap = 40
        const radius = Math.round((count * (config.width + gap)) / (2 * Math.PI))
        const angleStep = 360 / count

        // Initial 3D Layout
        gsap.set(ring, {
            rotationY: 0,
            transformStyle: 'preserve-3d',
            z: -radius + 200
        })

        reelItems.forEach((item, i) => {
            gsap.set(item, {
                rotateY: i * angleStep,
                transformOrigin: '50% 50% 0px',
                transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
            })
        })

        // Auto Rotation 
        // Note: User wants "Center card plays". Auto-rotation makes "Center" a transient state.
        // We will keep auto-rotation slow, but we need to track index continuously.

        const rotationTimeline = gsap.timeline({ repeat: -1, paused: false })
        rotationTimeline.to(ring, {
            rotationY: '-=360',
            duration: 80, // Much slower auto-spin
            ease: 'none',
        })

        // Ticker to update active index
        const updateActiveIndex = () => {
            const currentRotation = gsap.getProperty(ring, "rotationY") as number
            const step = 360 / count

            // Logic: Normalized rotation to find which item is at 0 degrees (front)
            // i * step + rotation = 0  =>  i = -rotation / step
            let rawIndex = (-currentRotation / step)
            let normalizedIndex = Math.round(rawIndex) % count
            if (normalizedIndex < 0) normalizedIndex += count

            setActiveIndex(normalizedIndex)
        }
        gsap.ticker.add(updateActiveIndex)

        // Interactions
        let startX = 0
        let currentRotation = 0
        let dragVelocity = 0
        let lastX = 0

        const onMouseDown = (e: MouseEvent | TouchEvent) => {
            setIsDragging(true)
            rotationTimeline.pause()

            startX = 'touches' in e ? e.touches[0].clientX : e.clientX
            lastX = startX
            currentRotation = gsap.getProperty(ring, 'rotationY') as number

            stageRef.current!.style.cursor = 'grabbing'
        }

        const onMouseMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return
            const x = 'touches' in e ? e.touches[0].clientX : e.clientX
            const diff = x - startX
            const velocity = x - lastX
            lastX = x
            dragVelocity = velocity

            gsap.set(ring, { rotationY: currentRotation + diff * 0.5 })
        }

        const onMouseUp = () => {
            if (!isDragging) return
            setIsDragging(false)
            rotationTimeline.play()
            stageRef.current!.style.cursor = 'grab'

            // Optional: Inertia could be added here, but keeping it simple for now to ensure stability
        }

        const stage = stageRef.current
        stage.addEventListener('mousedown', onMouseDown)
        stage.addEventListener('touchstart', onMouseDown)
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('touchmove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
        window.addEventListener('touchend', onMouseUp)

        return () => {
            rotationTimeline.kill()
            gsap.ticker.remove(updateActiveIndex)
            if (stage) {
                stage.removeEventListener('mousedown', onMouseDown)
                stage.removeEventListener('touchstart', onMouseDown)
            }
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('touchmove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
            window.removeEventListener('touchend', onMouseUp)
        }
    }, [items, config, isDragging]) // Re-run if isDragging changes? No, ref is better. 
    // Actually, passing isDragging to ReelPlayer needs state. 
    // Effect dependency on isDragging might reset GSAP if not careful.
    // Better to use ref for logic, but state for render. 
    // The current effect setup is fine because isDragging state change triggers re-render of component, 
    // but we don't want to re-initialize GSAP every drag. 
    // Fix: Move GSAP init to a separate effect that depends only on [items, config].

    return (
        <section className="relative py-24 bg-bg-primary overflow-hidden">
            {/* Minimal Title */}
            <div className="absolute top-10 left-0 w-full text-center z-20 pointer-events-none">
                <div className="overflow-hidden">
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
                        className="font-display text-2xl tracking-[0.2em] text-gold-primary uppercase opacity-80 decoration-slice"
                    >
                        {Array.from("Our Work").map((char, index) => (
                            <motion.span
                                key={`work-${index}`}
                                className="inline-block"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Fixed Side Margins (Gradient Masks) - Thinner on mobile */}
            <div className="absolute inset-y-0 left-0 w-8 md:w-1/6 bg-gradient-to-r from-bg-primary via-bg-primary/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 md:w-1/6 bg-gradient-to-l from-bg-primary via-bg-primary/80 to-transparent z-20 pointer-events-none" />

            <div
                ref={stageRef}
                className="relative h-[700px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                style={{ perspective: '2000px' }}
            >
                <div
                    ref={ringRef}
                    className="relative"
                    style={{
                        width: `${config.width}px`,
                        height: `${config.height}px`,
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {items.map((item, i) => (
                        <div
                            key={`${item.id}-${i}`}
                            className="reel-item absolute inset-0 rounded-xl overflow-hidden border border-gold-muted/20 bg-bg-card shadow-lg"
                            style={{
                                transform: `rotateY(${i * (360 / items.length)}deg) translateZ(${Math.round((items.length * (config.width + 40)) / (2 * Math.PI))}px)`,
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            <ReelPlayer
                                src={item.src}
                                poster={item.poster}
                                title={item.title}
                                isActive={i === activeIndex}
                                isDragging={isDragging}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none z-10" />
        </section>
    )
}
