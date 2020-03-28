import PropTypes from 'prop-types'

export const file = PropTypes.shape({
  kind: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  mimeType: PropTypes.string,
  starred: PropTypes.string,
  trashed: PropTypes.string,
  explicitlyTrashed: PropTypes.string,
  webContentLink: PropTypes.string,
  iconLink: PropTypes.string,
  thumbnailLink: PropTypes.string,
  modifiedTime: PropTypes.string,
  fileExtension: PropTypes.string,
  size: PropTypes.string
})

export const folderID = PropTypes.string

export const folder = PropTypes.shape({
  id: folderID,
  kind: PropTypes.string,
  incompleteSearch: PropTypes.string,
  files: PropTypes.arrayOf(file),
  currentFolder: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    parents: PropTypes.arrayOf(PropTypes.string)
  })
})

export const site = PropTypes.shape({
  _id: PropTypes.string,
  desciption: PropTypes.string,
  googleFolderId: PropTypes.string,
  longName: PropTypes.string,
  name: PropTypes.string
})

export const organization = PropTypes.shape({
  _id: PropTypes.string,
  desciption: PropTypes.string,
  longName: PropTypes.string,
  name: PropTypes.string,
  sites: PropTypes.arrayOf(site)
})
