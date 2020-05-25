import {useEffect} from 'react'

export function useGAPageView({pathname}) {
  useEffect(() => {
    if (window && typeof window.ga === 'function')
      window.ga('send', 'pageview', pathname)
  }, []) // eslint-disable-line
}
