import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { withTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { dateRelativeFormat } from '../../helpers/format'
import {
  isFileType,
  canReadOnline,
  getFileIcon,
  getPreview
} from '../../helpers/files'

export default function FileItem({ site, data, columnWidth }) {
  // if (data.fileExtension

  function cardContent({ name, modifiedTime }) {
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

  return (
    <CardWrapper>
      <Link
        href={{
          pathname: `/${site.organizationName}/${site.name}/`,
          query: { fileId: data.id }
        }}
      >
        <CardActionArea>
          {data.thumbnailLink && (
            <CardPreview height={columnWidth * 0.5}>
              <img
                src={getPreview({
                  thumbnailLink: data.thumbnailLink,
                  size: `w${columnWidth - 64}`
                })}
                alt={`Preview image of ${data.name}`}
              />
            </CardPreview>
          )}

          <CardContent>
            {data.thumbnailLink ? (
              cardContent(data)
            ) : (
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item>{cardContent(data)}</Grid>
                <Grid item>img</Grid>
              </Grid>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
      {/* <CardActions> */}
      {/*   <Button size="small" color="primary"> */}
      {/*     Share */}
      {/*   </Button> */}
      {/*   <a href={data.webContentLink}>Descargar</a> */}
      {/* </CardActions> */}
    </CardWrapper>
  )
}

const CardPreview = withTheme(styled(CardMedia)`
  height: ${({ height }) => height}px;
  padding-top: ${({ theme }) => theme.spacing(4)}px;
  padding-left: ${({ theme }) => theme.spacing(6)}px;
  padding-right: ${({ theme }) => theme.spacing(6)}px;
  padding-bottom: 0;
  overflow: hidden;
  background: #666;
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

// const CardMediaWrapper = styled(CardMedia)`
//   height: 220px;
// `

FileItem.propTypes = {
  site: PropTypes.object,
  data: PropTypes.object
}
