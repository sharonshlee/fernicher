import React, { Fragment } from 'react'; 
import { Marker } from 'react-map-gl';

const ProductsOnMap = ({ usersAndProducts, setSelectedProduct }) => {

  return (
   <Fragment>
     {usersAndProducts
    .map((product, i) => (
      <Marker
        key={i}
        latitude={product.product_location && product.product_location[0]}  
        longitude={product.product_location && product.product_location[1]}  
      >
        <button 
          onClick={e => {
          e.preventDefault()
          setSelectedProduct(product)
        }}>
          <img src="/imgs/mapArrow.png" alt="Map Arrow" /> 
        </button>
      </Marker>
  ))
}
   </Fragment>
  )

}

export default ProductsOnMap;