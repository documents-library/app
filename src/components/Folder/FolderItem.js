import React from 'react'
import PropTypes from 'prop-types'
import Icon from '@material-ui/core/Icon'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Router from 'next/router'

import { capitalizeFirstLetter } from '../../helpers/format'

export default function FolderItem({ site, data }) {
  const { id, name } = data

  return (
    <ListItem
      onClick={() =>
        Router.push({
          pathname: `/${site.organizationName}/${site.name}/`,
          query: { folderId: id }
        })
      }
      divider
      button
    >
      <ListItemText primary={capitalizeFirstLetter(name)} />

      <ListItemSecondaryAction>
        <Icon color="action">keyboard_arrow_right</Icon>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

FolderItem.propTypes = {
  site: PropTypes.object,
  data: PropTypes.object
}
