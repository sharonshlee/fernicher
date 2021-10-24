import React, { Fragment } from 'react';
import { Marker } from 'react-map-gl';

const ProductsOnMap = ({ usersAndProducts, setSelectedProduct }) => {
  return (
    <Fragment>
      {usersAndProducts.map((product, i) => (
        <Marker
          key={i}
          latitude={product.productLocation && product.productLocation[0]}
          longitude={product.productLocation && product.productLocation[1]}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              setSelectedProduct(product);
            }}
          >
            <img src="/assets/imgs/mapArrow.png" alt="Map Arrow" />
          </button>
        </Marker>
      ))}
    </Fragment>
  );
};

export default ProductsOnMap;
