'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'

const socials = [
    {
        name: 'Phone',
        href: 'tel:+919695765696',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.8-6.62-6.63l1.97-1.57c.23-.24.31-.56.25-.87-.35-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.43 3 4.06 3 4.93c0 9.29 7.57 16.82 16.83 16.82.87 0 1.5-.65 1.5-1.19v-3.75c0-.55-.45-1-.99-1H20.01z" />
            </svg>
        ),
    },
    {
        name: 'Email',
        href: 'mailto:luxuriioconcept@gmail.com',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
        ),
    },
    {
        name: 'WhatsApp',
        href: 'https://wa.me/919695765696',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/luxuriio.concept?igsh=MWZxajZhbjg0eTUydA==',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    }
]

// Hero icon names in the order they appear in EntryLogo
const heroIconOrder = ['Phone', 'WhatsApp', 'Email', 'Instagram']

export default function FloatingSocials() {
    // Phase 0: Hidden (on Hero)
    // Phase 1: Floating (Scrolled past Hero)
    // Phase 2: Merging (Near Footer)
    // Phase 3: Hidden (Merged)

    const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0)
    const [heroPositions, setHeroPositions] = useState<{ [key: string]: { x: number, y: number } }>({})
    const [footerPositions, setFooterPositions] = useState<{ [key: string]: { x: number, y: number } }>({})
    const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })
    const hasAnimatedRef = useRef(false)

    // Capture hero icon positions on mount
    useEffect(() => {
        const captureHeroPositions = () => {
            const positions: { [key: string]: { x: number, y: number } } = {}

            // The hero icons in EntryLogo are inside anchor tags
            // We'll find them by looking for SVGs in the hero section
            const heroSection = document.querySelector('section')
            if (heroSection) {
                const heroIcons = heroSection.querySelectorAll('a[href^="tel"], a[href^="mailto"], a[href^="https://wa.me"], a[href*="instagram"]')

                heroIcons.forEach((icon, index) => {
                    const rect = icon.getBoundingClientRect()
                    const name = heroIconOrder[index] || socials[index]?.name
                    if (name) {
                        positions[name] = {
                            x: rect.left + rect.width / 2 - 20, // Center of icon
                            y: rect.top + rect.height / 2 - 20
                        }
                    }
                })
            }

            // Fallback: center of screen
            if (Object.keys(positions).length === 0) {
                socials.forEach((social, index) => {
                    positions[social.name] = {
                        x: windowSize.width / 2 - 20 + (index - 1.5) * 50,
                        y: windowSize.height / 2
                    }
                })
            }

            setHeroPositions(positions)
        }

        // Delay to ensure DOM is ready
        setTimeout(captureHeroPositions, 500)

        window.addEventListener('resize', captureHeroPositions)
        return () => window.removeEventListener('resize', captureHeroPositions)
    }, [windowSize.width, windowSize.height])

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY

            // Show icons after scrolling just 50px (works better on mobile)
            const showThreshold = 50

            // Check footer intersection
            const footerElement = document.getElementById('footer-link-Phone')
            let isNearFooter = false

            if (footerElement) {
                const footerRect = footerElement.getBoundingClientRect()
                const triggerZone = windowSize.height - 200

                if (footerRect.top < triggerZone) {
                    isNearFooter = true
                    // Near footer - start merge
                    if (phase !== 2 && phase !== 3) {
                        const newTargets: { [key: string]: { x: number, y: number } } = {}
                        socials.forEach(social => {
                            const el = document.getElementById(`footer-link-${social.name}`)
                            if (el) {
                                const rect = el.getBoundingClientRect()
                                newTargets[social.name] = {
                                    x: rect.left,
                                    y: rect.top
                                }
                            }
                        })
                        setFooterPositions(newTargets)
                        setPhase(2)

                        setTimeout(() => {
                            setPhase(3)
                        }, 1500)
                    }
                }
            }

            // If scrolled away from footer, reset phase 2 to allow normal scroll logic
            if (!isNearFooter && phase === 2) {
                setPhase(1)
            }

            // Normal scroll logic - increased threshold to avoid hero overlap
            const heroHeight = window.innerHeight * 0.8 // Hide icons during hero view

            if (scrollY > heroHeight) {
                if (phase === 0) {
                    setPhase(1)
                    hasAnimatedRef.current = true
                } else if (phase === 3) {
                    // Coming back from footer
                    setPhase(1)
                }
            } else {
                // Scrolled back to hero - hide floating icons
                if (phase !== 0) {
                    setPhase(0)
                    hasAnimatedRef.current = false
                }
            }
        }

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        handleResize()

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)

        setTimeout(handleScroll, 200)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [phase, windowSize.height])

    if (phase === 3) return null

    // Use 500px as threshold to catch smaller phones like Galaxy S8 (360px)
    // 500-768 = small tablet, >768 = tablet/desktop
    const isSmallMobile = windowSize.width < 500
    const isMobile = windowSize.width < 768

    const iconSize = isSmallMobile ? 36 : (isMobile ? 40 : 48)
    const gap = isSmallMobile ? 44 : (isMobile ? 48 : 56)
    const rightOffset = isSmallMobile ? 6 : (isMobile ? 10 : 24)
    const totalHeight = socials.length * gap
    const startY = (windowSize.height - totalHeight) / 2

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
            <AnimatePresence mode="wait">
                {phase >= 1 && (
                    <>
                        {socials.map((social, index) => {
                            const isMerging = phase === 2
                            const footerTarget = footerPositions[social.name] || { x: 0, y: 0 }
                            const heroStart = heroPositions[social.name] || {
                                x: windowSize.width / 2 - 20,
                                y: windowSize.height / 2
                            }

                            // Resting position on right side
                            const restX = windowSize.width - iconSize - rightOffset
                            const restY = startY + (index * gap)

                            // ALL DEVICES: Fly from hero icon position to right side
                            const initialX = heroStart.x
                            const initialY = heroStart.y

                            return (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        width: iconSize,
                                        height: iconSize,
                                    }}
                                    className={clsx(
                                        "absolute flex items-center justify-center rounded-full",
                                        "bg-bg-card/95 backdrop-blur-sm border border-gold-primary/30 text-gold-primary shadow-xl",
                                        "pointer-events-auto cursor-pointer",
                                        "hover:bg-gold-primary hover:text-bg-primary transition-colors duration-300"
                                    )}
                                    initial={{
                                        x: initialX,
                                        y: initialY,
                                        opacity: 0,
                                        scale: isMobile ? 0.8 : 0.5
                                    }}
                                    animate={
                                        isMerging
                                            ? {
                                                x: footerTarget.x,
                                                y: footerTarget.y,
                                                opacity: 0,
                                                scale: 0.5
                                            }
                                            : {
                                                x: restX,
                                                y: restY,
                                                opacity: 1,
                                                scale: 1
                                            }
                                    }
                                    exit={{
                                        x: initialX,
                                        y: initialY,
                                        opacity: 0,
                                        scale: 0.5
                                    }}
                                    transition={{
                                        duration: isMerging ? 1.5 : (isSmallMobile ? 0.8 : 1.2),
                                        delay: isMerging ? 0 : index * 0.08,
                                        ease: [0.25, 0.1, 0.25, 1.0]
                                    }}
                                    whileHover={{ scale: 1.15 }}
                                >
                                    {social.icon}
                                </motion.a>
                            )
                        })}
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
