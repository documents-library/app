import React, { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { withTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { dateRelativeFormat } from '../../helpers/format'
import {
  canReadOnline,
  getFileIcon,
  getPreview,
  formatFileName,
  downloadLinks
} from '../../helpers/files'

const IconImage = styled.img`
  height: 50px;
  width: auto;
`

const CardPreview = withTheme(styled(CardMedia)`
  height: ${({ height }) => height}px;
  padding-top: ${({ theme }) => theme.spacing(4)}px;
  padding-left: ${({ theme }) => theme.spacing(6)}px;
  padding-right: ${({ theme }) => theme.spacing(6)}px;
  padding-bottom: 0;
  overflow: hidden;
  justify-content: center;
  display: flex;
  align-items: baseline;
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

  @media (max-width: 500px) {
    padding-left: ${({ theme }) => theme.spacing(4)}px;
    padding-right: ${({ theme }) => theme.spacing(4)}px;
  }

  img {
    width: 100%;
    height: auto;
    box-shadow: ${({ theme }) => theme.shadows[6]};
  }
`)

const CardWrapper = withTheme(styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`)

export default function FileItem({ site, file, columnWidth }) {
  const { id, name, thumbnailLink } = file
  const fileName = formatFileName({ name })

  return (
    <CardWrapper>
      <Link
        href={{
          pathname: `/${site.organizationName}/${site.name}/`,
          query: { fileId: id }
        }}
      >
        <CardActionArea>
          {thumbnailLink && (
            <FilePreview
              height={columnWidth ? columnWidth * 0.5 : 100}
              src={getPreview({
                thumbnailLink,
                size: `w${columnWidth - 64}`
              })}
              alt={`Preview image of ${fileName}`}
            />
          )}

          <CardContent>
            {thumbnailLink ? (
              <CardContentText data={file} />
            ) : (
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={2}
                wrap="nowrap"
              >
                <Grid item>
                  <CardContentText data={file} />
                </Grid>
                <Grid item>
                  <IconImage src={getFileIcon({ file: file })} alt={fileName} />
                </Grid>
              </Grid>
            )}
          </CardContent>
        </CardActionArea>
      </Link>

      {!canReadOnline({ file: file }) ? (
        <CardActions>
          {downloadLinks({ file }).map(link => (
            <Button
              href={link.url}
              key={link.id}
              rel="noopener"
              target="_blank"
            >
              {link.label}
            </Button>
          ))}
        </CardActions>
      ) : null}
    </CardWrapper>
  )
}

function CardContentText({ data }) {
  const { name, modifiedTime } = data
  return (
    <>
      <Typography variant="h5" component="h2">
        {formatFileName({ name })}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {dateRelativeFormat({ date: modifiedTime })}
      </Typography>
    </>
  )
}

function FilePreview({ height, src, alt = 'Image preview' }) {
  const [disabled, setDisabled] = useState(false)

  // hide preview if image fails
  if (disabled) return false
  return (
    <CardPreview height={height}>
      <img
        onError={() => setDisabled(true)}
        onLoad={() => setDisabled(false)}
        src={src}
        alt={alt}
      />
    </CardPreview>
  )
}

FileItem.propTypes = {
  site: PropTypes.object,
  file: PropTypes.object,
  columnWidth: PropTypes.number
}

CardContentText.propTypes = {
  data: PropTypes.object
}

FilePreview.propTypes = {
  height: PropTypes.number,
  src: PropTypes.string,
  alt: PropTypes.string
}
