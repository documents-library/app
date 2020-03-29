import React from 'react'

import {organization, site, folder} from '../helpers/prop-types'
import FolderPage from '../components/site/FolderPage'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function Folder({organization, site, folder}) {
  return <FolderPage organization={organization} site={site} folder={folder} />
}

Folder.propTypes = {
  organization,
  site,
  folder
}

Folder.renderLoading = () => <LoadingSkeleton hasFolder />

Folder.getInitialProps = async ({context, routeInfo}) => {
  // TODO: change site by repository
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
    organization,
    site: repository,
    folder,
    folderID
  }
}
