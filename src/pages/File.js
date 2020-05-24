import React from 'react'
import PropTypes from 'prop-types'

import {organization, file, site} from '../helpers/prop-types'
import {getIsCrawler} from '../helpers/fetch'
import FilePage from '../components/site/FilePage'
import LoadingSkeleton from '../components/LoadingSkeleton'
import {useGAPageView} from '../helpers/analytics'

export default function File({organization, site, file, isCrawler, pathname}) {
  useGAPageView({pathname})

  return (
    <FilePage
      organization={organization}
      site={site}
      file={file}
      isCrawler={isCrawler}
    />
  )
}

File.renderLoading = () => <LoadingSkeleton hasFile />

File.propTypes = {
  organization,
  site,
  file,
  isCrawler: PropTypes.bool,
  pathname: PropTypes.string
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
    .execute({organizationName, repository, fileID})

  return {
    isCrawler: getIsCrawler({userAgent: device.userAgent}),
    organization,
    site: repository,
    file,
    pathname: routeInfo.location.pathname
  }
}
