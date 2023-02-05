import { RefObject } from 'preact'
import { useEffect } from 'preact/hooks'

type Handler = VoidFunction

export function useOnClickOutside(elementRef: RefObject<any>, handler: Handler) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!elementRef.current?.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
}
