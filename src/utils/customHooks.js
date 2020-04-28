import { useRef, useEffect } from 'react'

export function useInterval(callback, delay) {
  console.log('set timer: ', delay/1000, ' seconds')
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// source: overreacted.io
// author: Dan Abramov
// See more: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
