import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'

import Layout from '../../components/Layout'
import Folder from '../../components/Folder'
import WelcomeSection from './WelcomeSection'

export default function SiteHomePage({ site, folder }) {
  const { files, currentFolder } = folder

  return (
    <Layout
      title={currentFolder.name}
      onGoBack={() =>
        Router.push({
          pathname: `/${site.organizationName}`
        })
      }
      elvateOnScroll
    >
      <>
        <WelcomeSection title={site.longName} subtitle={site.description} />

        {files.length > 0 ? (
          <Folder site={site} folder={folder} />
        ) : (
          <p>The home page have not files :(</p>
        )}
      </>
    </Layout>
  )
}

SiteHomePage.propTypes = {
  site: PropTypes.object,
  folder: PropTypes.object
}
