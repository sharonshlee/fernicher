import { useContext } from 'react';
import { Container, Grid, Box, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import { LoggedInContext } from '../providers/LoggedInContext';

const Footer = () => {
  const history = useHistory();
  const { state, setState } = useContext(LoggedInContext);

  const showMenuItems = state ? (
    <Box
      px={{ xs: 3, sm: 5 }}
      py={{ xs: 5, sm: 5 }}
      color="grey"
      style={{ margin: 'auto', width: '100%' }}
    >
      <Grid
        container
        spacing={3}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Grid item xs={12} sm={4}>
          <Box borderBottom={1}>Get Inspired</Box>
          <Link
            color="inherit"
            onClick={() => {
              history.push('/rooms/living');
            }}
          >
            Living Rooms
          </Link>
          <br />
          <Link
            color="inherit"
            onClick={() => {
              history.push('/rooms/bedroom');
            }}
          >
            Bedrooms
          </Link>
          <br />
          <Link
            color="inherit"
            onClick={() => {
              history.push('/rooms/kitchen');
            }}
          >
            Kitchen
          </Link>
          <br />
          <Link
            color="inherit"
            onClick={() => {
              history.push('/rooms/office');
            }}
          >
            Office
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box borderBottom={1}>Search Furniture</Box>
          <Link
            color="inherit"
            onClick={() => {
              history.push('/products/all');
            }}
          >
            All Furniture
          </Link>
          <br />
          <Link
            color="inherit"
            onClick={() => {
              history.push('/products/popular');
            }}
          >
            Most Popular
          </Link>
          <br />
          <Link
            color="inherit"
            onClick={() => {
              history.push('/products/recent');
            }}
          >
            Most Recent
          </Link>
          <br />
          <Link
            color="inherit"
            onClick={() => {
              history.push('/');
            }}
          >
            Find On Map
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box borderBottom={1}>My Account</Box>
          <Link
            color="inherit"
            onClick={() => {
              history.push('/chats');
            }}
          >
            My Chats
          </Link>
          <br />
          <Link
            color="inherit"
            onClick={() => {
              history.push(`/users/${state.id}/products`);
            }}
          >
            My Listings
          </Link>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Box
      px={{ xs: 3, sm: 5 }}
      py={{ xs: 5, sm: 5 }}
      color="grey"
      style={{ margin: 'auto', width: '100%' }}
    >
      <Grid
        container
        spacing={3}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Grid item xs={12} sm={4}>
          <Box borderBottom={1}>Get Inspired</Box>
          <Link
            color="inherit"
            onClick={() => {
              history.push('/rooms/living');
            }}
          >
            Living Rooms
          </Link>
          <br />
          <Link
            color="inherit"
            onClick={() => {
              history.push('/rooms/bedroom');
            }}
          >
            Bedrooms
          </Link>
          <br />
          <Link
            color="inherit"
            onClick={() => {
              history.push('/rooms/kitchen');
            }}
          >
            Kitchen
          </Link>
          <br />
          <Link
            color="inherit"
            onClick={() => {
              history.push('/rooms/office');
            }}
          >
            Office
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box borderBottom={1}>Search Furniture</Box>
          <Link
            color="inherit"
            onClick={() => {
              history.push('/products/all');
            }}
          >
            All Furniture
          </Link>
          <br />
          <Link
            color="inherit"
            onClick={() => {
              history.push('/products/popular');
            }}
          >
            Most Popular
          </Link>
          <br />
          <Link
            color="inherit"
            onClick={() => {
              history.push('/products/recent');
            }}
          >
            Most Recent
          </Link>
          <br />
          <Link
            color="inherit"
            onClick={() => {
              history.push('/');
            }}
          >
            Find On Map
          </Link>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <footer>
      <Container maxWidth="sm">
        {showMenuItems}
        <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
          Fernicher &reg; {new Date().getFullYear()}
          <br />
          Created by Sharon Lee and Lewis Lee
          <br />
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/sharonshlee/fernicher"
            color="inherit"
          >
            <strong>Github Project Repo:</strong> <GitHubIcon />
          </Link>
          <span> | </span>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/sharonshlee"
            color="inherit"
          >
            <strong>Sharon's Github:</strong> <GitHubIcon />
          </Link>
          <span> | </span>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/rexiah23"
            color="inherit"
          >
            <strong>Lewis's Github:</strong> <GitHubIcon />
          </Link>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
