'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function EntryLogo() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [animationComplete, setAnimationComplete] = useState(false)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    })

    const scale = useTransform(scrollYProgress, [0, 0.5], [1.1, 0.6])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            if (latest > 0.5 && !animationComplete) {
                setAnimationComplete(true)
            }
        })
        return () => unsubscribe()
    }, [scrollYProgress, animationComplete])

    return (
        <section
            ref={containerRef}
            className="relative h-[200vh] w-full"
        >
            {/* Sticky Logo Container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-bg-primary">
                <motion.div
                    style={{
                        scale,
                        opacity,
                        y,
                        willChange: animationComplete ? 'auto' : 'transform, opacity'
                    }}
                    className="relative z-10 flex flex-col items-center px-4"
                >
                    {/* Logo + Text in Line */}
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        {/* Text Content - Centered */}
                        <div className="text-center">
                            {/* Brand Name */}
                            <motion.h1
                                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wide overflow-hidden leading-tight"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                                    }
                                }}
                            >
                                {/* LUXURIIO */}
                                <span className="block md:inline-block gold-gradient-text font-semibold mx-auto md:mr-4 mb-2 md:mb-0">
                                    {Array.from("LUXURIIO").map((char, index) => (
                                        <motion.span
                                            key={`lux-${index}`}
                                            className="inline-block"
                                            variants={{
                                                hidden: { y: 100, opacity: 0 },
                                                visible: {
                                                    y: 0,
                                                    opacity: 1,
                                                    transition: {
                                                        type: "spring",
                                                        damping: 12,
                                                        stiffness: 100
                                                    }
                                                }
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>

                                {/* CONCEPT */}
                                <span className="block md:inline-block text-text-light font-light mx-auto">
                                    {Array.from("CONCEPT").map((char, index) => (
                                        <motion.span
                                            key={`con-${index}`}
                                            className="inline-block"
                                            variants={{
                                                hidden: { y: 100, opacity: 0 },
                                                visible: {
                                                    y: 0,
                                                    opacity: 1,
                                                    transition: {
                                                        type: "spring",
                                                        damping: 12,
                                                        stiffness: 100
                                                    }
                                                }
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>
                            </motion.h1>

                            {/* Tagline */}
                            <motion.p
                                className="text-gold-muted text-xs sm:text-base md:text-lg lg:text-xl uppercase mt-4 md:mt-6 max-w-[280px] sm:max-w-none mx-auto leading-relaxed"
                                initial={{ opacity: 0, y: 20, letterSpacing: "0.1em" }}
                                animate={{ opacity: 1, y: 0, letterSpacing: "0.2em" }}
                                transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
                            >
                                A Complete Interior Designing Solution
                            </motion.p>
                        </div>
                    </div>

                    {/* Decorative Line */}
                    <motion.div
                        className="mt-8 md:mt-12 h-px w-32 md:w-48 bg-gradient-to-r from-transparent via-gold-primary to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    />

                    {/* Social Icons Row */}
                    <motion.div
                        className="flex items-center gap-6 md:gap-8 mt-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1, delayChildren: 1.8 }
                            }
                        }}
                    >
                        {[
                            {
                                name: 'Phone',
                                href: 'tel:+919695765696',
                                icon: <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.8-6.62-6.63l1.97-1.57c.23-.24.31-.56.25-.87-.35-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.43 3 4.06 3 4.93c0 9.29 7.57 16.82 16.83 16.82.87 0 1.5-.65 1.5-1.19v-3.75c0-.55-.45-1-.99-1H20.01z" />
                            },
                            {
                                name: 'WhatsApp',
                                href: 'https://wa.me/919695765696',
                                icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            },
                            {
                                name: 'Email',
                                href: 'mailto:luxuriioconcept@gmail.com',
                                icon: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            },
                            {
                                name: 'Instagram',
                                href: 'https://www.instagram.com/luxuriio.concept?igsh=MWZxajZhbjg0eTUydA==',
                                icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            }
                        ].map((social, index) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold-muted hover:text-gold-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: { y: 0, opacity: 1 }
                                }}
                                whileHover={{ scale: 1.2, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    {social.icon}
                                </svg>
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                    style={{ opacity }}
                >

                    <svg
                        className="w-6 h-6 text-gold-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </motion.div>

                {/* Ambient Glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[150px]" />
                </div>
            </div>
        </section>
    )
}
