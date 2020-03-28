import React from 'react'
import PropTypes from 'prop-types'

import {organization, file, site} from '../helpers/prop-types'
import {getIsCrawler} from '../helpers/fetch'

import FilePage from '../components/site/FilePage'

const File = ({organization, site, file, isCrawler}) => {
  return (
    <FilePage
      organization={organization}
      site={site}
      file={file}
      isCrawler={isCrawler}
    />
  )
}

File.displayName = 'File'
File.propTypes = {
  organization,
  site,
  file,
  isCrawler: PropTypes.bool
}
File.getInitialProps = async ({context, routeInfo}) => {
  const {
    organization: organizationName,
    repository: repositoryName,
    fileID
  } = routeInfo.params
  const {domain, device} = context

  const organization = await domain
    .get('get_info_organization_use_case')
    .execute({name: organizationName})

  const repository = await domain
    .get('get_info_repository_use_case')
    .execute({name: repositoryName})

  const file = await domain
    .get('get_info_file_use_case')
    .execute({repository, fileID})

  return {
    // TODO: Refactor this
    isCrawler: getIsCrawler({userAgent: device.userAgent}),
    organization,
    site: repository,
    file
  }
}

export default File
