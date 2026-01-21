import type { Metadata } from 'next'
import './globals.css'
import FloatingSocials from '@/components/FloatingSocials'

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
                <FloatingSocials />
                {children}
            </body>
        </html>
    )
}
