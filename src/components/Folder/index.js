import React from 'react'

import FileItem from './FileItem'
import FolderItem from './FolderItem'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

export const itemType = {
  folder: 'application/vnd.google-apps.folder'
}

export default function Folder({ site, folder }) {
  return (
    <FolderWrapper container spacing={2}>
      {folder.files.map(item =>
        item.mimeType === itemType.folder ? (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <FolderItem site={site} data={item} />
          </Grid>
        ) : (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <FileItem site={site} data={item} />
          </Grid>
        )
      )}
    </FolderWrapper>
  )
}

Folder.propTypes = {
  site: PropTypes.object,
  folder: PropTypes.object
}

const FolderWrapper = styled(Grid)`
  & > * {
    background: red;
    display: flex;
    width: auto;
    background: white;
    flex-basis: 40%;
    flex-grow: 1;
    margin: 1rem;
  }
`
