import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ProductsSocialCard from './ProductsSocialCard';
import { filter, find, isEmpty, map, reduce, upperFirst } from 'lodash';
import { useParams } from 'react-router-dom';
import { stateContext } from '../../providers/StateProvider';
import Map from '../Map/Map';
import { ProductDialog } from './ProductDialog';

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
    const productExpanded = reduce(
      products,
      (result, product) => ({ ...result, [product.id]: false }),
      {}
    );
    setExpanded(productExpanded);
    setCommentExpanded(productExpanded);
  }, [products]);
  const [detail, setDetail] = useState<any>({ expanded: false, product: null });

  const [expanded, setExpanded] = useState<any>({});
  const [commentExpanded, setCommentExpanded] = useState<any>({});

  return (
    <div className={'mainContent'}>
      <h1>{upperFirst(cat)}</h1>
      {isEmpty(products) && <h3>No products found.</h3>}
      <Grid container spacing={4} style={{ width: '100%' }}>
        {map(products, (usersAndProduct: any) => (
          <Grid item md={3}>
            <ProductsSocialCard
              setUsersAndProduct={(product: any) => {
                setProducts((prev: any[]) => {
                  return map(prev, (p) => {
                    if (p.id === product.id) {
                      return product;
                    }
                    return p;
                  });
                });
              }}
              setExpanded={(id: number, isExpanded: boolean) =>
                setExpanded({ ...expanded, [id]: isExpanded })
              }
              setCommentExpanded={(id: number, isExpanded: boolean) =>
                setCommentExpanded({ ...expanded, [id]: isExpanded })
              }
              expanded={expanded[usersAndProduct.id]}
              key={usersAndProduct.id}
              usersAndProduct={usersAndProduct}
              showProduct={(id: number) => {
                setDetail({
                  expanded: true,
                  product: find(products, (p) => p.id === id),
                });
              }}
              commentExpanded={commentExpanded[usersAndProduct.id]}
            />
          </Grid>
        ))}
      </Grid>
      {detail.product && (
        <ProductDialog
          setProducts={setProducts}
          detail={detail}
          setDetail={setDetail}
          commentExpanded={commentExpanded}
          setCommentExpanded={setCommentExpanded}
        />
      )}
      <br />
      <br />
      <hr />
      <Map mapTitle="Products on Map" width="100%" />
    </div>
  );
}

export default Products;
