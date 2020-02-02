import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { withTheme } from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import Link from 'next/link'

import { getPreview } from '../../helpers/files'

const CardPreview = withTheme(styled('section')`
  height: ${({ height }) => height}px;
  position: relative;
  background: rgb(250, 250, 250);
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 1) 0%,
    rgba(238, 238, 238, 1) 100%
  );

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    box-shadow: inset 0px -1px 1px 0px rgba(0, 0, 0, 0.14);
  }

  .photoGalleryItem-gridlist {
    flex-wrap: nowrap;
    display: flex;
    overflow: hidden;
  }
`)

const CardWrapper = withTheme(styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`)

const photoPadding = 16

const Gallery = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  alignitems: center;

  .photoGalleryItem-gridItem {
    width: auto;
    max-width: ${({ maxImgWidth }) => maxImgWidth}px;
    display: flex;
    align-items: center;
    padding: ${photoPadding}px ${photoPadding / 2}px;
  }

  .photoGalleryItem-gridItem img {
    max-width: calc(${({ maxImgWidth }) => maxImgWidth}px - ${photoPadding}px);
  }

  .photoGalleryItem-gridItem:first-child {
    padding-left: ${photoPadding}px;
  }

  .photoGalleryItem-gridItem:last-child {
    padding-right: ${photoPadding}px;
  }
`

export default function PhotoGalleryItem({ site, photos, columnWidth }) {
  const imageHeight = columnWidth ? Math.round(columnWidth * 0.8) : 200

  return (
    <CardWrapper>
      <CardPreview height={imageHeight + 32}>
        <Gallery maxImgWidth={Math.round(columnWidth * 0.9 - photoPadding)}>
          {photos.map(photo => (
            <Link
              href={{
                pathname: `/${site.organizationName}/${site.name}/`,
                query: { fileId: photo.id }
              }}
              key={photo.id}
            >
              <CardActionArea className="photoGalleryItem-gridItem">
                <img
                  src={getPreview({
                    thumbnailLink: photo.thumbnailLink,
                    size: `h${imageHeight}`
                  })}
                  alt={`Preview image of ${photo.name}`}
                />
              </CardActionArea>
            </Link>
          ))}
        </Gallery>
      </CardPreview>
      <CardContent>
        <Typography variant="h5" component="h2">
          Galería de imágenes
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {`${photos.length} fotos`}
        </Typography>
      </CardContent>
    </CardWrapper>
  )
}

PhotoGalleryItem.propTypes = {
  site: PropTypes.object,
  photos: PropTypes.object,
  columnWidth: PropTypes.number
}
