import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MobileRightMenuSlider from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";

import {
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  Avatar,
  Divider,
  List,
  Box,
} from "@material-ui/core";
import { AssignmentInd, Home, Apps, ContactMail } from "@material-ui/icons";
import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";

const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: 250,
    background: "white",
    height: "100%",
  },
  logo: {
    display: "block",
    margin: "0.5rem auto",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  listItem: {
    color: "black",
  },
}));

const menuItems = [
  {
    listIcon: <Home />,
    listText: "Home",
    listPath: "/",
  },
  {
    listIcon: <AssignmentInd />,
    listText: "Products",
    listPath: "/footer",
  },
  {
    listIcon: <Apps />,
    listText: "Rooms",
    listPath: "/rooms",
  },
  {
    listIcon: <ContactMail />,
    listText: "Contact",
    listPath: "/rooms",
  },
];

const Sidebar = (props) => {
  const { position, toggleSlider, state } = props;

  const classes = useStyles();

  const sideList = (slider) => (
    <Box
      className={classes.menuSliderContainer}
      component="div"
      onClick={toggleSlider(slider, false)}
    >
      <LoyaltyOutlinedIcon className={classes.logo} />
      <Divider />
      <List>
        {menuItems.map((lsItem, key) => (
          <ListItem button key={key} component={Link} to={lsItem.listPath}>
            <ListItemIcon className={classes.listItem}>
              {lsItem.listIcon}
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
        onClick={toggleSlider("right", true)}
      >
        <MenuIcon />
      </IconButton>

      <MobileRightMenuSlider
        anchor={position}
        open={state.right}
        onClose={toggleSlider("right", false)}
      >
        {sideList("right")}
      </MobileRightMenuSlider>
    </>
  );
};

export default Sidebar;
