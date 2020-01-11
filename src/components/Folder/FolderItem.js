import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

export default function FolderItem({ site, data }) {
  return (
    <Link
      href={{
        pathname: `/${site.organizationName}/${site.name}/`,
        query: { folderId: data.id }
      }}
    >
      <FolderButton>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIosIcon />}
          className="folder-button"
        >
          {data.name}
        </Button>
      </FolderButton>
    </Link>
  )
}

const FolderButton = styled.div`
  display: flex;

  .folder-button {
    flex-grow: 1;
    justify-content: space-between;
  }
`

FolderItem.propTypes = {
  site: PropTypes.object,
  data: PropTypes.object
}
