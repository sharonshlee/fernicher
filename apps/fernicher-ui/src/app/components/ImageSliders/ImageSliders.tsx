import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import SingleLineImageList from './SingleLineImageList';
import { chunk, map } from 'lodash';
import './ImageSliders.scss';

function ImageSliders() {
  const [usersAndProducts, setUsersAndProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get<any[]>('/api/favourites/top10')
      .then((res) => {
        const userAndProducts = map(res.data, (fav) => ({
          ...fav.product,
          user: fav.user,
        }));
        setUsersAndProducts(userAndProducts);
      })
      .catch((err) => console.log('ERR HAPPENED', err));
  }, []);

  return (
    <div className="sliderimg">
      <h2>Top Picks</h2>
      {/* To display Top 10 or 20 favourites products  */}
      <AliceCarousel
        autoPlay
        autoPlayInterval={5000}
        disableButtonsControls={true}
        infinite={true}
        animationDuration={1000}
        // disableDotsControls={true}
      >
        {map(chunk(usersAndProducts, 5), (subUsersAndProducts: any) => (
          <SingleLineImageList subUsersAndProducts={subUsersAndProducts} />
        ))}
      </AliceCarousel>
    </div>
  );
}

export default ImageSliders;
