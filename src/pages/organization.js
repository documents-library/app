import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'axios'

import {API_URL} from '../helpers/constants'

import OrganizationHomePage from '../components/site/OrganizationHomePage'

export default function Organization({organization, sites}) {
  return <OrganizationHomePage organization={organization} sites={sites} />
}

Organization.propTypes = {
  organization: PropTypes.object,
  sites: PropTypes.array
}

Organization.getInitialProps = async ({routeInfo}) => {
  const {organization} = routeInfo.params // eslint-disable-line
  const res = await fetch(`${API_URL}/sites`)
  const sites = res.data

  // TODO: add organizations to BE
  const mockedOrganization = {
    name: 'taller@',
    longName: 'Taller Vertical de Construcciones "M"',
    description:
      'Cátedras de Construcciones 1 a 3 de la Facultad de Arquitectura Urbanismo y Diseño de la Universidad Nacional de Mar del Plata.'
  }

  return {
    organization: mockedOrganization,
    sites
  }
}
