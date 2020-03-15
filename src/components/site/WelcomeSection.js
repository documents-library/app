import React from 'react'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

import {theme} from '../../helpers/theme'

const OrganizationWelcomeWrapper = styled.section`
  background-color: ${theme.palette.primary.main};
  padding-top: ${theme.spacing(6)}px;
  padding-bottom: ${theme.spacing(10)}px;
  color: ${theme.palette.primary.contrastText};

  .vollkorn {
    font-family: 'Vollkorn', serif;
  }
`
export default function WelcomeSection({title, subtitle}) {
  return (
    <OrganizationWelcomeWrapper>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          paragraph
          className="vollkorn"
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          align="center"
          gutterBottom
          paragraph
          className="vollkorn"
        >
          {subtitle}
        </Typography>
      </Container>
    </OrganizationWelcomeWrapper>
  )
}

WelcomeSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}
