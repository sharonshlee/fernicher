import React, { useState, useEffect } from "react";
import FavouritesDrawer from "./FavouritesDrawer";
import axios from 'axios';

const Favourites = (props) => {
const [usersAndProducts, setUsersAndProducts] = useState(null);

useEffect(() => {
  axios
    .post('/api/users')
    .then((res) => {
      setUsersAndProducts(res.data);
    })
    .catch((err) => console.log(err));
}, []);

  return (
    <FavouritesDrawer usersAndProducts={usersAndProducts}/>
  );
}

export default Favourites;
