import React from 'react'
import PropTypes from 'prop-types'
import {organization, site, folder, file} from '../../helpers/prop-types'

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

export const FolderGrid = styled(Grid)`
  @media (max-width: ${theme.breakpoints.values.sm}px) {
    flex-direction: column-reverse;
  }
`

export default function Folder({organization, site, folder}) {
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
      return (
        <PhotoGalleryItem
          organization={organization}
          site={site}
          photos={photos}
        />
      )
    if (photos.length === 1)
      return (
        <Files
          organization={organization}
          site={site}
          files={photos}
          folderID={folder.id}
        />
      )
    return null
  }

  const MainGrid = () => {
    if (emptyFolder) {
      if (!hasSections) return <p>Esta seccieon no contiene documentos</p>

      return (
        <Sections organization={organization} site={site} sections={sections} />
      )
    }

    return (
      <>
        <Files
          organization={organization}
          site={site}
          files={files}
          folderID={folder.id}
        />
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
            <Sections
              organization={organization}
              site={site}
              sections={sections}
            />
          </Grid>
        )}
      </FolderGrid>
    </FolderWrapper>
  )
}

function Files({organization, site, files, folderID}) {
  return files.map(file => (
    <FileItem
      key={file.id}
      organization={organization}
      site={site}
      file={file}
      folderID={folderID}
    />
  ))
}

function Sections({organization, site, sections}) {
  return (
    <SectionsWrapper>
      <List
        subheader={<ListSubheader component="div">Secciones</ListSubheader>}
      >
        <>
          <Divider />
          {sections.map(item => (
            <FolderItem
              organization={organization}
              key={item.id}
              site={site}
              data={item}
            />
          ))}
        </>
      </List>
    </SectionsWrapper>
  )
}

Folder.propTypes = {
  organization,
  site,
  folder
}

Files.propTypes = {
  organization,
  site,
  files: PropTypes.arrayOf(file)
}

Sections.propTypes = {
  organization,
  site,
  sections: PropTypes.arrayOf(file)
}
