import React, { useEffect, useRef, useState } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Cookie from 'cookie-universal'
import Tooltip from '@material-ui/core/Tooltip'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'
import Icon from '@material-ui/core/Icon'

import Layout from '../../../components/Layout'
import { theme } from '../../../helpers/theme'
import { formatFileName, getPreview } from '../../../helpers/files'
import DownloadButton from './DownloadButton'

const FileHtmlContainer = styled(Container)`
  width: 100%;
`

const IframeWrapper = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  flex-grow: 1;
`

export default function File({ site, file }) {
  const cookies = Cookie()
  // TODO: if is a crawler show allways the embedhtml version
  const [embedHtml, setEmbedHtml] = useState(cookies.get('embedHtml'))
  const viewerUrl = `https://docs.google.com/file/d/${file.id}/preview`
  const image =
    file && file.thumbnailLink
      ? getPreview({ thumbnailLink: file.thumbnailLink, size: `w1080` })
      : 'https://documents.li/img/favicon/documentsLi-ogImage.png'

  useEffect(() => {
    cookies.set('embedHtml', embedHtml)
  }, [embedHtml])

  return (
    <Layout
      title={formatFileName({ name: file.name })}
      onGoBack={() =>
        Router.push({
          pathname: `/${site.organizationName}/${site.name}/`,
          query: { folderId: file.parents[0] }
        })
      }
      meta={{
        ogType: 'website',
        title: `${file.name} | Documents Library`,
        description: `${site.organizationName} - ${site.name}`,
        siteName: 'documents.li',
        image
      }}
      actions={
        <>
          {file.html && (
            <IconButton
              color="inherit"
              onClick={() => setEmbedHtml(!embedHtml)}
            >
              {embedHtml ? (
                <Tooltip
                  title="Desactivar vista de lectura"
                  placement="bottom-end"
                >
                  <Icon>visibility_off</Icon>
                </Tooltip>
              ) : (
                <Tooltip
                  title="Activar vista de lectura"
                  placement="bottom-end"
                >
                  <Icon>visibility</Icon>
                </Tooltip>
              )}
            </IconButton>
          )}

          <CopyUrlButton />
          <DownloadButton file={file} />
        </>
      }
      background="#fafafa"
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

function CopyUrlButton() {
  const [copied, setCopied] = useState(false)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : null

  function handleOnCopy() {
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    currentUrl && (
      <CopyToClipboard text={currentUrl} onCopy={handleOnCopy}>
        {!copied ? (
          <IconButton color="inherit">
            <Icon>link</Icon>
          </IconButton>
        ) : (
          <Box alignItems="center" display="flex">
            <Chip label="URL copiada al portapapeles" clickable={false} />
          </Box>
        )}
      </CopyToClipboard>
    )
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

function fileHtmlStyles() {
  const robotoSlab = `
    color: #324249;
    font-family: 'Vollkorn', serif;
    text-align: left;
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
      font-size: 1.5rem;
      ${robotoSlab}
      line-height: ${theme.typography.body1.lineHeight};
      overflow-x: hidden;
      overflow-y: visible;
      text-overflow: ellipsis;
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
      background-color: #ECEFF1;
      position: relative;
      font-weight: bold;
      max-width: 100%;
      overflow-x: hidden;
      overflow-y: visible;
      text-overflow: ellipsis;
      padding: 0 .6em;
    }

    .filehtml-wrapper a:hover,
    .filehtml-wrapper a:active {
      background-color: ${theme.palette.primary.main};
      color: ${theme.palette.primary.contrastText};
      transition: background-color ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.aseIn};
      border: 0;
    }

    .filehtml-wrapper ol,
    .filehtml-wrapper ul {
      padding: 0 0 0 1em;
      max-width: 100%;
    }

    .filehtml-wrapper table {
      max-width: 100%;
      overflow-x: scroll;
      display: block;
    }

    .filehtml-wrapper table {
      border: 4px solid #CFD8DC;
      border-collapse: collapse;
    }

    .filehtml-wrapper td {
      padding: .2rem .4rem;
      margin: 0;
      border-bottom: 1px solid #CFD8DC;
    }

    .filehtml-wrapper tr:last-child td{
      border-bottom: none;
    }

    .filehtml-wrapper td p, 
    .filehtml-wrapper td p span {
      font-size: 1.2rem;
      margin: .2em 0;
    }

    @media (max-width: ${theme.breakpoints.values.sm}px) {
      .filehtml-wrapper p span,
      .filehtml-wrapper li,
      .filehtml-wrapper li span {
        font-size: 1.2rem;
      }
    }
  `
}
