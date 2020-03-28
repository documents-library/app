import React, {useContext} from 'react'
import {organization, site, folder} from '../../helpers/prop-types'

import Layout from '../../components/Layout'
import Folder, {FolderWrapper} from '../../components/Folder'
import {capitalizeFirstLetter} from '../../helpers/format'
import {CopyUrlButton} from '../../components/site/FilePage'

import RRContext from '@s-ui/react-router/lib/ReactRouterContext'

export default function FolderPage({organization, site, folder}) {
  const {router} = useContext(RRContext)
  const {files, currentFolder} = folder
  const [parentFolderID] = currentFolder.parents
  debugger // eslint-disable-line

  return (
    <Layout
      title={capitalizeFirstLetter(currentFolder.name)}
      onGoBack={() =>
        router.push({
          pathname: `/${organization.name}/${site.name}/${parentFolderID}`
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
        <Folder organization={organization} site={site} folder={folder} />
      ) : (
        <FolderWrapper>
          <p>Esta sección está vacía. Vuelve a intentarlo más tarde.</p>
        </FolderWrapper>
      )}
    </Layout>
  )
}

FolderPage.propTypes = {
  organization,
  site,
  folder
}
