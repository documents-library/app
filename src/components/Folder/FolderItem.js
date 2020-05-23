import React from 'react'
import styled from 'styled-components'
import {organization, site, file} from '../../helpers/prop-types'

import Icon from '@material-ui/core/Icon'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Link from '../Link'

import {capitalizeFirstLetter} from '../../helpers/format'

const FolerItemWrapper = styled(ListItem)`
  ${props => (props.disabled ? 'opacity: .5;' : '')}
`

export default function FolderItem({organization, site, data}) {
  const {id, name} = data
  return (
    <Link
      to={{
        pathname: `/${organization.name}/${site.name}/section/${id}`
      }}
    >
      <FolerItemWrapper divider button>
        <ListItemText primary={capitalizeFirstLetter(name)} />

        <ListItemSecondaryAction>
          <Icon color="action">keyboard_arrow_right</Icon>
        </ListItemSecondaryAction>
      </FolerItemWrapper>
    </Link>
  )
}

FolderItem.propTypes = {
  organization,
  site,
  data: file
}
