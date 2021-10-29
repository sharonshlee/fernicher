import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ProductsSocialCard from './ProductsSocialCard';
import { filter, find, isEmpty, map, reduce, upperFirst } from 'lodash';
import { useParams } from 'react-router-dom';
import { stateContext } from '../../providers/StateProvider';
import Map from '../Map/Map';
import { ProductDialog } from './ProductDialog';

function UserProducts() {
  const { myProducts, setMyProducts } = useContext(stateContext);

  const { userid } = useParams<{ userid: string }>();
  useEffect(() => {
    axios.get<any>(`/api/users/${userid}`).then((result) => {
      const userProducts: any = [];
      userProducts.push(
        ...map(result.data.products, (product) => ({
          ...product,
          user: result.data,
        }))
      );
      setMyProducts(userProducts);
    });
  }, [myProducts]);
  useEffect(() => {
    const productExpanded = reduce(
      filter(myProducts, (p) => p.user.id === userid),
      (result, product) => ({ ...result, [product.id]: false }),
      {}
    );
    setExpanded(productExpanded);
  }, [myProducts, userid]);
  const [detail, setDetail] = useState<any>({ expanded: false, product: null });

  const [expanded, setExpanded] = useState<any>({});
  return (
    <div>
      <h1>{upperFirst('my products')}</h1>
      {isEmpty(myProducts) && <h3>No Products found.</h3>}
      <Grid container spacing={4} style={{ width: '100%', margin: 'auto' }}>
        {map(myProducts, (usersAndProduct: any) => (
          <Grid item md={3}>
            <ProductsSocialCard
              setExpanded={(id: number, isExpanded: boolean) =>
                setExpanded({ ...expanded, [id]: isExpanded })
              }
              expanded={expanded[usersAndProduct.id]}
              key={usersAndProduct.id}
              usersAndProduct={usersAndProduct}
              showProduct={(id: number) => {
                setDetail({
                  expanded: true,
                  product: find(myProducts, (p) => p.id === id),
                });
              }}
            />
          </Grid>
        ))}
      </Grid>
      {detail.product && (
        <ProductDialog detail={detail} setDetail={setDetail} />
      )}
      <br />
      <br />
      <hr />
      <Map mapTitle="Products on Map" width="100%" />
    </div>
  );
}

export default UserProducts;
