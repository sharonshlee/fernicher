import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Dialog } from '@mui/material';
import axios from 'axios';
import { LoggedInContext } from '../../providers/LoggedInContext';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      Fernicher{'   '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props: {
  setShowSignIn: any;
  setShowSignUp: any;
}) {
  const { setShowSignIn, setShowSignUp } = props;
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState(false);
  const { setState } = useContext(LoggedInContext);

  return (
    <Dialog open={true} onClose={() => setShowSignIn(false)}>
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
            <Avatar sx={{ m: 1, bgcolor: '#403d39' }}>
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="div" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setLoginError(false);
                  setSignInData({ ...signInData, email: e.target.value });
                }}
                value={signInData.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setLoginError(false);
                  setSignInData({ ...signInData, password: e.target.value });
                }}
                value={signInData.password}
              />
              {loginError && (
                <InputLabel color="primary">Invalid User</InputLabel>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#403d39' }}
                onClick={() => {
                  axios
                    .post('/api/users/signin', signInData)
                    .then((result) => {
                      setState(result.data);
                      setShowSignIn(false);
                    })
                    .catch((err) => {
                      setLoginError(true);
                    });
                }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    sx={{ mt: 3, mb: 2, color: '#403d39' }}
                    variant="body2"
                    component={Button}
                    onClick={() => {
                      setShowSignIn(false);
                      setShowSignUp(true);
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </Dialog>
  );
}
