import React, { Fragment } from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl'
import ProductsOnMap from './ProductsOnMap'
import PopupCard from './PopupCard'
import useProductCard from '../../hooks/useProductCard'
import useViewport from '../../hooks/useViewport'

const Map = ({ usersAndProducts }) => {
  
  const { viewport, setViewport } = useViewport()
  const { selectedProduct, setSelectedProduct } = useProductCard()
  

    return (
      <Fragment>
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
        {!viewport && <p>Fetching Your Location To Display Products Near You...</p>}
      </Fragment>
  )
}

export default Map; 

