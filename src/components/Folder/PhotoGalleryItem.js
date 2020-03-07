import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { withTheme } from '@material-ui/core/styles'
// import CardActionArea from '@material-ui/core/CardActionArea'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

import { getPreview } from '../../helpers/files'

const PHOTO_PADDING = 16

const CardPreview = withTheme(styled('section')`
  padding-bottom: 70%;
  position: relative;
  background: rgb(250, 250, 250);
  background: linear-gradient(
    180deg,
    rgba(250, 250, 250, 1) 0%,
    rgba(238, 238, 238, 1) 100%
  );
  position: relative;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    box-shadow: inset 0px -1px 1px 0px rgba(0, 0, 0, 0.14);
    z-index: 1;
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

const Gallery = styled.div`
  position: absolute;
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
    display: contents;
  }

  .photoGalleryItem-gridItem img {
    height: calc(100% - ${PHOTO_PADDING * 2}px);
    margin: ${PHOTO_PADDING}px ${PHOTO_PADDING / 2}px;
  }

  .photoGalleryItem-gridItem:first-child img {
    margin-left: ${PHOTO_PADDING}px;
  }

  .photoGalleryItem-gridItem:last-child img {
    margin-right: ${PHOTO_PADDING}px;
  }
`

export default function PhotoGalleryItem({ site, photos }) {
  return (
    <CardWrapper>
      <CardPreview>
        <Gallery>
          {photos.map(photo => (
            <Link
              href={{
                pathname: `/${site.organizationName}/${site.name}/`,
                query: { fileId: photo.id }
              }}
              key={photo.id}
            >
              <Button
                className="photoGalleryItem-gridItem"
                disableFocusRipple
                disableRipple
              >
                <img
                  src={getPreview({
                    thumbnailLink: photo.thumbnailLink,
                    size: `h570`
                  })}
                  alt={`Preview image of ${photo.name}`}
                />
              </Button>
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
  photos: PropTypes.array,
  columnWidth: PropTypes.number
}
