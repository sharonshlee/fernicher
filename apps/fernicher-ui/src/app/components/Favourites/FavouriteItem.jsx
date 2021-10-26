import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

const FavouriteItem = ({text, index}) => {
  return (
    <ListItem button key={text}>
      <ListItemIcon>
       <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

export default FavouriteItem;
