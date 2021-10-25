import React, { useState } from "react";
import FavouritesDrawer from "./FavouritesDrawer";
import { Drawer } from '@mui/material';
const Favourites = (props) => {
const [drawerToggle, setDrawerToggle] = useState(false);
  return (
    <FavouritesDrawer />
  );
}

export default Favourites;
