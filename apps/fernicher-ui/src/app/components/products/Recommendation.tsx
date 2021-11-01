import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { LoggedInContext } from '../../providers/LoggedInContext';
import SingleLineImageList from '../ImageSliders/SingleLineImageList';

export const Recommendation = (props: {
  imageHeight: string;
  imageRootHeight: string;
  imageWidth: string;
  title?: string;
  className?: string;
}) => {
  const {
    imageHeight,
    imageRootHeight,
    imageWidth,
    title = 'You may also like...',
    className = 'recommendation',
  } = props;
  const { state: loggedInUser } = useContext(LoggedInContext);
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
    loggedInUser &&
    !isEmpty(recommendedProducts) && (
      <div className={`sliderimg ${className}`}>
        <h2>{title}</h2>
        <SingleLineImageList
          subUsersAndProducts={recommendedProducts}
          imageHeight={imageHeight}
          imageRootHeight={imageRootHeight}
          imageWidth={imageWidth}
        />
      </div>
    )
  );
};
