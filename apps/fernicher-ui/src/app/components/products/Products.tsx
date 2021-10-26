import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ProductsSocialCard from './ProductsSocialCard';
import { map, upperFirst } from 'lodash';
import { useParams } from 'react-router-dom';

function Products() {
  const [usersAndProducts, setUsersAndProducts] = useState<any>([]);

  const { cat } = useParams<{ cat: 'recent' | 'chair' | 'table' | 'all' }>();
  useEffect(() => {
    const filter = { name: '', orderBy: 'createdAt', desc: true, take: 1000 };
    if (cat !== 'recent' && cat !== 'all') {
      filter.name = cat;
    } else if (cat === 'recent') {
      filter.take = 4;
    }
    axios
      .post<any[]>('/api/products/search', filter)
      .then((res) => {
        setUsersAndProducts(res.data);
      })
      .catch((err) => console.log('ERR HAPPENED', err));
  }, [cat]);

  return (
    <div>
      <h1>Products: {upperFirst(cat)}</h1>
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
