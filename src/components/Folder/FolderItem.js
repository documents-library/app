import React from 'react'
import PropTypes from 'prop-types'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Router from 'next/router'

export default function FolderItem({ site, data }) {
  return (
    <ListItem
      onClick={() =>
        Router.push({
          pathname: `/${site.organizationName}/${site.name}/`,
          query: { folderId: data.id }
        })
      }
      divider
      button
    >
      <ListItemText primary={data.name} />

      <ListItemSecondaryAction>
        <ArrowForwardIosIcon />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

FolderItem.propTypes = {
  site: PropTypes.object,
  data: PropTypes.object
}
