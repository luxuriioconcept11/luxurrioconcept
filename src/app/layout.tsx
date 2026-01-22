import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
import SafariDetector from '@/components/SafariDetector'

// Dynamic import - FloatingSocials only appears on scroll, not needed for initial render
const FloatingSocials = dynamic(() => import('@/components/FloatingSocials'), {
    ssr: false
})

export const metadata: Metadata = {
    title: 'Luxuriio Concept | A Complete Interior Designing Solution',
    description: 'Experience luxury interior design that reveals, not explains. Premium spaces crafted with precision and elegance.',
    keywords: 'luxury interior design, premium interiors, home design, luxury living spaces',
    openGraph: {
        title: 'Luxuriio Concept | Luxury Interior Design',
        description: 'Experience luxury interior design that reveals, not explains.',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </head>
            <body className="bg-bg-primary text-text-light antialiased">
                <SafariDetector />
                <FloatingSocials />
                {children}
            </body>
        </html>
    )
}
