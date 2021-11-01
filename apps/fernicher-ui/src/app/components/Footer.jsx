import React, {useContext} from 'react';
import {Container, Grid, Box, Link} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import Divider from '@mui/material/Divider';

function Footer() {
  const history = useHistory();

  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10}}
        py={{xs: 5, sm: 10}}
        color="white"
      >
        <Container maxWidth="lg">
          {/* <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>About us</Box>
              <Box>
                <Link
                color="inherit"
                onClick={(() =>{
                  history.push('/')
                })}
                >
                  Our Story
                </Link>
              </Box>
              <Box>
              <Link color="inherit" onClick={(() =>{
                  history.push('/')
                })}>
                Contact Us
              </Link>
            </Box>
            </Grid>
              </Grid>*/}
          {<Box  textAlign="center" pt={{xs: 5, sm: 10}} pb={{xs: 5, sm: 0}}>
            Fernicher &reg; {new Date().getFullYear()}
          </Box> }
          <Box textAlign="center" pt={{xs: 5, sm: 10}} pb={{xs: 5, sm: 0}}>
            Created by Sharon Lee and Lewis Lee
            <br />
            <Link rel="noopener noreferrer" target="_blank" href="https://github.com/sharonshlee/fernicher" color="inherit">
                <strong>Github Project Repo:</strong> <GitHubIcon />
            </Link>
            <span>          |          </span>
            <Link rel="noopener noreferrer" target="_blank" href="https://github.com/sharonshlee" color="inherit">
            <strong>Sharon's Github:</strong> <GitHubIcon />
            </Link>
            <span>          |          </span>
            <Link rel="noopener noreferrer" target="_blank" href="https://github.com/rexiah23" color="inherit">
            <strong>Lewis's Github:</strong> <GitHubIcon />
            </Link>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
