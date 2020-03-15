import React from 'react'

import Route from '@s-ui/react-router/lib/Route'
import Router from '@s-ui/react-router/lib/Router'
import Redirect from '@s-ui/react-router/lib/Redirect'

import loadPage from '@s-ui/react-initial-props/lib/loadPage'
import contextFactory from './contextFactory'

const LoadOrganizationPage = loadPage(contextFactory, () =>
  import(/* webpackChunkName: "OrganizationPage" */ './pages/organization')
)

// const LoadSitePage = loadPage(contextFactory, () =>
//   import(/* webpackChunkName: "SitePage" */ './pages/organization/site')
// )

export default (
  <Router>
    <Redirect from="/" to="/taller@" />
    <Route path="/:organization" getComponent={LoadOrganizationPage} />
    <Route path="/:organization/:site" component={() => <h1>Hola</h1>} />
  </Router>
)
