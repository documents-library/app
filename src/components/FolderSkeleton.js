import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import Grid from '@material-ui/core/Grid'

import Layout from './Layout'
import {FolderWrapper, FolderGrid} from './Folder/index'

export default function PageSkeleton() {
  console.log('----------------------- skeleton')

  return (
    <Layout background="#fafafa">
      <FolderWrapper maxWidth="lg">
        <FolderGrid container spacing={2} direction="row">
          <Grid item xs={12} sm={7}>
            <Skeleton animation="wave" />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Skeleton animation="wave" />
          </Grid>
        </FolderGrid>
      </FolderWrapper>
    </Layout>
  )
}
