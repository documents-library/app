import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import {withTheme} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'

import FileItem from './FileItem'
import FolderItem from './FolderItem'
import PhotoGalleryItem from './PhotoGalleryItem'
import {isFileType, filetype, isGarbageFile} from '../../helpers/files'
import {theme} from '../../helpers/theme'

const SectionsWrapper = withTheme(styled.section`
  margin-bottom: ${({theme}) => theme.spacing(2)}px;
`)

export const FolderWrapper = withTheme(styled(Container)`
  padding-top: ${({theme}) => theme.spacing(3)}px;
  padding-bottom: ${({theme}) => theme.spacing(3)}px;
`)

const FolderGrid = styled(Grid)`
  @media (max-width: ${theme.breakpoints.values.sm}px) {
    flex-direction: column-reverse;
  }
`

export default function Folder({site, folder}) {
  const sections = folder.files.filter(file =>
    isFileType({file, typeNames: [filetype.folder.name]})
  )

  const photos = folder.files.filter(file =>
    isFileType({file, typeNames: [filetype.img.name]})
  )

  const files = folder.files.filter(
    file =>
      !isFileType({
        file,
        typeNames: [filetype.folder.name, filetype.img.name]
      }) &&
      isFileType({
        file,
        typeNames: [
          filetype.doc.name,
          filetype.pres.name,
          filetype.calc.name,
          filetype.pict.name,
          filetype.cad.name,
          filetype.video.name,
          filetype.pdf.name
        ]
      }) &&
      !isGarbageFile({file})
  )

  const hasSections = Boolean(
    sections && sections.length && sections.length > 0
  )

  const emptyFolder = Boolean(
    (!files || !files.length || files.length === 0) &&
      (!photos || !photos.length || photos.length === 0)
  )

  const PhotoFiles = () => {
    if (photos.length > 1)
      return <PhotoGalleryItem site={site} photos={photos} />
    if (photos.length === 1) return <Files site={site} files={photos} />
    return null
  }

  const MainGrid = () => {
    if (emptyFolder) {
      if (!hasSections) return <p>Esta seccieon no contiene documentos</p>

      return <Sections site={site} sections={sections} />
    }

    return (
      <>
        <Files site={site} files={files} />
        <PhotoFiles />
      </>
    )
  }

  return (
    <FolderWrapper maxWidth="lg">
      <FolderGrid container spacing={2} direction="row">
        <Grid item xs={12} sm={7}>
          <MainGrid />
        </Grid>

        {hasSections && !emptyFolder && (
          <Grid item xs={12} sm={5}>
            <Sections site={site} sections={sections} />
          </Grid>
        )}
      </FolderGrid>
    </FolderWrapper>
  )
}

function Files({site, files}) {
  return files.map(file => <FileItem key={file.id} site={site} file={file} />)
}

function Sections({site, sections}) {
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
  files: PropTypes.array
}

Sections.propTypes = {
  site: PropTypes.object,
  sections: PropTypes.array
}
