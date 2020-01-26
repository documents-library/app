import React from 'react'
import PropTypes from 'prop-types'

import OrganizationHomePage from '../../components/site/OrganizationHomePage'

export default function Organization({ organization, sites }) {
  return <OrganizationHomePage organization={organization} sites={sites} />
}

Organization.propTypes = {
  organization: PropTypes.object,
  sites: PropTypes.array
}

Organization.getInitialProps = async ctx => {
  const { organization } = ctx.query
  // const res = await fetch(`http://localhost:8080/sites/${siteName}`)
  // const { site } = await res.json()
  // TODO: add organizations to BE
  const mockedResponse = {
    organization: {
      name: 'taller@',
      longName: 'Taller Vertical de Construcciones "M"',
      description:
        'Cátedras de Construcciones 1 a 3 de la Facultad de Arquitectura Urbanismo y Diseño de la Universidad Nacional de Mar del Plata.'
    },
    sites: [
      {
        _id: '5d0820fdba4d5a14d185c3dd',
        name: 'my.site',
        owner: '5cf2de7c6845b57f6a3f3f20',
        longName: 'Sitio con nombre largo',
        description: 'Description of the site',
        googleFolderId: '181KuCL0DZ_UtetYpO4h4mMC4MoVnUm9V',
        createdAt: '2019-06-17T23:23:41.977Z',
        updatedAt: '2019-06-17T23:23:41.977Z',
        __v: 0,
        organizationName: 'taller@'
      },
      {
        _id: '5d0820fdba4d5a14d185c3dd',
        name: 'C1',
        owner: '5cf2de7c6845b57f6a3f3f20',
        longName: 'Construcciones 1',
        description:
          'Cátedra de Construcciones 1 de la Facultad de Arquitectura Urbanismo y Diseño de la Universidad Nacional de Mar del Plata."M"',
        googleFolderId: '181KuCL0DZ_UtetYpO4h4mMC4MoVnUm9V',
        createdAt: '2019-06-17T23:23:41.977Z',
        updatedAt: '2019-06-17T23:23:41.977Z',
        __v: 0,
        organizationName: 'taller@'
      },
      {
        _id: '5d0820fdba4d5a14d185c3dd',
        name: 'C2',
        longName: 'Construcciones 2',
        description:
          'Cátedra de Construcciones 2 de la Facultad de Arquitectura Urbanismo y Diseño de la Universidad Nacional de Mar del Plata."M"',
        owner: '5cf2de7c6845b57f6a3f3f20',
        googleFolderId: '181KuCL0DZ_UtetYpO4h4mMC4MoVnUm9V',
        createdAt: '2019-06-17T23:23:41.977Z',
        updatedAt: '2019-06-17T23:23:41.977Z',
        __v: 0,
        organizationName: 'taller@'
      }
    ]
  }

  return {
    organization: mockedResponse.organization,
    sites: mockedResponse.sites
  }
}
