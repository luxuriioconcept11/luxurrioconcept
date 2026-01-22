import { useEffect, useState } from 'react'

export function useIsSafari() {
    const [isSafari, setIsSafari] = useState(false)
    const [isSafariMobile, setIsSafariMobile] = useState(false)

    useEffect(() => {
        // Robust detection for Safari Mobile
        const ua = navigator.userAgent.toLowerCase()
        const isSafariBrowser = ua.indexOf('safari') > -1 && ua.indexOf('chrome') === -1
        const isMobile = /iphone|ipad|ipod/.test(ua) || (ua.includes('macintosh') && 'ontouchend' in document)

        setIsSafari(isSafariBrowser)
        setIsSafariMobile(isSafariBrowser && isMobile)

        if (isSafariBrowser) {
            document.body.classList.add('is-safari')
        }
        if (isSafariBrowser && isMobile) {
            document.body.classList.add('is-safari-mobile')
        }
    }, [])

    return { isSafari, isSafariMobile }
}
