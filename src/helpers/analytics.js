import {useEffect} from 'react'

export function useGAPageView({pathname}) {
  useEffect(() => {
    window.ga('send', 'pageview', pathname)
  }, []) // eslint-disable-line
}
