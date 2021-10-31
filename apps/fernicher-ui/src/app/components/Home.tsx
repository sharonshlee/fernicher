import axios from 'axios';
import { map } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { stateContext } from '../providers/StateProvider';
import ImageSliders from './ImageSliders/ImageSliders';
import Map from './Map/Map';

function Home(props: any) {
  const { setProducts } = useContext(stateContext);
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
        setProducts(products);
      })
      .catch((err) => console.log('ERR HAPPENED', err));
  }, []);

  return (
    <div className="mainContent">
      <Map />
    </div>
  );
}

export default Home;
