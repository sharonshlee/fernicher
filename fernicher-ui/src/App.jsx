import React, { useState, useEffect } from "react";
import axios from 'axios'
import "./App.scss";
import useApplicationData from "./components/useApplicationData";
import Map from "./components/Map/Map";



const App = () => {
  const [usersAndProducts, setUsersAndProducts] = useState([]); 

  useEffect(() => {
    axios
      .get("/users/products")
      .then((res) => {
        setUsersAndProducts(res.data)
      })
      .catch((err) => console.log("ERR HAPPENED", err));
  }, [])
  
  return (
    <div className="App">
      <Map usersAndProducts = {usersAndProducts} />
    </div>
  );
};

export default App;
