import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ProductsSocialCard from './ProductsSocialCard';
import { isEmpty, map, upperFirst } from 'lodash';
import { useParams } from 'react-router-dom';
import { stateContext } from '../../providers/StateProvider';

function Products() {
  const [usersAndProducts, setUsersAndProducts] = useState<any>([]);
  const { products } = useContext(stateContext);
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
        setUsersAndProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [cat]);

  useEffect(() => {
    setUsersAndProducts(products);
  }, [products]);

  return (
    <div>
      <h1>{upperFirst(cat)}</h1>
      {isEmpty(usersAndProducts) && <h3>No products found.</h3>}
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
