import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./ImageSliders.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <img
              src="/imgs/furniture1.jpg"
              alt="furniture1"
              className="sliderimg"
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <img
              src="/imgs/furniture2.jpg"
              alt="furniture1"
              className="sliderimg"
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <img
              src="/imgs/furniture3.jpg"
              alt="furniture1"
              className="sliderimg"
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <img
              src="/imgs/furniture4.jpg"
              alt="furniture1"
              className="sliderimg"
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <img
              src="/imgs/furniture5.jpg"
              alt="furniture1"
              className="sliderimg"
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <img
              src="/imgs/furniture6.jpg"
              alt="furniture1"
              className="sliderimg"
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <img
              src="/imgs/furniture7.jpg"
              alt="furniture1"
              className="sliderimg"
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <img
              src="/imgs/furniture1.jpg"
              alt="furniture1"
              className="sliderimg"
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
