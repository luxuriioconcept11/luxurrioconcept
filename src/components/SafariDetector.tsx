'use client'

import { useIsSafari } from '@/hooks/useIsSafari'

export default function SafariDetector() {
    useIsSafari() // This hook handles the class injection
    return null
}
