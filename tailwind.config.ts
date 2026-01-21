import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'bg-primary': '#10130E',
                'bg-secondary': '#243027',
                'bg-card': '#373F3C',
                'gold-primary': '#E5DB96',
                'gold-hover': '#BDA85B',
                'gold-muted': '#7B7145',
                'text-light': '#F5F5F0',
                'text-muted': '#B7B7A4',
            },
            fontFamily: {
                'display': ['Playfair Display', 'serif'],
                'body': ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out forwards',
                'scale-in': 'scaleIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(1.2)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(229, 219, 150, 0.3)' },
                    '100%': { boxShadow: '0 0 40px rgba(229, 219, 150, 0.6)' },
                },
            },
        },
    },
    plugins: [],
}
export default config
