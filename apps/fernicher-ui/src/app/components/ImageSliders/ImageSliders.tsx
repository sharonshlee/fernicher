import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import SingleLineImageList from './SingleLineImageList';
import { chunk, map } from 'lodash';
import './ImageSliders.scss';
import { stateContext } from '../../providers/StateProvider';

function ImageSliders() {
  const { products } = useContext(stateContext);

  return (
    <div className="sliderimg">
      <h2>Most Popular</h2>
      <SingleLineImageList subUsersAndProducts={products} />
    </div>
  );
}

export default ImageSliders;
