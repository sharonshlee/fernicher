import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MobileRightMenuSlider from '@material-ui/core/Drawer';
import '../ImageSliders/ImageSliders.scss';

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  List,
  Box,
} from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { Home } from '@material-ui/icons';
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import ChairIcon from '@mui/icons-material/Chair';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import ContactsIcon from '@mui/icons-material/Contacts';
import { stateContext } from '../../providers/StateProvider';
import { LoggedInContext } from '../../providers/LoggedInContext';
import { map } from 'lodash';

const Sidebar = ({ position, toggleSlider, open, menu }) => {
  const useStyles = makeStyles((theme) => ({
    menuSliderContainer: {
      width: menu === 'favourites' ? 550 : 250,
      background: 'white',
      height: '100%',
    },
    logo: {
      display: 'block',
      margin: '0.5rem auto',
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    listItem: {
      color: 'black',
    },
  }));
  const [menus, setMenus] = useState({
    main: [
      {
        listIcon: <Home />,
        listText: 'Home',
        listPath: '/',
      },
      {
        listIcon: <ChairIcon />,
        listText: 'Furnitures',
        listPath: '/products/all',
      },
      {
        listIcon: <BedroomParentIcon />,
        listText: 'Rooms',
        listPath: '/rooms/living',
      },
    ],
    products: [
      {
        listText: 'All Furnitures',
        listPath: '/products/all',
      },
      {
        listText: 'Most Popular',
        listPath: '/products/popular',
      },
      {
        listText: 'Most Recent',
        listPath: '/products/recent',
      },

      {
        listText: 'Table',
        listPath: '/products/table',
      },
      {
        listText: 'Chair',
        listPath: '/products/chair',
      },
      {
        listText: 'Bed',
        listPath: '/products/bed',
      },
    ],
    rooms: [
      {
        listImage: (
          <img
            src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
            alt=""
            style={{ height: '140px' }}
          />
        ),
        listText: 'Living Room',
        listPath: '/rooms/living',
      },
      {
        listImage: (
          <img
            src="https://images.unsplash.com/photo-1571508601936-6ca847b47ae4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2071&q=80"
            alt=""
            style={{ height: '140px' }}
          />
        ),
        listText: 'Bedroom',
        listPath: '/rooms/bedroom',
      },

      {
        listImage: (
          <img
            src="https://images.unsplash.com/photo-1581369596603-71209b23077f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1674&q=80"
            alt=""
            style={{ width: '225px', height: '140px' }}
          />
        ),
        listText: 'Kitchen',
        listPath: '/rooms/kitchen',
      },
      {
        listImage: (
          <img
            src="https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
            alt=""
            style={{ width: '225px', height: '140px' }}
          />
        ),
        listText: 'Office',
        listPath: '/rooms/office',
      },
    ],
    favourites: [
      {
        listText: 'Favourites',
        listPath: '/fav',
      },
    ],
  });
  const { setProductOnMap } = useContext(stateContext);
  const { state: loggedInUser } = useContext(LoggedInContext);

  useEffect(() => {
    if (menu === 'favourites' && loggedInUser) {
      const menuFavourites = map(loggedInUser.favourites, (favourite) => ({
        listText: `${favourite.product.name}`,
        listPath: '/',
        listImage: (
          <img
            src={favourite.product.image}
            alt={favourite.product.name}
            style={{ width: '25vw' }}
          />
        ),
        latlng: [
          favourite.product.productLocation[0],
          favourite.product.productLocation[1],
        ],
        onClick: () => {
          setProductOnMap(favourite.product);
        },
      }));
      setMenus((prev) => ({
        ...prev,
        favourites: menuFavourites,
      }));
    }
  }, [menu, loggedInUser]);

  const classes = useStyles();

  const sideList = (slider) => (
    <Box
      className={classes.menuSliderContainer}
      component="div"
      onClick={(e) => {
        e.preventDefault();
        toggleSlider(slider, false, 'main');
      }}
    >
      <LoyaltyOutlinedIcon className={classes.logo} />
      <Divider />
      <List>
        {menus[menu].map((lsItem, key) => (
          <ListItem
            button
            key={key}
            component={Link}
            ContainerProps={lsItem.latlng}
            to={lsItem.listPath}
            style={{ display: 'flex', flexDirection: 'column' }}
            onClick={() => {
              lsItem.onClick && lsItem.onClick();
            }}
          >
            <ListItemIcon className={classes.listItem}>
              {lsItem.listIcon && lsItem.listIcon}
              {lsItem.listImage && lsItem.listImage}
            </ListItemIcon>
            <ListItemText
              className={classes.listItem}
              primary={lsItem.listText}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <MobileRightMenuSlider
      anchor={position}
      open={open}
      onClose={toggleSlider(position, false, menu)}
    >
      {sideList(position)}
    </MobileRightMenuSlider>
  );
};

export default Sidebar;
