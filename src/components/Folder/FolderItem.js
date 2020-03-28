import React, {useContext} from 'react'
import {organization, site, file} from '../../helpers/prop-types'

import Icon from '@material-ui/core/Icon'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

import {capitalizeFirstLetter} from '../../helpers/format'

import RRContext from '@s-ui/react-router/lib/ReactRouterContext'

export default function FolderItem({organization, site, data}) {
  const {router} = useContext(RRContext)
  const {id, name} = data

  return (
    <ListItem
      onClick={() =>
        router.push({
          pathname: `/${organization.name}/${site.name}/${id}`
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
  organization,
  site,
  data: file
}
