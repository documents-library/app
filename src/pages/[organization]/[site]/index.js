import React from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'

export default function Site({ kind, files }) {
  return (
    <>
      <Title>My site</Title>
      <p>The site id a: {kind}</p>
      {files ? (
        <ul>
          {files.map(file => (
            <li key={file.id}>{file.name}</li>
          ))}
        </ul>
      ) : (
        <div>{`Can't find this folder`}</div>
      )}
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </>
  )
}

Site.propTypes = {
  kind: PropTypes.string,
  files: PropTypes.array
}

Site.getInitialProps = async ctx => {
  const { site } = ctx.query
  const res = await fetch(`http://localhost:8080/folders/${site}`)
  const json = await res.json()
  return json
}

const Title = styled.h1`
  font-size: 40px;
  color: ${({ theme }) => theme.colors.primary};
`
