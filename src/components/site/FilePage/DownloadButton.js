import React from 'react'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import Icon from '@material-ui/core/Icon'

import {downloadLinks} from '../../../helpers/files'

export default function DownloadButton({file, ...rest}) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const links = downloadLinks({file})

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function onDownload(link) {
    if (typeof window !== 'undefined') {
      window.location.href = link
      handleClose()
    }
    return null
  }

  const manyDownloadOptions = (
    <>
      <IconButton color="inherit" onClick={handleClick} {...rest}>
        <Icon>cloud_download</Icon>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {links.map(link => (
          <MenuItem key={link?.id} onClick={() => onDownload(link?.url)}>
            {link?.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )

  const singleDownloadOption = (
    <IconButton
      color="inherit"
      onClick={() => onDownload(links[0]?.url)}
      {...rest}
    >
      <CloudDownloadIcon />
    </IconButton>
  )

  if (links?.length > 1) return manyDownloadOptions
  else if (links?.length === 1) return singleDownloadOption

  return null
}

DownloadButton.propTypes = {
  file: PropTypes.object
}
