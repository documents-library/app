import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Link from 'next/link'

import Layout from '../../components/Layout'
import WelcomeSection from './WelcomeSection'
import { theme } from '../../helpers/theme'

const SiteItemWrapper = styled(Grid)`
  margin-bottom: ${theme.spacing(2)}px;

  .siteItem-card {
    height: 100%;
    display: flex;
  }
`

const SiteListWrapper = styled.section`
  margin-top: -${theme.spacing(6)}px;
`

export default function OrganizationHomePage({ organization, sites }) {
  return (
    <Layout title={organization.name} elvateOnScroll>
      <>
        <WelcomeSection
          title={organization.longName}
          subtitle={organization.description}
        />
        <SiteList sites={sites} />
      </>
    </Layout>
  )
}

function SiteList({ sites }) {
  return (
    <SiteListWrapper>
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          {sites.map(site => (
            <SiteItem site={site} key={site.id} />
          ))}
        </Grid>
      </Container>
    </SiteListWrapper>
  )
}

function SiteItem({ site }) {
  const { organizationName, longName, name, description } = site

  return (
    <SiteItemWrapper item xs="12" sm="6">
      <Card className="siteItem-card">
        <Link
          href={{
            pathname: `/${organizationName}/${name}/`
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {longName}
              </Typography>
              <Typography color="textSecondary">{description}</Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </SiteItemWrapper>
  )
}
SiteItem.propTypes = {
  site: PropTypes.object
}

SiteList.propTypes = {
  sites: PropTypes.array
}

OrganizationHomePage.propTypes = {
  organization: PropTypes.shape({
    name: PropTypes.string,
    longName: PropTypes.string,
    description: PropTypes.string
  }),
  sites: PropTypes.array.required
}
