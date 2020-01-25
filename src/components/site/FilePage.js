import React, { useEffect, useRef, useState } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import Container from '@material-ui/core/Container'
import Cookie from 'cookie-universal'
import Tooltip from '@material-ui/core/Tooltip'

import Layout from '../../components/Layout'
import { theme } from '../../helpers/theme'

export default function File({ site, file }) {
  const cookies = Cookie()
  // TODO: if is a crawler show allways the embedhtml version
  const [embedHtml, setEmbedHtml] = useState(cookies.get('embedHtml'))
  const viewerUrl = `https://docs.google.com/file/d/${file.id}/preview` // same viewer on another url: `https://docs.google.com/viewer?srcid=${file.id}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`

  useEffect(() => {
    cookies.set('embedHtml', embedHtml)
  }, [embedHtml])

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
            {embedHtml ? (
              <Tooltip
                title="Desactivar vista de lectura"
                placement="bottom-end"
              >
                <VisibilityOffIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Activar vista de lectura" placement="bottom-end">
                <VisibilityIcon />
              </Tooltip>
            )}
          </IconButton>
        )
      }
    >
      {file.html && embedHtml ? (
        <FileHtml html={file.html} styles={fileHtmlStyles()} />
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
        lan="es"
      />
    </>
  )

  return (
    <FileHtmlContainer maxWidth="md" ref={ref}>
      <>{shadowDom && createPortal(nodeToRender, shadowDom)}</>
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

const FileHtmlContainer = styled(Container)`
  width: 100%;
  max-width
`

const IframeWrapper = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`
function fileHtmlStyles() {
  const robotoSlab = `
    color: ${theme.palette.primary.dark};
    font-family: 'Domine', serif;
    text-align: justify;
    text-decoration: none;
    hyphens: auto;
  `

  return `
    .filehtml-wrapper img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 1.5rem auto;
    }

    .filehtml-wrapper p {
      margin: 1em 0;
      line-height: 2em;
      ${robotoSlab}
    }

    .filehtml-wrapper p span,
    .filehtml-wrapper li,
    .filehtml-wrapper li span {
      font-size: 1.3rem;
      ${robotoSlab}
      line-height: ${theme.typography.body1.lineHeight};
    }

    .filehtml-wrapper h1,
    .filehtml-wrapper h1 span {
      font-size: ${theme.typography.h1.fontSize};
      ${robotoSlab}
      line-height: ${theme.typography.h1.lineHeight};
    }

    .filehtml-wrapper h2,
    .filehtml-wrapper h2 span {
      font-size: ${theme.typography.h2.fontSize};
      ${robotoSlab}
      line-height: ${theme.typography.h2.lineHeight};
    }

    .filehtml-wrapper h3,
    .filehtml-wrapper h3 span {
      font-size: ${theme.typography.h3.fontSize};
      ${robotoSlab}
      line-height: ${theme.typography.h3.lineHeight};
    }

    .filehtml-wrapper h4,
    .filehtml-wrapper h4 span {
      font-size: ${theme.typography.h4.fontSize};
      ${robotoSlab}
      line-height: ${theme.typography.h4.lineHeight};
    }

    .filehtml-wrapper h5,
    .filehtml-wrapper h5 span {
      font-size: ${theme.typography.h5.fontSize};
      ${robotoSlab}
      line-height: ${theme.typography.h5.lineHeight};
    }

    .filehtml-wrapper h6,
    .filehtml-wrapper h6 span {
      font-size: ${theme.typography.h6.fontSize};
      ${robotoSlab}
      line-height: ${theme.typography.h6.lineHeight};
    }

    .filehtml-wrapper a {
      ${robotoSlab}
      border-bottom: .15em solid ${theme.palette.primary.main};
    }

    @media (max-width: ${theme.breakpoints.values.sm}px) {
      .filehtml-wrapper p span,
      .filehtml-wrapper li,
      .filehtml-wrapper li span {
        font-size: 1rem;
      }
    }
  `
}
