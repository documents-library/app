import React from 'react'
import PropTypes from 'prop-types'

import SuiLink from '@s-ui/react-router/lib/Link'

export default function Link({to, children, ...rest}) {
  const disabled = false
  // const [disabled, setDisabled] = useState(false)
  // const isOnline = navigator.onLine
  //
  // useEffect(() => {
  //   if (isOnline) return
  //
  //   async function hasLinkInCache() {
  //     try {
  //       const cache = await caches.open(window.documentsLi?.cacheName ?? '')
  //       const cachedLink = await cache.match(to.pathname)
  //       const hasCachedLink = Boolean(cachedLink)
  //
  //       console.log('cacheLink: ', cachedLink, 'hasCachedLink: ', hasCachedLink)
  //
  //       setDisabled(!hasCachedLink)
  //     } catch (e) {
  //       console.log('get cache error: ', e) // eslint-disable-line
  //     }
  //   }
  //
  //   hasLinkInCache()
  // }, [isOnline, to.pathname])

  function renderChildren() {
    if (typeof children === 'function') {
      return children({disabled})
    }

    return React.cloneElement(children, {disabled})
  }

  if (!disabled)
    return (
      <SuiLink to={to} {...rest}>
        {renderChildren()}
      </SuiLink>
    )

  return <>{renderChildren()}</>
}

Link.propTypes = {
  to: PropTypes.shape({pathname: PropTypes.string}),
  children: PropTypes.node
}
