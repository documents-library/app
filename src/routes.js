import React from 'react'

import Route from '@s-ui/react-router/lib/Route'
import Router from '@s-ui/react-router/lib/Router'
import Redirect from '@s-ui/react-router/lib/Redirect'

import loadPage from '@s-ui/react-initial-props/lib/loadPage'
import contextFactory from './contextFactory'

const LoadOrganizationPage = loadPage(contextFactory, () =>
  import(/* webpackChunkName: "OrganizationPage" */ './pages/Organization')
)

const LoadFolderPage = loadPage(contextFactory, () =>
  import(/* webpackChunkName: "FolderPage" */ './pages/Folder')
)

const LoadFilePage = loadPage(contextFactory, () =>
  import(/* webpackChunkName: "FilePage" */ './pages/File')
)

export default (
  <Router>
    <Redirect from="/" to="/taller@" />
    <Route component={require('./pages/MainFrame').default}>
      <Route path="/:organization" getComponent={LoadOrganizationPage} />
      <Route path="/:organization/:repository" getComponent={LoadFolderPage} />
      <Route
        path="/:organization/:repository/:folderID"
        getComponent={LoadFolderPage}
      />
      <Route
        path="/:organization/:repository/:folderID/:fileID"
        getComponent={LoadFilePage}
      />
    </Route>
  </Router>
)
