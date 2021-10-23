import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MobileRightMenuSlider from "@material-ui/core/Drawer";

import {
  AppBar,
  Toolbar,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  Avatar,
  Divider,
  List,
  Typography,
  Box,
  ThemeProvider,
} from "@material-ui/core";
import {
  ArrowBack,
  AssignmentInd,
  Home,
  Apps,
  ContactMail,
} from "@material-ui/icons";
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
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  listItem: {
    color: "black",
  },
}));

const menuItems = [
  {
    listIcon: <Home />,
    listText: "Home",
  },
  {
    listIcon: <AssignmentInd />,
    listText: "Products",
  },
  {
    listIcon: <Apps />,
    listText: "Rooms",
  },
  {
    listIcon: <ContactMail />,
    listText: "Contact",
  },
];

const Navbar = () => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };

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
          <ListItem button key={key}>
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

  return (
    <>
      <Box component="nav">
        <AppBar position="static" style={{ background: "white" }}>
          <Toolbar>
            <IconButton onClick={toggleSlider("right", true)}>
              <ArrowBack style={{ color: "black" }} />
            </IconButton>
            <Typography variant="h5" style={{ color: "black" }}>
              FerniCHer
              <LoyaltyOutlinedIcon />
            </Typography>
            <MobileRightMenuSlider
              anchor="left"
              open={state.right}
              onClose={toggleSlider("right", false)}
            >
              {sideList("right")}
            </MobileRightMenuSlider>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
