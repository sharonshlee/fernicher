import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './ImageSliders.scss';
import SingleLineImageList from './SingleLineImageList';
import { chunk, map } from 'lodash';

function ImageSliders() {
  const [usersAndProducts, setUsersAndProducts] = useState<[]>([]);

  useEffect(() => {
    axios
      .post<[]>('/api/products')
      .then((res) => setUsersAndProducts(res.data))
      .catch((err) => console.log('ERR HAPPENED', err));
  }, []);

  return (
    <div className="App">
      {/* To display Top 10 or 20 favourites products  */}
      <AliceCarousel autoPlay autoPlayInterval={3000}>
        {map(chunk(usersAndProducts, 5), (subUsersAndProducts: any) => (
          <SingleLineImageList subUsersAndProducts={subUsersAndProducts} />
        ))}
      </AliceCarousel>
    </div>
  );
}

export default ImageSliders;
