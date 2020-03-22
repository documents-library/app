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
  // pdf *read online*
  pdf: {
    name: 'pdf',
    icon: '/img/picture.svg',
    extensions: ['pdf'],
    mimeTypes: []
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
  },
  // videos *view online*
  video: {
    name: 'video',
    icon: '/img/picture.svg',
    extensions: [
      'mp4',
      'mts',
      'webm',
      'mpg',
      'mp2',
      'mpeg',
      'mpe',
      'mpv',
      'ogg',
      'mp4',
      'm4p',
      'm4v',
      'avi',
      'wmv',
      'mov',
      'qt',
      'flv',
      'swf',
      'avchd'
    ],
    mimeTypes: ['application/vnd.google-apps.video']
  },
  folder: {
    name: 'folder',
    icon: '',
    extensions: [],
    mimeTypes: ['application/vnd.google-apps.folder']
  }
}

export function isFileType({file, typeNames}) {
  const type = getFileType({file})

  if (type) {
    return typeNames.includes(type)
  }
  return null
}

export function canReadOnline({file}) {
  const typeNames = [filetype.doc.name, filetype.pres.name, filetype.img.name]

  return isFileType({file, typeNames})
}

export function isCalc({file}) {
  const typeNames = [filetype.calc.name]

  return isFileType({file, typeNames})
}

export function isPDF({file}) {
  const typeNames = [filetype.pdf.name]

  return isFileType({file, typeNames})
}

export function isVideo({file}) {
  const typeNames = [filetype.video.name]

  return isFileType({file, typeNames})
}

export function isGarbageFile({file}) {
  const {name} = file

  if (name.charAt(0) === '~') return true
  return false
}

export function downloadLinks({file}) {
  const exportPdf = {
    id: 'exportPdf',
    label: 'Descargar PDF',
    url: `https://docs.google.com/feeds/download/documents/export/Export?id=${file.id}&exportFormat=pdf`
  }
  const copyCalcOnUserDrive = {
    id: 'copyCalcOnUserDrive',
    label: 'Abrir con Google Drive',
    url: `https://docs.google.com/spreadsheets/d/${file.id}/copy`
  }
  const exportXls = {
    id: 'exportXls',
    label: 'Descargar Excel',
    url: `https://docs.google.com/spreadsheets/d/${file.id}/export?format=xlsx&id=${file.id}`
  }
  const downloadPdf = {
    id: 'exportPdf',
    label: 'Descargar PDF',
    url: file.webContentLink
  }

  if (isCalc({file})) {
    return [exportXls, copyCalcOnUserDrive]
  }

  if (isPDF({file}) && file.webContentLink) return [downloadPdf]

  // if file can't download
  if (isVideo({file}) || (isPDF({file}) && !file.webContentLink)) return []

  return [exportPdf]
}

export function getFileIcon({file}) {
  const type = getFileType({file})

  if (type) return filetype[type].icon
  else return '/img/file.svg'
}

// size values: 'w200', 'h200', 's200'
export function getPreview({thumbnailLink, size = 's150'}) {
  const sliceTo = thumbnailLink.indexOf('=')
  const baseLink = thumbnailLink.slice(0, sliceTo)

  return `${baseLink}=${size}`
}

export function formatFileName({name}) {
  const sliceTo = name.indexOf('.')
  const fileName = sliceTo !== -1 ? name.slice(0, sliceTo) : name

  return fileName.charAt(0).toUpperCase() + fileName.slice(1)
}

function getFileType({file}) {
  const {fileExtension, mimeType} = file
  let currentFileType = null

  if (fileExtension) {
    Object.keys(filetype).forEach(type => {
      const {extensions} = filetype[type]

      if (extensions.includes(fileExtension.toLowerCase()))
        currentFileType = filetype[type].name
    })
  } else if (mimeType) {
    Object.keys(filetype).forEach(type => {
      const {mimeTypes} = filetype[type]

      if (mimeTypes.includes(mimeType)) currentFileType = filetype[type].name
    })
  }

  return currentFileType
}
