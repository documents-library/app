import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { withTheme, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'

import FileItem from './FileItem'
import FolderItem from './FolderItem'

export const itemType = {
  folder: 'application/vnd.google-apps.folder'
}

export default function Folder({ site, folder }) {
  const columnFilesEl = useRef()
  const [columnWidth, setColumnWidth] = useState()
  const theme = useTheme()
  const isDesktopDevice = useMediaQuery(theme.breakpoints.up('sm'))
  const files = folder.files.filter(item => item.mimeType !== itemType.folder)
  const sections = folder.files.filter(
    item => item.mimeType === itemType.folder
  )

  useEffect(() => {
    setColumnWidth(columnFilesEl.current.clientWidth)
  }, [])

  return (
    <FolderWrapper maxWidth="lg">
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} sm={7} ref={columnFilesEl}>
          {!isDesktopDevice && <Sections site={site} sections={sections} />}
          <Files site={site} files={files} columnWidth={columnWidth} />
        </Grid>

        {isDesktopDevice && (
          <Grid item sm={5}>
            <Sections site={site} sections={sections} />
          </Grid>
        )}
      </Grid>
    </FolderWrapper>
  )
}

function Files({ site, files, columnWidth }) {
  return files ? (
    files.map(item => (
      <FileItem
        key={item.id}
        site={site}
        data={item}
        columnWidth={columnWidth}
      />
    ))
  ) : (
    <p>No hay documentos en esta sección.. continuá navegando 🐭</p>
  )
}

function Sections({ site, sections }) {
  return sections ? (
    <SectionsWrapper>
      <List
        subheader={
          <ListSubheader component="div" divider>
            Secciones
          </ListSubheader>
        }
      >
        <>
          <Divider />
          {sections.map(item => (
            <FolderItem key={item.id} site={site} data={item} />
          ))}
        </>
      </List>
    </SectionsWrapper>
  ) : null
}

Folder.propTypes = {
  site: PropTypes.object,
  folder: PropTypes.object
}

Files.propTypes = {
  site: PropTypes.object,
  files: PropTypes.array
}

Sections.propTypes = {
  site: PropTypes.object,
  sections: PropTypes.array
}

const SectionsWrapper = withTheme(styled.section`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`)

const FolderWrapper = withTheme(styled(Container)`
  padding-top: ${({ theme }) => theme.spacing(3)}px;
  padding-bottom: ${({ theme }) => theme.spacing(3)}px;
`)
