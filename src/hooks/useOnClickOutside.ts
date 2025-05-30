import { useEffect } from 'react'
import type { RefObject } from 'react'
/**
 * Custom hook to handle clicks outside a specified element.
 * @param ref - Ref object pointing to the element to monitor for outside clicks.
 * @param handler - Function to call when an outside click is detected.
 */

export function useOnClickOutside(ref: RefObject<HTMLDivElement | null>, handler: () => void) {
    useEffect(() => {
        const handleOutsideEvent = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler()
            }
        }

        document.addEventListener('mousedown', handleOutsideEvent)
        return () => document.removeEventListener('mousedown', handleOutsideEvent)
    }, [ref, handler])
}