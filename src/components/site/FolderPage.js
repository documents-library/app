import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import Layout from '../../components/Layout'
import Folder, {FolderWrapper} from '../../components/Folder'
import {capitalizeFirstLetter} from '../../helpers/format'
import {CopyUrlButton} from '../../components/site/FilePage'

import RRContext from '@s-ui/react-router/lib/ReactRouterContext'

export default function FolderPage({site, folder}) {
  const {router} = useContext(RRContext)
  const {files, currentFolder} = folder

  return (
    <Layout
      title={capitalizeFirstLetter(currentFolder.name)}
      onGoBack={() =>
        router.push({
          pathname: `/${site.organizationName}/${site.name}/`,
          query: {folderId: currentFolder.parents[0]}
        })
      }
      meta={{
        ogType: 'website',
        title: `${currentFolder.name} | ${site.name || 'Documents Library'}`,
        description: `${site.organizationName}`,
        siteName: 'documents.li'
      }}
      actions={<CopyUrlButton />}
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
