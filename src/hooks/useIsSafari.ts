import { useEffect, useState } from 'react'

export function useIsSafari() {
    const [isSafari, setIsSafari] = useState(false)

    useEffect(() => {
        // Robust detection for Safari Mobile
        const ua = navigator.userAgent.toLowerCase()
        const isSafariBrowser = ua.indexOf('safari') > -1 && ua.indexOf('chrome') === -1
        setIsSafari(isSafariBrowser)

        if (isSafariBrowser) {
            document.body.classList.add('is-safari')
        }
    }, [])

    return isSafari
}
