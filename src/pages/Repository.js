import React from 'react'
import {site, folder, organization} from '../helpers/prop-types'

import SiteHomePage from '../components/site/SiteHomePage'

const Repository = ({site, folder, organization}) => {
  return (
    <SiteHomePage organization={organization} site={site} folder={folder} />
  )
}

Repository.displayName = 'Repository'
Repository.propTypes = {
  folder,
  organization,
  site
}

Repository.getInitialProps = async ({context, routeInfo}) => {
  const {
    organization: organizationName,
    repository: repositoryName
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
    .execute({repository, folderID: repository.googleFolderId})

  return {
    organization,
    site: repository,
    folder
  }
}

export default Repository
