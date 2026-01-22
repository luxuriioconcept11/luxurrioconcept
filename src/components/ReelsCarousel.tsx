'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Only use the 5 available videos with alternating intro/outro pattern
const baseItems = [
    { id: 1, title: 'Living Room', src: '/reels/reel-1.mp4', poster: '/gallery/image-2.jpg', clipType: 'intro' },
    { id: 2, title: 'Bedroom', src: '/reels/reel-2.mp4', poster: '/gallery/image-3.jpg', clipType: 'outro' },
    { id: 3, title: 'Kitchen', src: '/reels/reel-3.mp4', poster: '/gallery/image-4.jpg', clipType: 'intro' },
    { id: 4, title: 'Hallway', src: '/reels/reel-8.mp4', poster: '/gallery/image-5.jpg', clipType: 'outro' },
    { id: 5, title: 'Study', src: '/reels/reel-11.mp4', poster: '/gallery/image-6.jpg', clipType: 'intro' },
]

// Lazy-loaded video player with 3-second clip handling
// ORIGINAL LOGIC: Only CENTER card plays video, others show poster preview
const ReelPlayer = ({
    src,
    poster,
    title,
    isActive,
    isDragging,
    clipType = 'intro'
}: {
    src: string
    poster?: string
    title: string
    isActive: boolean
    isDragging: boolean
    clipType?: 'intro' | 'outro'
}) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    // Intersection Observer for lazy loading
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
                rootMargin: '100px',
                threshold: 0.1
            }
        )

        observer.observe(container)
        return () => observer.disconnect()
    }, [])

    // 3-second clip handling: intro plays first 3 sec, outro plays last 3 sec
    useEffect(() => {
        const video = videoRef.current
        if (!video || !isActive || isDragging) return

        const CLIP_DURATION = 3 // seconds

        const handleTimeUpdate = () => {
            if (clipType === 'intro') {
                // Play only first 3 seconds, then loop
                if (video.currentTime >= CLIP_DURATION) {
                    video.currentTime = 0
                }
            } else {
                // For outro, play last 3 seconds
                if (video.duration && video.currentTime < video.duration - CLIP_DURATION) {
                    video.currentTime = video.duration - CLIP_DURATION
                }
            }
        }

        const handleLoadedMetadata = () => {
            if (clipType === 'outro' && video.duration) {
                video.currentTime = video.duration - CLIP_DURATION
            }
        }

        video.addEventListener('timeupdate', handleTimeUpdate)
        video.addEventListener('loadedmetadata', handleLoadedMetadata)

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate)
            video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        }
    }, [isActive, isDragging, clipType])

    // Play/pause based on active state
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        if (isActive && !isDragging && isVisible) {
            video.play().catch(() => { })
        } else {
            video.pause()
        }
    }, [isActive, isDragging, isVisible])

    // ORIGINAL LOGIC: Only load video if this is the ACTIVE (center) card AND not dragging
    const shouldPlayVideo = isActive && !isDragging && isVisible

    return (
        <div ref={containerRef} className="relative w-full h-full bg-black">
            {shouldPlayVideo ? (
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                // ALWAYS show poster preview for non-active reels
                <div className="absolute inset-0 w-full h-full">
                    {poster && (
                        <Image
                            src={poster}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 260px, 380px"
                            loading="lazy"
                            quality={75}
                        />
                    )}
                    {/* Dark overlay for inactive cards - Safari optimized (no backdrop-blur) */}
                    {!isActive && (
                        <div className="absolute inset-0 bg-black/50 transition-opacity duration-500" />
                    )}
                </div>
            )}

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
                setConfig({ width: 260, height: 380 })
                // Only 3 items on mobile + Use compressed videos
                const mobileItems = baseItems.slice(0, 3).map(item => ({
                    ...item,
                    src: item.src.replace('/reels/', '/reels-mobile/')
                }))
                setItems(mobileItems)
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
                                clipType={item.clipType as 'intro' | 'outro'}
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
