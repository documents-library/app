import React from 'react'
import PropTypes from 'prop-types'

import OrganizationHomePage from '../components/site/OrganizationHomePage'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function Organization({organization, sites}) {
  return <OrganizationHomePage organization={organization} sites={sites} />
}

Organization.renderLoading = () => <LoadingSkeleton hasHero hasSites />

Organization.propTypes = {
  organization: PropTypes.object,
  sites: PropTypes.array
}

Organization.getInitialProps = async ({context, routeInfo}) => {
  const {organization: name} = routeInfo.params

  const {domain} = context

  const organization = await domain
    .get('get_info_organization_use_case')
    .execute({name})

  const sites = await domain.get('get_all_respository_use_case').execute()

  return {
    organization,
    sites
  }
}
