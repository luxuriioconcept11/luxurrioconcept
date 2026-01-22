'use client'

import { useEffect } from 'react'

export default function VisibilityEnforcer() {
    useEffect(() => {
        // "The Hammer": Force browser to acknowledge content rendering
        // 1. Mark as loaded immediately
        // 2. Add a stabilization class after a short delay

        const enforceVisibility = () => {
            document.body.classList.add('app-loaded')

            // Mark in storage so next reload is faster/stable
            sessionStorage.setItem('luxurrioconcept_loaded', 'true')

            // After animations likely finished, lock visibility
            setTimeout(() => {
                document.body.classList.add('app-stabilized')
            }, 3000)
        }

        // Run immediately
        enforceVisibility()

        // Also run on scroll to ensure it sticks
        const handleScroll = () => {
            if (!document.body.classList.contains('app-loaded')) {
                enforceVisibility()
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return null
}
