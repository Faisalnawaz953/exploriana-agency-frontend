import { useLayoutEffect, useState } from 'react'

interface windowSize {
    height: number
    width: number
}

export default function useWindowSize() {

    const [size, setSize] = useState<windowSize>({
        height: 0,
        width: 0,
    });

    useLayoutEffect(() => {

        const updateSize = () => {
            setSize({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }

        window.addEventListener('resize', updateSize)
        
        updateSize()

        return () => window.removeEventListener('resize', updateSize)
        
    }, [])
    
    return size;
}