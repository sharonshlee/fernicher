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
import { AssignmentInd, Home, Apps, ContactMail } from '@material-ui/icons';
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';

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
      listIcon: <AssignmentInd />,
      listText: 'Products',
      listPath: '/products/all',
    },
    {
      listIcon: <Apps />,
      listText: 'Rooms',
      listPath: '/rooms',
    },
    {
      listIcon: <ContactMail />,
      listText: 'Contact',
      listPath: '/rooms',
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
    // {
    //   // listIcon: <BedroomBabyIcon />,
    //   listText: 'Chair',
    //   listPath: '/products/chair',
    // },
    // {
    //   // listIcon: <BedIcon />,
    //   listText: 'Bed',
    //   listPath: '/products/bed',
    // },
    // {
    //   // listIcon: <BedroomBabyIcon />,
    //   listText: 'Kid',
    //   listPath: '/products/kid',
    // },
  ],
  rooms: [
    {
      listImage: (
        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
          alt=""
          style={{ width: '150px', height: '150px' }}
        />
      ),
      listText: 'Bedroom',
      listPath: '/rooms/bedroom',
    },
    {
      listImage: (
        <img
          src="/assets/imgs/furniture2.jpg"
          alt=""
          style={{ width: '150px', height: '150px' }}
        />
      ),
      listText: 'Living Room',
      listPath: '/rooms/living',
    },
    {
      listImage: (
        <img
          src="https://images.unsplash.com/photo-1581369596603-71209b23077f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1674&q=80"
          alt=""
          style={{ width: '150px', height: '150px' }}
        />
      ),
      listText: 'Kitchen',
      listPath: '/rooms/kitchen',
    },
    {
      listImage: (
        <img
          src="/assets/imgs/furniture4.jpg"
          alt=""
          style={{ width: '150px', height: '150px' }}
        />
      ),
      listText: 'Office',
      listPath: '/rooms/office',
    },
  ],
};

const Sidebar = (props) => {
  const { position, toggleSlider, state } = props;

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
        {menus[state.menu].map((lsItem, key) => (
          <ListItem
            button
            key={key}
            component={Link}
            to={lsItem.listPath}
            onClick={toggleSlider('right', false, 'main')}
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
        onClick={toggleSlider('right', true, 'main')}
      >
        <MenuIcon />
      </IconButton>

      <MobileRightMenuSlider
        anchor={position}
        open={state.right}
        onClose={toggleSlider('right', false, 'main')}
      >
        {sideList('right')}
      </MobileRightMenuSlider>
    </>
  );
};

export default Sidebar;
