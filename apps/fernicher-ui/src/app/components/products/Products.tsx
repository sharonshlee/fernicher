import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductsSocialCard from './ProductsSocialCard';
import { map } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Products() {
  const [usersAndProducts, setUsersAndProducts] = useState<[]>([]);
  const classes = useStyles();

  useEffect(() => {
    axios
      .post<[]>('/api/products')
      .then((res) => setUsersAndProducts(res.data))
      .catch((err) => console.log('ERR HAPPENED', err));
  }, []);

  return (
    <div>
      <h1>Products:</h1>
      <Grid container spacing={4}>
        {map(usersAndProducts, (usersAndProduct) => (
          <Grid item xs={3}>
            <ProductsSocialCard usersAndProduct={usersAndProduct} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Products;
