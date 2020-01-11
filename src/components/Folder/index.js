import React from 'react'

import FileItem from './FileItem'
import FolderItem from './FolderItem'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { withTheme, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import List from '@material-ui/core/List'

export const itemType = {
  folder: 'application/vnd.google-apps.folder'
}

export default function Folder({ site, folder }) {
  const theme = useTheme()
  const isDesktopDevice = useMediaQuery(theme.breakpoints.up('sm'))
  const files = folder.files.filter(item => item.mimeType !== itemType.folder)
  const sections = folder.files.filter(
    item => item.mimeType === itemType.folder
  )

  return (
    <FolderWrapper maxWidth="lg">
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} sm={7}>
          {!isDesktopDevice && <Sections site={site} sections={sections} />}
          <Files site={site} files={files} />
        </Grid>

        {isDesktopDevice && (
          <Grid item xs={false} sm={5}>
            <Sections site={site} sections={sections} />
          </Grid>
        )}
      </Grid>
    </FolderWrapper>
  )
}

Folder.propTypes = {
  site: PropTypes.object,
  folder: PropTypes.object
}

function Files({ site, files }) {
  return files ? (
    files.map(item => <FileItem key={item.id} site={site} data={item} />)
  ) : (
    <p>No hay documentos en esta sección.. continuá navegando 🐭</p>
  )
}

Files.propTypes = {
  site: PropTypes.object,
  files: PropTypes.array
}

function Sections({ site, sections }) {
  return sections ? (
    <List>
      {sections.map(item => (
        <FolderItem key={item.id} site={site} data={item} />
      ))}
    </List>
  ) : null
}

const FolderWrapper = withTheme(styled(Container)`
  padding-top: ${({ theme }) => theme.spacing(3)}px;
  padding-bottom: ${({ theme }) => theme.spacing(3)}px;
`)
