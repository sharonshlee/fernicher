import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dialog } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://fernicher.com/">
        Fernicher
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp(props: {
  setShowSignIn: any;
  setShowSignUp: any;
}) {
  const { setShowSignIn, setShowSignUp } = props;
  const [signedUp, setSignedUp] = useState(false);

  const defaultUserValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const [user, setUser] = useState<{
    //need types of each field
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>(defaultUserValues);

  if (signedUp) {
    return <Redirect to='/' />
  }
  return (
    <Dialog open={true} onClose={() => setShowSignUp(false)}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="div" sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                    value={user.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                    value={user.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    value={user.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    value={user.password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  axios
                    .post('/api/users/new', user)
                    .then(() => {
                    setSignedUp(true)
                    console.log("IT IT HIT THIS: ", user)
                    //Sign user up for chatengine.io as well
                    const data = {
                      username: user.email,
                      secret: user.password,
                      first_name: user.firstName,
                      last_name: user.lastName
                    }
                    const headers = {
                      'PRIVATE-KEY': 'a80dec0b-4e13-4a61-96c8-a1c87e79dd2e'
                    }

                    axios.post('https://api/chatengine.io/users/', data, { headers
                    })
                    .catch(function (error) {
                      console.log("ERROR IS", error);
                    })
                  });
                }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    variant="body2"
                    component={Button}
                    onClick={() => {
                      setShowSignIn(true);
                      setShowSignUp(false);
                    }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </Dialog>
  );
}
