'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function FounderSection() {
    return (
        <section className="relative py-24 md:py-40 px-4 sm:px-6 lg:px-8 bg-bg-primary overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-primary/3 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-muted/5 rounded-full blur-[150px]" />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Founder Image */}
                    <motion.div
                        className="relative order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] mx-auto cursor-pointer"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="absolute inset-0 rounded-full border-2 border-gold-primary/30 animate-pulse-slow"></div>
                            <div className="absolute inset-2 rounded-full border border-gold-primary/20"></div>
                            <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl shadow-gold-primary/10 group">
                                <Image
                                    src="/img/founder.jpg"
                                    alt="Yash Bhagwani - Founder of Luxuriio Concept"
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gold-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                            {/* Gold Accent Dots */}
                            <div className="absolute -top-2 right-8 w-4 h-4 bg-gold-primary rounded-full" />
                            <div className="absolute -bottom-2 left-12 w-3 h-3 bg-gold-hover rounded-full" />
                            <div className="absolute top-1/3 -left-3 w-2 h-2 bg-gold-muted rounded-full" />
                        </motion.div>

                        {/* Founder Info - Moved Below Image */}
                        <motion.div
                            className="text-center mt-8 relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <p className="text-gold-primary font-display text-2xl md:text-3xl text-glow-neon mb-2">
                                Yash Bhagwani
                            </p>
                            <p className="text-text-muted">
                                <span className="gold-gradient-text font-medium text-lg block mb-1">Founder, Luxuriio Concept</span>
                                <span className="block text-sm opacity-80">Luxury Interior Designer from Lucknow</span>
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Message Content */}
                    <motion.div
                        className="order-1 lg:order-2 text-center lg:text-left"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.div
                            className="glass-card p-8 md:p-12 rounded-2xl relative overflow-hidden cursor-pointer hover:border-gold-primary/50 transition-colors duration-300"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212,175,55,0.2)" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            {/* Ambient Glow inside card */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold-primary/10 rounded-full blur-3xl" />

                            {/* Quote Mark */}
                            <motion.div
                                className="inline-block mb-6 relative z-10"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <svg className="w-12 h-12 md:w-16 md:h-16 text-gold-primary/40" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                            </motion.div>

                            {/* Founder Quote */}
                            <blockquote className="mb-8 relative z-10">
                                <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-text-light leading-tight mb-6">
                                    True luxury is not about excess, but about creating spaces that nurture the
                                    <span className="gold-gradient-text"> soul</span>.
                                </p>
                                <p className="text-text-muted text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    Every design we craft is a reflection of our commitment to excellence.
                                    We don't just create interiors — we create experiences that transform the way you live.
                                </p>
                            </blockquote>

                        </motion.div>

                        {/* Decorative Line */}
                        <motion.div
                            className="mt-8 h-px bg-gradient-to-r from-transparent via-gold-muted/50 to-transparent max-w-md mx-auto lg:mx-0"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.6 }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Ambient Gold Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gold-primary/30 rounded-full"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 3) * 20}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>
        </section>
    )
}
