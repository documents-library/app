import React from 'react'
import PropTypes from 'prop-types'
import Skeleton from '@material-ui/lab/Skeleton'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'

import Layout from './Layout'
import {FolderWrapper, FolderGrid} from './Folder/index'
import {CardWrapper, CardPreview} from './Folder/FileItem'
import {OrganizationWelcomeWrapper} from '../components/site/WelcomeSection'
import {
  SiteListWrapper,
  SiteItemWrapper
} from '../components/site/OrganizationHomePage'
import {FileHtmlContainer} from '../components/site/FilePage'
import {theme} from '../helpers/theme'

const FilePreview = styled(Skeleton)`
  transform: none !important;
`

const H1 = styled(Skeleton)`
  ${theme.typography.h1}
`

const H2 = styled(Skeleton)`
  ${theme.typography.h2}
`

const H5 = styled(Skeleton)`
  ${theme.typography.h5}
`

const Body = styled(Skeleton)`
  ${theme.typography.body1}
`

const ListItem = styled(Skeleton)`
  margin: 0.6rem 0 !important;
  ${theme.typography.body1}
`

const Loading = styled.div`
  display: flex;
  height: 100%;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`

export default function LoadingSkeleton({
  hasFolder,
  hasHero,
  hasFile,
  hasSites
}) {
  return (
    <Layout background="#fafafa" elvateOnScroll={hasHero}>
      {hasHero && (
        <OrganizationWelcomeWrapper>
          <Container maxWidth="md">
            <H1 animation="wave" />
            <H5 animation="wave" />
            <H5 animation="wave" />
            <H5 animation="wave" />
          </Container>
        </OrganizationWelcomeWrapper>
      )}

      {hasSites && (
        <SiteListWrapper>
          <Container maxWidth="md">
            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="stretch"
            >
              {[1, 2, 3, 4].map(_ => (
                <SiteItemWrapper item xs={12} sm={6} key={_}>
                  <Card className="siteItem-card">
                    <CardActionArea>
                      <CardContent>
                        <H2 animation="wave" />
                        <Body animation="wave" />
                        <Body animation="wave" />
                        <Body animation="wave" />
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </SiteItemWrapper>
              ))}
            </Grid>
          </Container>
        </SiteListWrapper>
      )}

      {hasFolder && (
        <FolderWrapper maxWidth="lg">
          <FolderGrid container spacing={2} direction="row">
            <Grid item xs={12} sm={7}>
              {[1, 2].map(_ => (
                <CardWrapper key={_}>
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
                      <H2 animation="wave" />
                      <Body animation="wave" />
                    </CardContent>
                  </CardActionArea>
                </CardWrapper>
              ))}
            </Grid>

            <List subheader={<ListItem animation="wave" width={150} />}>
              <Grid item xs={12} sm={5}>
                <>
                  <Divider />
                  <ListItem animation="wave" />
                  <Divider />
                  <ListItem animation="wave" />
                  <Divider />
                  <ListItem animation="wave" />
                  <Divider />
                </>
              </Grid>
            </List>
          </FolderGrid>
        </FolderWrapper>
      )}

      {hasFile && (
        <FileHtmlContainer maxWidth="md">
          <Loading>
            <CircularProgress />
          </Loading>
        </FileHtmlContainer>
      )}
    </Layout>
  )
}

LoadingSkeleton.propTypes = {
  hasFolder: PropTypes.bool,
  hasHero: PropTypes.bool,
  hasFile: PropTypes.bool,
  hasSites: PropTypes.bool
}
