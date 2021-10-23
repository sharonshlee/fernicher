import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import "./App.scss";
// import useApplicationData from "./components/useApplicationData";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      <Map usersAndProducts={usersAndProducts} />
      <Footer />
    </>
  );
};

export default App;
