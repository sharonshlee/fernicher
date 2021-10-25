import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import './app.scss';
import Map from './components/Map/Map';
import Navbar from './components/bars/Navbar';
import Footer from './components/Footer';
import Rooms from './components/Rooms';
import Products from './components/products/Products';
import Sidebar from './components/bars/Sidebar';
// import Home from "./components/Home";
import Favourites from './components/Favourites';
import ImageSliders from './components/ImageSliders/ImageSliders';
import BackToTop from './components/utilities/BackToTop';
import { map } from 'lodash';

const App = () => {
  const [usersAndProducts, setUsersAndProducts] = useState([]);
  // const { state, dispatch } = useApplicationData();

  useEffect(() => {
    axios
      .post<any[]>('/api/users')
      .then((res) => {
        const products: any = [];
        map(res.data, (user) => {
          products.push(
            ...map(user.products, (product) => ({ ...product, user }))
          );
        });
        setUsersAndProducts(products);
      })
      .catch((err) => console.log('ERR HAPPENED', err));
  }, []);

  return (
    <>
      <CssBaseline />
      <Navbar />
      <ImageSliders />
      {/* <Route path="/" component={Home} /> */}
      <Route path="/sidebar" component={Sidebar} />
      <Route path="/products/:cat" component={Products} />
      <Route path="/rooms" component={Rooms} />
      <Route path="/fav" component={Favourites} />
      <Route path="/footer" component={Footer} />
      <Map usersAndProducts={usersAndProducts} />
      <Footer />
      <BackToTop />
    </>
  );
};

export default App;
