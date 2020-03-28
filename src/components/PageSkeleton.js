import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import Grid from '@material-ui/core/Grid'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import styled from 'styled-components'

import Layout from './Layout'
import {FolderWrapper, FolderGrid} from './Folder/index'
import {CardWrapper, CardPreview} from './Folder/FileItem'

const FilePreview = styled(Skeleton)`
  transform: none !important;
`

// TODO: create 4 skeletons based on this one for each page
// organization, repo, folder, file
export default function PageSkeleton() {
  return (
    <Layout background="#fafafa">
      <FolderWrapper maxWidth="lg">
        <FolderGrid container spacing={2} direction="row">
          <Grid item xs={12} sm={7}>
            <CardWrapper>
              <CardActionArea>
                <CardPreview>
                  <div className="filePreview-image">
                    <FilePreview
                      className="skeleton-image"
                      animation="wave"
                      height={900}
                    />
                  </div>
                </CardPreview>

                <CardContent>
                  <Skeleton animation="wave" />
                </CardContent>
              </CardActionArea>
            </CardWrapper>
          </Grid>

          <Grid item xs={12} sm={5}>
            <Skeleton animation="wave" />
          </Grid>
        </FolderGrid>
      </FolderWrapper>
    </Layout>
  )
}
