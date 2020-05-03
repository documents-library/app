const path = require('path')
const fs = require('fs')
const p2r = require('path-to-regexp')

const {DOMAIN} = require('../src/helpers/constants')
const Domain = require('../src/domain').default
const domain = new Domain()

const DEFAULT_IMAGE_SHARE =
  'https://documents.li/img/favicon/documentsLi-ogImage.png'
const indexHTML = fs.readFileSync(
  path.join(__dirname, '../public/index.html'),
  'utf8'
)

module.exports = async (req, res) => {
  // TODO: map is the only filter I need?
  const mapUrl = req.url.match('^/(.+).(map)$')
  if (mapUrl) return onSend()

  const url = DOMAIN + req.url
  const match = p2r.match('/:org?/:repo?/:folderID?/:fileID?')
  const {params} = match(req.url)
  const {org, repo, folderID, fileID} = params || {}

  if (fileID) {
    const organization = await domain
      .get('get_info_organization_use_case')
      .execute({name: org})

    const repository = await domain
      .get('get_info_repository_use_case')
      .execute({name: repo})

    const file = await domain
      .get('get_info_file_use_case')
      .execute({organizationName: org, repository, fileID})

    const {name: orgName} = organization
    const {name: repoName, description} = repository
    const {name: fileName, thumbnailLink} = file
    const image = thumbnailLink
      ? getPreview({thumbnailLink, size: `w1080`})
      : DEFAULT_IMAGE_SHARE
    const htmlTags = createHtmlTags({
      url,
      image,
      title: `${fileName} - ${repoName} - ${orgName} | Documents Library`,
      description: description || 'Librería de documentos',
      ogType: 'article',
      twitterCard: 'summary_large_image'
    })

    return onSend(createIndexHtml(indexHTML, htmlTags))
  }

  if (folderID) {
    const organization = await domain
      .get('get_info_organization_use_case')
      .execute({name: org})
    const repository = await domain
      .get('get_info_repository_use_case')
      .execute({name: repo})
    const folder = await domain
      .get('get_info_folder_use_case')
      .execute({organizationName: org, repository, folderID})

    const {name: orgName} = organization
    const {name: repoName, description} = repository
    const {
      currentFolder: {name: folderName}
    } = folder
    const htmlTags = createHtmlTags({
      url,
      title: `${folderName} - ${repoName} - ${orgName} | Documents Library`,
      description: description || 'Librería de documentos'
    })

    return onSend(createIndexHtml(indexHTML, htmlTags))
  }

  if (repo) {
    const organization = await domain
      .get('get_info_organization_use_case')
      .execute({name: org})
    const repository = await domain
      .get('get_info_repository_use_case')
      .execute({name: repo})

    const {name: orgName} = organization
    const {name: repoName, description} = repository
    const htmlTags = createHtmlTags({
      url,
      title: `${repoName} - ${orgName} | Documents Library`,
      description: description || 'Librería de documentos'
    })

    return onSend(createIndexHtml(indexHTML, htmlTags))
  }

  if (org) {
    const organization = await domain
      .get('get_info_organization_use_case')
      .execute({name: params.org})

    const {name, description} = organization
    const htmlTags = createHtmlTags({
      url,
      title: `${name} | Documents Library`,
      description: description || 'Librería de documentos'
    })

    return onSend(createIndexHtml(indexHTML, htmlTags))
  }

  function onSend(newHtml) {
    res.setHeader('Content-Type', 'text/html')
    const html = newHtml || indexHTML

    return res.send(html)
  }
}

function createIndexHtml(indexHTML, htmlTags) {
  const headIndex = indexHTML.indexOf('<head>')
  const newIndexHtml = spliceString(indexHTML, headIndex + 6, 0, htmlTags)

  return newIndexHtml
}

function createHtmlTags({
  ogType = 'website',
  title = 'Documents Library',
  description = 'Librería de documentos',
  siteName = 'documents.li',
  image = DEFAULT_IMAGE_SHARE,
  twitterCard = 'summary',
  url
}) {
  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />

    <meta name="twitter:url" content="${url}" />
    <meta name="twitter:card" content="${twitterCard}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />

    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1080" />
    <meta property="og:image:height" content="1382" />
  `
}

function spliceString(string, idx, rem, newStr) {
  return string.slice(0, idx) + newStr + string.slice(idx + Math.abs(rem))
}
function getPreview({thumbnailLink, size = 's150'}) {
  const sliceTo = thumbnailLink.indexOf('=')
  const baseLink = thumbnailLink.slice(0, sliceTo)

  return `${baseLink}=${size}`
}
