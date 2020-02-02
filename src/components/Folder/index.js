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
import PhotoGalleryItem from './PhotoGalleryItem'
import { isFileType, filetype } from '../../helpers/files'

const SectionsWrapper = withTheme(styled.section`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`)

export const FolderWrapper = withTheme(styled(Container)`
  padding-top: ${({ theme }) => theme.spacing(3)}px;
  padding-bottom: ${({ theme }) => theme.spacing(3)}px;
`)

export default function Folder({ site, folder }) {
  const columnFilesEl = useRef()
  const [columnWidth, setColumnWidth] = useState()
  const theme = useTheme()
  const isDesktopDevice = useMediaQuery(theme.breakpoints.up('sm'))
  const sections = folder.files.filter(file =>
    isFileType({ file, typeNames: [filetype.folder.name] })
  )
  const photos = folder.files.filter(file =>
    isFileType({ file, typeNames: [filetype.img.name] })
  )
  const files = folder.files.filter(
    file =>
      !isFileType({ file, typeNames: [filetype.folder.name] }) &&
      !isFileType({ file, typeNames: [filetype.img.name] })
  )
  const hasSections =
    sections && sections.length && sections.length > 0 ? true : false
  const emptyFolder =
    (!files || !files.length || files.length === 0) &&
    (!photos || !photos.length || photos.length === 0)
      ? true
      : false

  useEffect(() => {
    // to have a nice height proportion for the preview images
    setColumnWidth(columnFilesEl.current.clientWidth)
  }, [])

  return (
    <FolderWrapper maxWidth="lg">
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} sm={7} ref={columnFilesEl}>
          {!isDesktopDevice && hasSections && (
            <Sections site={site} sections={sections} />
          )}
          {emptyFolder ? (
            <p>Esta seccieon no contiene documentos</p>
          ) : (
            <>
              <Files site={site} files={files} columnWidth={columnWidth} />
              {photos.length > 1 ? (
                <PhotoGalleryItem
                  site={site}
                  photos={photos}
                  columnWidth={columnWidth}
                />
              ) : photos.length === 1 ? (
                <Files site={site} files={photos} columnWidth={columnWidth} />
              ) : null}
            </>
          )}
        </Grid>

        {isDesktopDevice && hasSections && (
          <Grid item sm={5}>
            <Sections site={site} sections={sections} />
          </Grid>
        )}
      </Grid>
    </FolderWrapper>
  )
}

function Files({ site, files, columnWidth }) {
  return files.map(item => (
    <FileItem key={item.id} site={site} data={item} columnWidth={columnWidth} />
  ))
}

function Sections({ site, sections }) {
  return (
    <SectionsWrapper>
      <List
        subheader={<ListSubheader component="div">Secciones</ListSubheader>}
      >
        <>
          <Divider />
          {sections.map(item => (
            <FolderItem key={item.id} site={site} data={item} />
          ))}
        </>
      </List>
    </SectionsWrapper>
  )
}

Folder.propTypes = {
  site: PropTypes.object,
  folder: PropTypes.object
}

Files.propTypes = {
  site: PropTypes.object,
  files: PropTypes.array,
  columnWidth: PropTypes.number
}

Sections.propTypes = {
  site: PropTypes.object,
  sections: PropTypes.array
}

