import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
// import Button from '@material-ui/core/Button'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import { dateRelativeFormat } from '../../helpers/format'
import Router from 'next/router'

export default function FolderItem({ site, data }) {
  console.log(data)
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
      <ListItemText
        primary={data.name}
        secondary={dateRelativeFormat({ date: data.modifiedTime })}
      />

      <ListItemSecondaryAction>
        <ArrowForwardIosIcon />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

// const FolderButton = styled.div`
//   display: flex;
//
//   .folder-button {
//     flex-grow: 1;
//     justify-content: space-between;
//   }
// `

FolderItem.propTypes = {
  site: PropTypes.object,
  data: PropTypes.object
}
