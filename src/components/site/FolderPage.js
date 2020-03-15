import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'

import Layout from '../../components/Layout'
import Folder, { FolderWrapper } from '../../components/Folder'
import { capitalizeFirstLetter } from '../../helpers/format'

export default function FolderPage({ site, folder }) {
  const { files, currentFolder } = folder

  return (
    <Layout
      title={capitalizeFirstLetter(currentFolder.name)}
      onGoBack={() =>
        Router.push({
          pathname: `/${site.organizationName}/${site.name}/`,
          query: { folderId: currentFolder.parents[0] }
        })
      }
      meta={{
        ogType: 'website',
        title: `${currentFolder.name} | Documents Library`,
        description: `${site.organizationName} - ${site.name}`,
        siteName: 'documents.li'
      }}
    >
      {files.length > 0 ? (
        <Folder site={site} folder={folder} />
      ) : (
        <FolderWrapper>
          <p>Esta sección está vacía. Vuelve a intentarlo más tarde.</p>
        </FolderWrapper>
      )}
    </Layout>
  )
}

FolderPage.propTypes = {
  site: PropTypes.object,
  folder: PropTypes.object
}
