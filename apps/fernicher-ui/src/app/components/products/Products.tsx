import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductsSocialCard from './ProductsSocialCard';
import { constant, map, orderBy, take } from 'lodash';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Products() {
  const [usersAndProducts, setUsersAndProducts] = useState<any>([]);
  const classes = useStyles();
  const { cat } = useParams<{ cat: 'recent' | 'chair' | 'table' | 'all' }>();
  useEffect(() => {
    axios
      .post<any[]>('/api/users')
      .then((res) => {
        const products: any = [];
        map(res.data, (user) => {
          products.push(
            ...map(user.products, (product) => ({ ...product, user }))
          );
        });
        if (cat === 'all') {
          setUsersAndProducts(products);
        } else if (cat === 'recent') {
          setUsersAndProducts(
            take(orderBy(products, ['createdAt'], ['desc']), 4)
          );
        }
      })
      .catch((err) => console.log('ERR HAPPENED', err));
  }, [cat]);

  return (
    <div>
      <h1>Products:</h1>
      <Grid container spacing={4}>
        {map(usersAndProducts, (usersAndProduct: any) => (
          <Grid item xs={3}>
            <ProductsSocialCard
              key={usersAndProduct.id}
              usersAndProduct={usersAndProduct}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Products;
