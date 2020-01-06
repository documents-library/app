import React from 'react'

import Layout from '../../components/Layout'
import Folder from '../../components/Folder'

export default function FolderPage({ site, folder }) {
  return (
    <Layout title={site.name} onGoBack={() => alert('back')}>
      {folder.files.length > 0 ? (
        <Folder site={site} folder={folder} />
      ) : (
        <p>This folder is empty</p>
      )}
    </Layout>
  )
}
