import React, { useEffect, useRef, useState } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import IconButton from '@material-ui/core/IconButton'
import Explore from '@material-ui/icons/Explore'
import ExploreOff from '@material-ui/icons/ExploreOff'
import { withTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Layout from '../../components/Layout'

export default function File({ site, file }) {
  const [embedHtml, setEmbedHtml] = useState(false)
  const viewerUrl = `https://docs.google.com/file/d/${file.id}/preview` // same viewer on another url: `https://docs.google.com/viewer?srcid=${file.id}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`

  useEffect(() => {
    if (file.html) setEmbedHtml(true)
  }, [file])

  return (
    <Layout
      title={file.name}
      onGoBack={() =>
        Router.push({
          pathname: `/${site.organizationName}/${site.name}/`,
          query: { folderId: file.parents[0] }
        })
      }
      actions={
        file.html && (
          <IconButton color="inherit" onClick={() => setEmbedHtml(!embedHtml)}>
            {embedHtml ? <Explore /> : <ExploreOff />}
          </IconButton>
        )
      }
    >
      {embedHtml ? (
        <FileHtml
          html={file.html}
          styles={`
            img {
              max-width: 100%;
              height: auto;
            }
          `}
        />
      ) : (
        <IframeWrapper src={viewerUrl} />
      )}
    </Layout>
  )
}

// Implement shadow dom to isolate the styles of the html
function FileHtml({ styles, html }) {
  const ref = useRef()
  const [shadowDom, setShadowDom] = useState()

  useEffect(() => {
    setShadowDom(ref.current.attachShadow({ mode: 'open' }))
  }, [])

  function createMarkup(html) {
    return { __html: html }
  }

  const nodeToRender = (
    <>
      <style dangerouslySetInnerHTML={createMarkup(styles)} />
      <div
        className="filehtml-wrapper"
        dangerouslySetInnerHTML={createMarkup(html)}
      />
    </>
  )

  return (
    <FileHtmlContainer maxWidth="lg" ref={ref}>
      {shadowDom && createPortal(nodeToRender, shadowDom)}
    </FileHtmlContainer>
  )
}

File.propTypes = {
  site: PropTypes.object,
  file: PropTypes.object
}

FileHtml.propTypes = {
  styles: PropTypes.string,
  html: PropTypes.string
}

const FileHtmlContainer = withTheme(styled(Container)`
  width: 100%;
  max-width
`)

const IframeWrapper = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`
