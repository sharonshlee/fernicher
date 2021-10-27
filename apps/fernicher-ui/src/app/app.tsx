import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './app.scss';
import Navbar from './components/Bars/Navbar';
import Footer from './components/Footer';
import Rooms from './components/Rooms';
import Products from './components/products/Products';
import Home from './components/Home';
import Login from './components/Login';
import Favourites from './components/Favourites/Favourites';
import ImageSliders from './components/ImageSliders/ImageSliders';
import BackToTop from './components/utilities/BackToTop';
import Chat from './components/Chat/Chat';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <ImageSliders />
      <Router>
        <Switch>
          <Route path="/products/:cat" component={Products} />
          <Route path="/rooms/:cat" component={Rooms} />
          <Route path="/fav" component={Favourites} />
          <Route path="/login" component={Login} />
          <Route path="/">
            <Home />
            <Chat />
          </Route>
        </Switch>
      </Router>
      {/* <Route path="/" element={<Home authed={true}/>} /> */}
      <Footer />
      <BackToTop />
    </>
  );
};

export default App;
