import axios from 'axios';
import { find, reduce } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { stateContext } from '../providers/StateProvider';

import MasonryImageList from './ImageSliders/MasonryImageList';
import { ProductDialog } from './products/ProductDialog';

function Rooms() {
  const [category, setCategory] = useState<any>({ name: '', products: [] });
  const { cat } =
    useParams<{ cat: 'bedroom' | 'living' | 'kitchen' | 'office' }>();
  useEffect(() => {
    axios
      .post<any[]>('/api/categories', {
        where: {
          code: cat,
        },
      })
      .then((res) => {
        setCategory(res.data[0]);
      })
      .catch((err) => console.log('ERR HAPPENED', err));
  }, [cat]);
  useEffect(() => {
    setCategory({ ...category });
    detail.product &&
      setDetail((prev: any) => {
        return {
          ...prev,
          product: find(category.products, (p) => p.id === prev.product.id),
        };
      });
  }, [category.products]);
  const [detail, setDetail] = useState<any>({ expanded: false, product: null });

  return (
    <div className={'mainContent'}>
      <h1>{category.name}</h1>
      <MasonryImageList products={category.products} setDetail={setDetail} />

      {detail.product && (
        <ProductDialog
          detail={detail}
          setDetail={setDetail}
          products={category.products}
          setProducts={(products: any[]) => {
            setCategory({ ...category, products });
          }}
        />
      )}
    </div>
  );
}

export default Rooms;
