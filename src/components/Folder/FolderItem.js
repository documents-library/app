import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

export default function FolderItem({ site, data }) {
  return (
    <Link
      href={{
        pathname: `/${site.organizationName}/${site.name}/`,
        query: { folderId: data.id }
      }}
    >
      <a>folder: {data.name}</a>
    </Link>
  )
}

FolderItem.propTypes = {
  site: PropTypes.object,
  data: PropTypes.object
}
