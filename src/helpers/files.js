export const filetype = {
  // Documents and PDFs *read online*
  doc: {
    name: 'doc',
    icon: '/img/document.svg',
    extensions: [
      'doc',
      'dot',
      'docx',
      'docm',
      'dotx',
      'dotm',
      'pdf',
      'odt',
      'ott',
      'odm',
      'htm',
      'html',
      'rtf',
      'txt'
    ],
    mimeTypes: ['application/vnd.google-apps.document']
  },
  // presentations *read online*
  pres: {
    name: 'pres',
    icon: '/img/presentation.svg',
    extensions: [
      'odp',
      'otp',
      'ppt',
      'pot',
      'pps',
      'pptx',
      'potx',
      'ppsx',
      'sldx'
    ],
    mimeTypes: ['application/vnd.google-apps.presentation']
  },
  // spreadsheet (download)
  calc: {
    name: 'calc',
    icon: '/img/spreadsheet.svg',
    extensions: ['ods', 'ots', 'xls', 'xlt', 'xlsx', 'xltx'],
    mimeTypes: ['application/vnd.google-apps.spreadsheet']
  },
  // photos *view online*
  img: {
    name: 'img',
    icon: '/img/picture.svg',
    extensions: [
      'jpg',
      'jpeg',
      'jfif',
      'pjpeg',
      'pjp',
      'gif',
      'svg',
      'png',
      'apng',
      'bmp',
      'tiff',
      'webp'
    ],
    mimeTypes: ['application/vnd.google-apps.photo']
  },
  // photos and drawings (download)
  pict: {
    name: 'pict',
    icon: '/img/picture.svg',
    extensions: ['odg', 'eps', 'ai', 'cdr', 'wmf'],
    mimeTypes: ['application/vnd.google-apps.drawing']
  },
  // cad drawings (download)
  cad: {
    name: 'cad',
    icon: '/img/cad.svg',
    extensions: ['dwg', 'dxf', '3ds', 'blend'],
    mimeTypes: []
  }
}

export function isFileType({ file, typeNames }) {
  const type = getFileType({ file })

  if (type) {
    return typeNames.includes(type)
  }
  return null
}

export function canReadOnline({ file }) {
  const typeNames = [filetype.doc.name, filetype.pres.name, filetype.img.name]

  return isFileType({ file, typeNames })
}

export function getFileIcon({ file }) {
  const type = getFileType({ file })

  if (type) return filetype[type].icon
  else return '/img/file.svg'
}

// size values: 'w200', 'h200', 's200'
export function getPreview({ thumbnailLink, size = 'w606' }) {
  const sliceTo = thumbnailLink.indexOf('=')
  const baseLink = thumbnailLink.slice(0, sliceTo)

  return `${baseLink}=${size}`
}

function getFileType({ file }) {
  const { fileExtension, mimeType } = file
  let currentFileType = null

  if (fileExtension) {
    Object.keys(filetype).forEach(type => {
      const { extensions } = filetype[type]

      if (extensions.includes(fileExtension.toLowerCase()))
        currentFileType = filetype[type].name
    })
  } else if (mimeType) {
    Object.keys(filetype).forEach(type => {
      const { mimeTypes } = filetype[type]

      if (mimeTypes.includes(mimeType)) currentFileType = filetype[type].name
    })
  }

  return currentFileType
}
