import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './app.scss';
import Navbar from './components/bars/Navbar';
import Footer from './components/Footer';
import Rooms from './components/Rooms';
import Products from './components/products/Products';
import Home from './components/Home';
import Favourites from './components/Favourites/Favourites';
import ImageSliders from './components/ImageSliders/ImageSliders';
import BackToTop from './components/utilities/BackToTop';
import StateProvider from './providers/StateProvider';

const App = () => {
  return (
    <StateProvider>
      <CssBaseline />
      <Navbar />
      <ImageSliders />
      <Switch>
        <Route path="/products/:cat" component={Products} />
        <Route path="/rooms/:cat" component={Rooms} />
        <Route path="/fav" component={Favourites} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
      <BackToTop />
    </StateProvider>
  );
};

export default App;
