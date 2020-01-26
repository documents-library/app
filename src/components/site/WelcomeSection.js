import React from 'react'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Orphanage from 'react-orphanage'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

import { theme } from '../../helpers/theme'

export default function WelcomeSection({ title, subtitle }) {
  return (
    <OrganizationWelcomeWrapper>
      <Container maxWidth="md">
        <Orphanage>
          <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            paragraph
          >
            {title}
          </Typography>
        </Orphanage>
        <Orphanage>
          <Typography
            variant="h5"
            component="h2"
            align="center"
            gutterBottom
            paragraph
          >
            {subtitle}
          </Typography>
        </Orphanage>
      </Container>
    </OrganizationWelcomeWrapper>
  )
}

WelcomeSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

const OrganizationWelcomeWrapper = styled.section`
  background-color: ${theme.palette.primary.main};
  padding-top: ${theme.spacing(6)}px;
  padding-bottom: ${theme.spacing(10)}px;
  color: ${theme.palette.primary.contrastText};
`
