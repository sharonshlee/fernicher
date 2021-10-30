import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './app.scss';
import Navbar from './components/bars/Navbar';
import Footer from './components/Footer';
import Rooms from './components/Rooms';
import Products from './components/products/Products';
import UserProducts from './components/products/UserProducts';
import Home from './components/Home';
import Favourites from './components/Favourites/Favourites';
import BackToTop from './components/utilities/BackToTop';
import Chats from './components/Chats/Chats';
import { LoggedInProvider } from './providers/LoggedInContext';
import StateProvider from './providers/StateProvider';

const App = () => {
  return (
    <StateProvider>
      <LoggedInProvider>
        <Navbar />
        <div
          style={{
            width: '100%',
            margin: 'auto',
          }}
        >
          <Switch>
            <Route path="/users/:userid/products" component={UserProducts} />
            <Route path="/products/:cat" component={Products} />
            <Route path="/rooms/:cat" component={Rooms} />
            <Route path="/fav" component={Favourites} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/chats" component={Chats} />
            <Route path="/" component={Home} />
          </Switch>
          {/* <Route path="/" element={<Home authed={true}/>} /> */}
          <Footer />
        </div>
        <BackToTop />
      </LoggedInProvider>
    </StateProvider>
  );
};

export default App;
