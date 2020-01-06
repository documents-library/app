import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

export default function FileItem({ site, data }) {
  return (
    <Link
      href={{
        pathname: `/${site.organizationName}/${site.name}/`,
        query: { fileId: data.id }
      }}
    >
      <a>file: {data.name}</a>
    </Link>
  )
}

FileItem.propTypes = {
  site: PropTypes.object,
  data: PropTypes.object
}

