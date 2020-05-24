import React from 'react'
import PropTypes from 'prop-types'

import {organization, site, folder} from '../helpers/prop-types'
import FolderPage from '../components/site/FolderPage'
import LoadingSkeleton from '../components/LoadingSkeleton'
import {useGAPageView} from '../helpers/analytics'

export default function Folder({organization, site, folder, pathname}) {
  useGAPageView({pathname})

  return <FolderPage organization={organization} site={site} folder={folder} />
}

Folder.propTypes = {
  organization,
  site,
  folder,
  pathname: PropTypes.string
}

Folder.renderLoading = ({routeInfo}) => (
  <LoadingSkeleton hasFolder hasHero={!routeInfo.params.folderID} />
)

Folder.renderLoading.propTypes = {
  routeInfo: PropTypes.shape({
    params: PropTypes.shape({folderID: PropTypes.string})
  })
}

Folder.getInitialProps = async ({context, routeInfo}) => {
  const redirectTo = redirectOldUrls(routeInfo)

  if (typeof window !== 'undefined' && redirectTo) {
    return window.location.replace(redirectTo)
  }

  const {
    organization: organizationName,
    repository: repositoryName,
    folderID
  } = routeInfo.params
  const {domain} = context

  const organization = await domain
    .get('get_info_organization_use_case')
    .execute({name: organizationName})

  const repository = await domain
    .get('get_info_repository_use_case')
    .execute({name: repositoryName})

  const folder = await domain
    .get('get_info_folder_use_case')
    .execute({organizationName, repository, folderID})

  return {
    ...(redirectTo && {__HTTP__: {redirectTo}}),
    organization,
    site: repository,
    folder,
    folderID,
    pathname: routeInfo.location.pathname
  }
}

function redirectOldUrls({params, location}) {
  const {fileId, folderId} = location?.query
  const {organization: organizationName, repository: repositoryName} = params

  if (folderId) {
    return `/${organizationName}/${repositoryName}/section/${folderId}`
  }
  if (fileId) {
    return `/${organizationName}/${repositoryName}/file/${fileId}`
  }
}
