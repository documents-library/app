import React from 'react'

import FileItem from './FileItem'
import FolderItem from './FolderItem'

export const itemType = {
  folder: 'application/vnd.google-apps.folder'
}

export default function Folder({ site, folder }) {
  return folder.files.map(item => {
    if (item.mimeType === itemType.folder) {
      return <FolderItem site={site} data={item} />
    } else return <FileItem site={site} data={item} />
  })
}
