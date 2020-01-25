import React from 'react'
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
import { canReadOnline, getFileIcon, getPreview } from '../../helpers/files'

export default function FileItem({ site, data, columnWidth }) {
  const { id, name, thumbnailLink, webContentLink, exportLinks } = data

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
            <CardPreview height={columnWidth ? columnWidth * 0.5 : 100}>
              <img
                src={getPreview({
                  thumbnailLink,
                  size: `w${columnWidth - 64}`
                })}
                alt={`Preview image of ${name}`}
              />
            </CardPreview>
          )}

          <CardContent>
            {thumbnailLink ? (
              <CardContentText data={data} />
            ) : (
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <CardContentText data={data} />
                </Grid>
                <Grid item>
                  <IconImage src={getFileIcon({ file: data })} alt={name} />
                </Grid>
              </Grid>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
      {!canReadOnline({ file: data }) && webContentLink ? (
        <CardActions>
          <Button href={webContentLink} rel="noopener" target="_blank">
            Descargar
          </Button>
        </CardActions>
      ) : !canReadOnline({ file: data }) && exportLinks ? (
        <CardActions>
          <Button href={exportLinks['application/pdf']}>Descargar PDF</Button>
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
        {name}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {dateRelativeFormat({ date: modifiedTime })}
      </Typography>
    </>
  )
}

FileItem.propTypes = {
  site: PropTypes.object,
  data: PropTypes.object,
  columnWidth: PropTypes.number
}

CardContentText.propTypes = {
  data: PropTypes.object
}

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
  background: #29434e;
  justify-content: center;
  display: flex;
  align-items: baseline;

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
