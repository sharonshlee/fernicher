import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import "./App.scss";
import Map from "./components/Map/Map";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Rooms from "./components/Rooms";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Favourites from "./components/Favourites";

const App = () => {
  const [usersAndProducts, setUsersAndProducts] = useState([]);
  // const { state, dispatch } = useApplicationData();

  useEffect(() => {
    axios
      .get("/users/products")
      .then((res) => {
        setUsersAndProducts(res.data);
      })
      .catch((err) => console.log("ERR HAPPENED", err));
  }, []);

  return (
    <>
      <CssBaseline />
      <Navbar />
      {/* <Route path="/" component={Home} /> */}
      <Route path="/sidebar" component={Sidebar} />
      <Route path="/rooms" component={Rooms} />
      <Route path="/fav" component={Favourites} />
      <Route path="/footer" component={Footer} />
      <Map usersAndProducts={usersAndProducts} />
      <Footer />
    </>
  );
};

export default App;
