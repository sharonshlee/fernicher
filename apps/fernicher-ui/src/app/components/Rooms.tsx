import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { stateContext } from '../providers/StateProvider';

import MasonryImageList from './ImageSliders/MasonryImageList';
import { ProductDialog } from './products/ProductDialog';

function Rooms() {
  const [category, setCategory] = useState<any>({ name: '', products: [] });
  const { cat } =
    useParams<{ cat: 'bedroom' | 'living' | 'kitchen' | 'office' }>();
  const { setProducts } = useContext(stateContext);
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
  const [detail, setDetail] = useState<any>({ expanded: false, product: null });
  const [commentExpanded, setCommentExpanded] = useState<any>({});
  return (
    <div className={'mainContent'}>
      <h1>{category.name}</h1>
      <MasonryImageList products={category.products} setDetail={setDetail} />
      {detail.product && (
        <ProductDialog
          detail={detail}
          setDetail={setDetail}
          setProducts={setProducts}
          commentExpanded={commentExpanded}
          setCommentExpanded={setCommentExpanded}
        />
      )}
    </div>
  );
}

export default Rooms;
