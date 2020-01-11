export const filetype = {
  // Documents and PDFs *read online*
  doc: {
    name: 'document',
    icon: '',
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
    ]
  },
  // presentations *read online*
  pres: {
    name: 'presentation',
    icon: '',
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
    ]
  },
  // spreadsheet (download)
  calc: {
    name: 'spreadsheet',
    icon: '',
    extensions: ['ods', 'ots', 'xls', 'xlt', 'xlsx', 'xltx']
  },
  // photos *view online*
  img: {
    name: 'image',
    icon: '',
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
    ]
  },
  // photos and drawings (download)
  pict: {
    name: 'pictures',
    icon: '',
    extensions: ['odg', 'eps', 'ai', 'cdr', 'wmf']
  },
  // cad drawings (download)
  cad: { name: 'cadDrawing', icon: '', extensions: ['dwg', 'dxf'] }
}

export function isFileType({ extension, typeNames }) {
  const type = getFileType({ extension })

  return typeNames.include(type.name)
}

export function canReadOnline({ extension }) {
  const typeNames = [filetype.doc, filetype.pres, filetype.img]

  return isFileType({ extension, typeNames })
}

export function getFileIcon({ extension }) {
  const type = getFileType({ extension })

  if (type) return type.icon
  else return '' // TODO add icon for default file
}

function getFileType({ extension }) {
  let currentFileType = null

  Object.keys(filetype).forEach(type => {
    const { extensions } = filetype[type]

    if (extensions.include(extension)) currentFileType = type
  })

  return currentFileType
}

