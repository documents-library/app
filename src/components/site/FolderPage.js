import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'

import Layout from '../../components/Layout'
import Folder, { FolderWrapper } from '../../components/Folder'

export default function FolderPage({ site, folder }) {
  const { files, currentFolder } = folder

  return (
    <Layout
      title={currentFolder.name}
      onGoBack={() =>
        Router.push({
          pathname: `/${site.organizationName}/${site.name}/`,
          query: { folderId: currentFolder.parents[0] }
        })
      }
    >
      {files.length > 0 ? (
        <Folder site={site} folder={folder} />
      ) : (
        <FolderWrapper>
          <p>Esta carpeta está vacía</p>
        </FolderWrapper>
      )}
    </Layout>
  )
}

FolderPage.propTypes = {
  site: PropTypes.object,
  folder: PropTypes.object
}
