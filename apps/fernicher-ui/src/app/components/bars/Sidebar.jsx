import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MobileRightMenuSlider from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import '../ImageSliders/ImageSliders.scss';

import {
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  Divider,
  List,
  Box,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import LivingIcon from '@mui/icons-material/Living';
import ChairIcon from '@mui/icons-material/Chair';
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby';

// import BedroomBabyIcon from '@mui/icons-material';
// import BedIcon from '@mui/icons-material/Bed';

const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
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

const menus = {
  main: [
    {
      listIcon: <Home />,
      listText: 'Home',
      listPath: '/',
    },
    {
      listIcon: <ChairIcon />,
      listText: 'Products',
      listPath: '/products/all',
    },
    {
      listIcon: <BedroomBabyIcon />,
      listText: 'Rooms',
      listPath: '/rooms/living',
    },
  ],
  products: [
    {
      // istIcon: <ContactMail />,
      listText: 'New',
      listPath: '/products/recent',
    },
    // {
    //   // listIcon: <BedroomBabyIcon />,
    //   listText: 'Shelf',
    //   listPath: '/products/shelf',
    // },
    // {
    //   // listIcon: <BedroomBabyIcon />,
    //   listText: 'Pantry',
    //   listPath: '/products/pantry',
    // },
    {
      // listIcon: <BedroomBabyIcon />,
      listText: 'Table',
      listPath: '/products/table',
    },
    {
      // listIcon: <BedroomBabyIcon />,
      listText: 'Chair',
      listPath: '/products/chair',
    },
    {
      // listIcon: <BedIcon />,
      listText: 'Bed',
      listPath: '/products/bed',
    },
    {
      // listIcon: <BedroomBabyIcon />,
      listText: 'Kids',
      listPath: '/products/kid',
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
};

const Sidebar = ({ position, toggleSlider, open, menu }) => {

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
            to={lsItem.listPath}
            style={{ display: 'flex', flexDirection: 'column' }}
            onClick={toggleSlider(position, false, 'main')}
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
  // if position === right, for user to signup
  return (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        onClick={toggleSlider(position, true, 'main')}
      >
        <MenuIcon />
      </IconButton>

      <MobileRightMenuSlider
        anchor={position}
        open={open}
        onClose={toggleSlider(position, false, 'main')}
      >
        {sideList(position)}
      </MobileRightMenuSlider>
    </>
  );
};

export default Sidebar;
