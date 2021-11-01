import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Sidebar from './Sidebar';
import { AddProduct } from '../products/AddProduct';
import SignIn from '../login/SignIn';
import SignUp from '../login/SignUp';
import axios from 'axios';
import { stateContext } from '../../providers/StateProvider';
import { LoggedInContext } from '../../providers/LoggedInContext';
import { ViewportContext } from '../../providers/ViewportProvider';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    flexGrow: 1,
    borderRadius: 30,
    backgroundColor: alpha(theme.palette.common.black, 0.08),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    marginRight: theme.spacing(2),
    marginLeft: 5,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  avatarComment: {
    fontSize: 10,
    width: '3em',
    height: '3em',
    margin: '0.5em',
    padding: 0,
    backgroundColor: '#087e8b',
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const {viewport, setViewport, mapRef} = useContext(ViewportContext);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const [state, setState] = useState({
    position: 'left',
    open: false,
    menu: 'main',
  });
  const toggleSlider = (position, open, menu) => () => {
    setState({ ...state, position, open, menu });
  };
  const [position, setPosition] = useState('left');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const { setProducts } = useContext(stateContext);
  const { state: loggedInUser, setState: setLoggedInUser } =
    useContext(LoggedInContext);


  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{ backgroundColor: '#F8F9FA', color: '#212529' }}
      >
        <Toolbar id="back-to-top-anchor">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSlider(position, true, 'main')}
          >
            <MenuIcon />
          </IconButton>
          <Sidebar {...state} toggleSlider={toggleSlider} />
          <Button
            style={{ color: '#212529' }}
            onClick={() => history.push('/')}
          >
            Fernicher
          </Button>
          <Button
            style={{ color: '#212529' }}
            onClick={toggleSlider('left', true, 'products')}
          >
            Furnitures
          </Button>
          <Button
            style={{ color: '#212529' }}
            onClick={toggleSlider('left', true, 'rooms')}
          >
            Rooms
          </Button>
          {loggedInUser && (
            <Button
              style={{ color: '#212529' }}
              onClick={() => history.push(`/users/${loggedInUser.id}/products`)}
            >
              My Listings
            </Button>
          )}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(e) => {
                const { value } = e.target;
                setSearchValue(value);
                const filter = {
                  name: '',
                  condition: '',
                  description: '',
                  color: '',
                  orderBy: 'createdAt',
                  desc: true,
                  take: 1000,
                };
                filter.name = value;
                filter.condition = value;
                filter.description = value;
                filter.color = value;
                axios.post('/api/products/search', filter).then((result) => {
                  setProducts(result.data);
                  history.push('/products/search');
                });
              }}
              value={searchValue}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tooltip
            title="Furnitures Nearby"
            onClick={() => {
              mapRef.current.panTo({
                lat: viewport.lat,
                lng: viewport.lng,
              });
              return history.push('/');
            }}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <LocationOnIcon />
              </IconButton>
            </Tooltip>
            {loggedInUser && (
              <>
                <Tooltip title="Donate a Furniture">
                  <IconButton
                    aria-label="show notifications"
                    color="inherit"
                    component={Button}
                    onClick={() => setShowAddProduct(!showAddProduct)}
                  >
                    <Badge color="secondary">
                      <AddAPhotoIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                {showAddProduct && (
                  <AddProduct
                    open={showAddProduct}
                    handleClose={setShowAddProduct}
                  />
                )}
                <Tooltip title="My Favourite Furnitures">
                  <IconButton
                    color="inherit"
                    onClick={toggleSlider('right', true, 'favourites')}
                  >
                    <Badge
                      badgeContent={loggedInUser.favourites.length}
                      color="secondary"
                    >
                      <FavoriteIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Let's Chat">
                  <IconButton
                    component={Link}
                    to={'/chats'}
                    aria-label="show"
                    color="inherit"
                  >
                    {/* <Link to="/chats"> */}
                    <Badge badgeContent={2} color="secondary">
                      <ChatBubbleIcon />
                    </Badge>
                    {/* </Link> */}
                  </IconButton>
                </Tooltip>

                <Tooltip title={`Logged in as ${loggedInUser.firstName}`}>
                  <IconButton
                    edge="end"
                    color="inherit"
                    component={Button}
                    onClick={() => setShowSignIn(!showSignIn)}
                  >
                    <Avatar
                      aria-label="firstName"
                      className={classes.avatarComment}
                    >
                      {loggedInUser.firstName}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                  <IconButton
                    edge="end"
                    color="inherit"
                    component={Button}
                    onClick={() => {
                      history.push('/');
                      setLoggedInUser(null);
                    }}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}

            {!loggedInUser && (
              <Tooltip title="Login/Signup">
                <IconButton
                  edge="end"
                  color="inherit"
                  component={Button}
                  onClick={() => setShowSignIn(!showSignIn)}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            )}

            {showSignIn && (
              <SignIn
                setShowSignIn={setShowSignIn}
                setShowSignUp={setShowSignUp}
              />
            )}
            {showSignUp && (
              <SignUp
                setShowSignIn={setShowSignIn}
                setShowSignUp={setShowSignUp}
              />
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
