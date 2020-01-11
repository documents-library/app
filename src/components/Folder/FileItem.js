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

import { fileType } from '../../helpers/files'

export default function FileItem({ site, data }) {
  console.log(data)

  // if (data.fileExtension

  return (
    <Card>
      <Link
        href={{
          pathname: `/${site.organizationName}/${site.name}/`,
          query: { fileId: data.id }
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h7" component="h2">
              {data.name}
            </Typography>
          </CardContent>
          {data.thumbnailLink && (
            <CardMediaWrapper
              image={data.thumbnailLink}
              title={`Preview image of ${data.name}`}
              hasThumbnail={data.thumbnailLink}
            />
          )}
        </CardActionArea>
      </Link>
      {/* <CardActions> */}
      {/*   <Button size="small" color="primary"> */}
      {/*     Share */}
      {/*   </Button> */}
      {/*   <a href={data.webContentLink}>Descargar</a> */}
      {/* </CardActions> */}
    </Card>
  )
}

const CardMediaWrapper = styled(CardMedia)`
  height: 220px;
`

FileItem.propTypes = {
  site: PropTypes.object,
  data: PropTypes.object
}
