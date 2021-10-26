import React from 'react';

import FavouriteItem from './FavouriteItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const FavouritesList = ({usersAndProducts, toggleDrawer, anchor, text}) => {

  return (
  <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    role="presentation"
    onClick={toggleDrawer(anchor, true)}
    onKeyDown={toggleDrawer(anchor, true)}
  >
    <List>
      <FavouriteItem text={text}/>
      <Divider/>
    </List>
  </Box>
  )
}

export default FavouritesList;
