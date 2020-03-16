import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-unfetch'

import SiteHomePage from '../components/site/SiteHomePage'
import FolderPage from '../components/site/FolderPage'
import FilePage from '../components/site/FilePage'
import {getIsCrawler} from '../helpers/fetch'

// Site main page
export default function Site({site, isSiteMainPage, folder, file, isCrawler}) {
  if (!site) {
    return <p>404: El Repositorio no pudo ser encontrado</p>
  } else if (isSiteMainPage) {
    return <SiteHomePage site={site} folder={folder} />
  } else if (file) {
    return <FilePage site={site} file={file} isCrawler={isCrawler} />
  } else if (folder.kind === 'drive#fileList') {
    return <FolderPage site={site} folder={folder} />
  } else {
    return <p>No se encuentra la información solicitada</p>
  }
}

Site.propTypes = {
  site: PropTypes.object,
  isSiteMainPage: PropTypes.bool,
  folder: PropTypes.object
}

Site.getInitialProps = async ctx => {
  try {
    const {organization, site: siteName, folderId, fileId} = ctx.query // eslint-disable-line
    const userAgent = ctx.req.headers['user-agent']
    const res = await fetch(`${process.env.API_URL}/sites/${siteName}`)
    const {site} = await res.json()
    // TODO: add organizations to BE
    const siteMockedOrgnName = {
      ...site,
      organizationName: 'taller@'
    }

    // Check that the site belongs to the current org
    // This validation must be added on the backend request
    // if (siteMockedOrgnName.organizationName !== organization) {
    //   return {}
    // }

    if (folderId || !fileId) {
      // TODO: check if the folder is a children of the main folder id
      // Probably I need to do this on the BE
      const getFolder = await fetch(
        `${process.env.API_URL}/folders/${site.name}/${folderId ||
          site.googleFolderId}`
      )
      const folder = await getFolder.json()

      return {
        site: siteMockedOrgnName,
        isSiteMainPage:
          (!folderId && !fileId) || site.googleFolderId === folderId,
        folder,
        fileId
      }
    } else if (!folderId && fileId) {
      // TODO: check if the file is a children of the main folder id
      // Probably I need to do this on the BE
      const getFile = await fetch(
        `${process.env.API_URL}/files/${site.name}/${fileId}`
      )
      const file = await getFile.json()

      return {
        site: siteMockedOrgnName,
        isSiteMainPage: false,
        folder: {},
        fileId,
        file,
        isCrawler: getIsCrawler({userAgent})
      }
    }
  } catch (err) {
    return new Error(err)
  }
}
