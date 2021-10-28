import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ProductsSocialCard from './ProductsSocialCard';
import { isEmpty, map, upperFirst } from 'lodash';
import { useParams } from 'react-router-dom';
import { stateContext } from '../../providers/StateProvider';
import Map from '../Map/Map';

function Products() {
  const { products, setProducts } = useContext(stateContext);
  const { cat } =
    useParams<{ cat: 'recent' | 'chair' | 'table' | 'all' | 'search' }>();
  useEffect(() => {
    if (cat === 'search') {
      return;
    }
    const filter = { name: '', orderBy: 'createdAt', desc: true, take: 1000 };
    if (cat !== 'recent' && cat !== 'all') {
      filter.name = cat;
    } else if (cat === 'recent') {
      filter.take = 4;
    }
    axios
      .post<any[]>('/api/products/search', filter)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [cat]);

  useEffect(() => {
    setProducts(products);
  }, [products]);

  return (
    <div>
      <h1>{upperFirst(cat)}</h1>
      {isEmpty(products) && <h3>No products found.</h3>}
      <Grid container spacing={4}>
        {map(products, (usersAndProduct: any) => (
          <Grid item xs={3}>
            <ProductsSocialCard
              key={usersAndProduct.id}
              usersAndProduct={usersAndProduct}
            />
          </Grid>
        ))}
      </Grid>
      <br />
      <br />
      <hr />
      <Map mapTitle="Products on Map" width="100%" />
    </div>
  );
}

export default Products;
