import React, { Fragment, useEffect } from 'react';
import { Popup } from 'react-map-gl';

const PopupCard = ({ selectedProduct, setSelectedProduct }) => {
  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <Fragment>
      {selectedProduct && (
        <Popup
          latitude={selectedProduct.productLocation[0]}
          longitude={selectedProduct.productLocation[1]}
          onClose={() => setSelectedProduct(null)}
        >
          <div>
            <h2>
              <strong>Full name: </strong>
              {selectedProduct.user.firstName} {selectedProduct.user.lastName}
            </h2>
            <p>
              <strong>Email: </strong>
              {selectedProduct.user.email}
            </p>
            <p>
              <strong>Product Description: </strong>
              {selectedProduct.description}
            </p>
          </div>
        </Popup>
      )}
    </Fragment>
  );
};

export default PopupCard;
