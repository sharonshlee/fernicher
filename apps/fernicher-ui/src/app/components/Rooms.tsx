import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MasonryImageList from './ImageSliders/MasonryImageList';

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

  return (
    <div>
      <h1>{category.name}</h1>
      <MasonryImageList products={category.products} />
    </div>
  );
}

export default Rooms;
