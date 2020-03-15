import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'

import Layout from '../../components/Layout'
import Folder, {FolderWrapper} from '../../components/Folder'
import WelcomeSection from './WelcomeSection'

export default function SiteHomePage({site, folder}) {
  const {files, currentFolder} = folder

  return (
    <Layout
      title={currentFolder.name}
      onGoBack={() =>
        Router.push({
          pathname: `/${site.organizationName}`
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
          <Folder site={site} folder={folder} />
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
  site: PropTypes.object,
  folder: PropTypes.object
}
