import React, { useState, useEffect, useRef } from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import ProductsOnMap from './ProductsOnMap'
import PopupCard from './PopupCard'
import useProductCard from '../../hooks/useProductCard';

const Map = ({ usersAndProducts }) => {

  const [viewport, setViewport] = useState({
    latitude: 43.836930,
    longitude: -79.554040,
    width: '100vw',
    height: '100vh',
    zoom: 10
  })

  const { selectedProduct, setSelectedProduct }= useProductCard();

    return (

      <ReactMapGL 
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/rexiah23/ckv2jbc970n8u14nyzb407f1l"
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
        scrollZoom={false}
      >
        <NavigationControl /> 
        <ProductsOnMap usersAndProducts={usersAndProducts} setSelectedProduct={setSelectedProduct}/>
        <PopupCard selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>
      </ReactMapGL>      
  )
}

export default Map; 

