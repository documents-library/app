import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-unfetch'

import SiteHomePage from '../../../components/site/SiteHomePage'
import FolderPage from '../../../components/site/FolderPage'
import FilePage from '../../../components/site/FilePage'

// Site main page
export default function Site({ site, isSiteMainPage, folder, fileId }) {
  if (!site) {
    return <p>{`404: the site not belong to the current organization`}</p>
  } else if (isSiteMainPage) {
    return <SiteHomePage site={site} folder={folder} />
  } else if (fileId) {
    return <FilePage site={site} folder={folder} />
  } else if (folder.kind === 'drive#fileList') {
    return <FolderPage site={site} folder={folder} />
  } else {
    return <p>{`Can't get the data`}</p>
  }
}

Site.propTypes = {
  site: PropTypes.object,
  isSiteMainPage: PropTypes.bool,
  folder: PropTypes.object
}

Site.getInitialProps = async ctx => {
  console.log(ctx.query)
  const { organization, site: siteName, folderId, fileId } = ctx.query
  const res = await fetch(`http://localhost:8080/sites/${siteName}`)
  const { site } = await res.json()
  // TODO: add organizations to BE
  const siteMockedOrgnName = {
    ...site,
    organizationName: 'taller@'
  }

  let folder = null
  if (folderId) {
    // TODO: check if the folder is a children of the main folder id
    // Probably I need to do this on the BE
    const getFolder = await fetch(`http://localhost:8080/folders/${folderId}`)
    folder = await getFolder.json()
  }

  // Check that hhe site belongs to the current org
  // This validation must be added on the backend request
  if (siteMockedOrgnName.organizationName !== organization) {
    return {}
  } else {
    return {
      site: siteMockedOrgnName,
      isSiteMainPage:
        (!folderId && !fileId) || site.googleFolderId === folderId,
      folder,
      fileId
    }
  }
}
