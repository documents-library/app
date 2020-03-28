import React, {useContext} from 'react'
import {organization, site, folder} from '../../helpers/prop-types'

import Layout from '../../components/Layout'
import Folder, {FolderWrapper} from '../../components/Folder'
import {capitalizeFirstLetter} from '../../helpers/format'
import {CopyUrlButton} from '../../components/site/FilePage'
import WelcomeSection from './WelcomeSection'

import RRContext from '@s-ui/react-router/lib/ReactRouterContext'

export default function FolderPage({organization, site, folder}) {
  const {router} = useContext(RRContext)

  const {files, currentFolder, isRepoHomePage, previousPagePathname} = folder

  const title = isRepoHomePage
    ? `${capitalizeFirstLetter(currentFolder.name)} | Documents Library`
    : `${capitalizeFirstLetter(currentFolder.name)} | ${site.name ||
        'Documents Library'}`

  return (
    <Layout
      title={capitalizeFirstLetter(currentFolder.name)}
      onGoBack={() => router.push({pathname: previousPagePathname})}
      meta={{
        ogType: 'website',
        title,
        description: `${site.organizationName}`,
        siteName: 'documents.li'
      }}
      actions={isRepoHomePage ? <CopyUrlButton /> : null}
      elvateOnScroll={isRepoHomePage}
    >
      <>
        {isRepoHomePage && (
          <WelcomeSection title={site.longName} subtitle={site.description} />
        )}

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

FolderPage.propTypes = {
  organization,
  site,
  folder
}
