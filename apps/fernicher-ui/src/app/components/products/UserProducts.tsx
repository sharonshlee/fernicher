import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ProductsSocialCard from './ProductsSocialCard';
import { filter, find, isEmpty, map, reduce } from 'lodash';
import { useParams, useHistory } from 'react-router-dom';
import { stateContext } from '../../providers/StateProvider';
import { ProductDialog } from './ProductDialog';
import { LoggedInContext } from '../../providers/LoggedInContext';
import SingleLineImageList from '../ImageSliders/SingleLineImageList';
import './products.scss';
import { Recommendation } from './Recommendation';

// My Listings
function UserProducts() {
  const { state: loggedInUser } = useContext(LoggedInContext);
  const { setProductOnMap } = useContext(stateContext);
  const history = useHistory();
  if (!loggedInUser) {
    setProductOnMap(null);
    history.push('/');
  }
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
  }, []);
  useEffect(() => {
    const productExpanded = reduce(
      filter(myProducts, (p) => p.user.id === userid),
      (result, product) => ({ ...result, [product.id]: false }),
      {}
    );
    setExpanded(productExpanded);
    setCommentExpanded(productExpanded);
  }, [myProducts, userid]);
  const [detail, setDetail] = useState<any>({ expanded: false, product: null });

  const [expanded, setExpanded] = useState<any>({});
  const [commentExpanded, setCommentExpanded] = useState<any>({
    expanded: false,
    comments: null,
  });
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  useEffect(() => {
    loggedInUser &&
      axios
        .get(`/api/users/${loggedInUser.id}/recommend`)
        .then((result: any) => {
          setRecommendedProducts(result.data);
        });
  }, [loggedInUser]);

  return (
    <div className={'mainContent'}>
      <h1>{'My Listings'}</h1>
      {isEmpty(myProducts) && <h3>No Furnitures found.</h3>}
      <Grid container spacing={4} style={{ width: '100%', margin: 'auto' }}>
        {map(myProducts, (usersAndProduct: any) => (
          <Grid item md={3}>
            <ProductsSocialCard
              setUsersAndProduct={(product: any) =>
                setMyProducts((prev: any[]) => {
                  return map(prev, (p) => {
                    if (p.id === product.id) {
                      return product;
                    }
                    return p;
                  });
                })
              }
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
                  product: find(myProducts, (p) => p.id === id),
                });
              }}
              commentExpanded={commentExpanded[usersAndProduct.id]}
            />
          </Grid>
        ))}
      </Grid>
      <Recommendation
        imageHeight="25vh"
        imageRootHeight="26vh"
        imageWidth="22vh"
      />
      {detail.product && (
        <ProductDialog
          detail={detail}
          setDetail={setDetail}
          products={myProducts}
          setProducts={setMyProducts}
        />
      )}
      <br />
      <br />
    </div>
  );
}

export default UserProducts;
