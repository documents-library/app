import React, {useContext} from 'react'
import {organization, site, folder} from '../../helpers/prop-types'

import Layout from '../../components/Layout'
import Folder, {FolderWrapper} from '../../components/Folder'
import WelcomeSection from './WelcomeSection'

import RRContext from '@s-ui/react-router/lib/ReactRouterContext'

export default function SiteHomePage({organization, site, folder}) {
  const {router} = useContext(RRContext)
  const {files, currentFolder} = folder

  return (
    <Layout
      title={currentFolder.name}
      onGoBack={() =>
        router.push({
          pathname: `/${organization.name}`
        })
      }
      meta={{
        ogType: 'website',
        title: `${currentFolder.name} | Documents Library`,
        description: 'Librería de documentos',
        siteName: 'documents.li'
      }}
      elvateOnScroll
    >
      <>
        <WelcomeSection title={site.longName} subtitle={site.description} />

        {files.length > 0 ? (
          <Folder organization={organization} site={site} folder={folder} />
        ) : (
          <FolderWrapper>
            <p>No hay contenidos todavía. Vuelve a intentarlo más tarde.</p>
          </FolderWrapper>
        )}
      </>
    </Layout>
  )
}

SiteHomePage.propTypes = {
  organization,
  site,
  folder
}
