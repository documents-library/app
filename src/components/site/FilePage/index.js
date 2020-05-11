import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {site, file} from '../../../helpers/prop-types'
import styled from 'styled-components'
import {createPortal} from 'react-dom'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Cookie from 'cookie-universal'
import Tooltip from '@material-ui/core/Tooltip'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'
import Icon from '@material-ui/core/Icon'

import Layout from '../../../components/Layout'
import {theme} from '../../../helpers/theme'
import {formatFileName, getPreview} from '../../../helpers/files'
import DownloadButton from './DownloadButton'

export const FileHtmlContainer = styled(Container)`
  width: 100%;
  height: 100%;
`

const IframeWrapper = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  flex-grow: 1;
`

export default function File({site, file, isCrawler}) {
  const cookies = Cookie()
  const [embedHtml, setEmbedHtml] = useState(cookies.get('embedHtml'))
  const viewerUrl = `https://docs.google.com/file/d/${file?.id}/preview`
  const image = file?.thumbnailLink
    ? getPreview({thumbnailLink: file?.thumbnailLink, size: `w600`})
    : 'https://documents.li/img/favicon/documentsLi-ogImage.png'
  const isOnline = window.navigator.onLine

  useEffect(() => {
    cookies.set('embedHtml', embedHtml)
  }, [cookies, embedHtml])

  useEffect(() => {
    if (!isOnline && file?.html) setEmbedHtml(true)
  }, [file, file.html, isOnline])

  function fileViewer() {
    // on a crawler the shadow dom not work
    if (file?.html && isCrawler) {
      return (
        <div
          className="filehtml-wrapper"
          dangerouslySetInnerHTML={createMarkup(file?.html)}
        />
      )
    } else if (file?.html && embedHtml) {
      return <FileHtml html={file?.html} styles={fileHtmlStyles()} />
    } else if (isOnline) {
      return <IframeWrapper src={viewerUrl} />
    }

    return <p>Este documento no puede mostrarse sin conexión a internet</p>
  }

  return (
    <Layout
      title={formatFileName({name: file?.name})}
      goBackTo={file?.previousPagePathname}
      meta={{
        ogType: 'article',
        twitterCard: 'summary_large_image',
        title: `${file?.name} | ${site?.name || 'Documents Library'}`,
        description: `${site?.organizationName}`,
        siteName: 'documents.li',
        image
      }}
      actions={
        <>
          {file?.html && (
            <IconButton
              color="inherit"
              onClick={() => setEmbedHtml(!embedHtml)}
              disabled={!navigator?.onLine}
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
          <DownloadButton file={file} disabled={!navigator?.onLine} />
        </>
      }
      background="#fafafa"
    >
      {fileViewer()}
    </Layout>
  )
}

// Implement shadow dom to isolate the styles of the html
function FileHtml({styles, html}) {
  const ref = useRef()
  const [shadowDom, setShadowDom] = useState()

  useEffect(() => {
    setShadowDom(ref.current.attachShadow({mode: 'open'}))
  }, [])

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

export function CopyUrlButton() {
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

function createMarkup(html) {
  return {__html: html}
}

File.propTypes = {
  site,
  file,
  isCrawler: PropTypes.bool
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
