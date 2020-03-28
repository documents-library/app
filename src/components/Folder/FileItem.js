import React from 'react'
import PropTypes from 'prop-types'
import {organization, site, file, folderID} from '../../helpers/prop-types'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import {withTheme} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Link from '@s-ui/react-router/lib/Link'

import {dateRelativeFormat} from '../../helpers/format'
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

export const CardPreview = withTheme(styled(CardMedia)`
  padding-top: ${({theme}) => theme.spacing(4)}px;
  padding-left: ${({theme}) => theme.spacing(6)}px;
  padding-right: ${({theme}) => theme.spacing(6)}px;
  padding-bottom: 50%;
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
    z-index: 1;
  }

  .filePreview-image {
    position: absolute;
    width: calc(100% - ${({theme}) => theme.spacing(6) * 2}px);
    height: auto;
    box-shadow: ${({theme}) => theme.shadows[6]};
  }

  @media (max-width: 500px) {
    padding-left: ${({theme}) => theme.spacing(4)}px;
    padding-right: ${({theme}) => theme.spacing(4)}px;

    .filePreview-image {
      width: calc(100% - ${({theme}) => theme.spacing(4) * 2}px);
    }
  }
`)

export const CardWrapper = withTheme(styled(Card)`
  margin-bottom: ${({theme}) => theme.spacing(2)}px;
`)

export default function FileItem({organization, site, file, folderID}) {
  const {id: fileID, name, thumbnailLink} = file
  const fileName = formatFileName({name})

  return (
    <CardWrapper>
      <Link
        to={{
          pathname: `/${organization.name}/${site.name}/${folderID}/${fileID}`
        }}
      >
        <CardActionArea>
          {thumbnailLink && (
            <FilePreview
              src={getPreview({
                thumbnailLink,
                size: `w615`
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
                  <IconImage src={getFileIcon({file: file})} alt={fileName} />
                </Grid>
              </Grid>
            )}
          </CardContent>
        </CardActionArea>
      </Link>

      {!canReadOnline({file: file}) ? (
        <CardActions>
          {downloadLinks({file}).map(link => (
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

function CardContentText({data}) {
  const {name, modifiedTime} = data
  return (
    <>
      <Typography variant="h5" component="h2">
        {formatFileName({name})}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {dateRelativeFormat({date: modifiedTime})}
      </Typography>
    </>
  )
}

function FilePreview({src, alt = 'Image preview'}) {
  // TODO: find a better way to hide the card preview if the image fails to load
  // const imgRef = createRef()
  // const [disabled, setDisabled] = useState(false)
  //
  // // hide preview if image fails
  // useEffect(() => {
  //   const img = imgRef.current
  //
  //   if (!img.complete || img.naturalWidth === 0) {
  //     setDisabled(true)
  //   }
  // }, [])
  //
  // if (disabled) return false
  return (
    <CardPreview>
      <img
        // ref={imgRef}
        // onError={() => setDisabled(true)}
        // onLoad={() => setDisabled(false)}
        className="filePreview-image"
        src={src}
        alt={alt}
      />
    </CardPreview>
  )
}

FileItem.propTypes = {
  organization,
  site,
  file,
  folderID
}

CardContentText.propTypes = {
  data: file
}

FilePreview.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
}
