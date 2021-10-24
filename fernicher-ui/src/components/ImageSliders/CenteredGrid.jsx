import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProductsSocialCard from "../products/ProductsSocialCard";

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
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <ProductsSocialCard />
        </Grid>
        <Grid item xs={3}>
          <ProductsSocialCard />
        </Grid>
        <Grid item xs={3}>
          <ProductsSocialCard />
        </Grid>
        <Grid item xs={3}>
          <ProductsSocialCard />
        </Grid>
      </Grid>
    </div>
  );
}
