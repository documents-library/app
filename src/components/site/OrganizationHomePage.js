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
    <Layout
      title={organization.name}
      elvateOnScroll
      meta={{
        ogType: 'website',
        title: `${organization.name} | Documents Library`,
        description: 'Librería de documentos',
        siteName: 'documents.li'
      }}
    >
      <>
        <WelcomeSection
          title={organization.longName}
          subtitle={organization.description}
        />
        <SiteList sites={sites} organizationName={organization.name} />
      </>
    </Layout>
  )
}

function SiteList({ sites, organizationName }) {
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
            <SiteItem
              site={site}
              organizationName={organizationName}
              key={site._id}
            />
          ))}
        </Grid>
      </Container>
    </SiteListWrapper>
  )
}

function SiteItem({ site, organizationName }) {
  const { longName, name, description } = site

  return (
    <SiteItemWrapper item xs={12} sm={6}>
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
  site: PropTypes.object,
  organizationName: PropTypes.string
}

SiteList.propTypes = {
  sites: PropTypes.array,
  organizationName: PropTypes.string
}

OrganizationHomePage.propTypes = {
  organization: PropTypes.shape({
    name: PropTypes.string,
    longName: PropTypes.string,
    description: PropTypes.string
  }),
  sites: PropTypes.array
}
