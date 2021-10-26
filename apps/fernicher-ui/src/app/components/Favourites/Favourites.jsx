import React, { useState, useEffect } from "react";
import FavouritesDrawer from "./FavouritesDrawer";
import axios from 'axios';

const Favourites = (props) => {
const [drawerToggle, setDrawerToggle] = useState(false);

useEffect(() => {
  axios
    .post<[]>('/api/products')
    .then((res) => {
      setUsersAndProducts(res.data);
    })
    .catch((err) => console.log('ERR HAPPENED', err));
}, []);

  return (
    <FavouritesDrawer />
  );
}

export default Favourites;
