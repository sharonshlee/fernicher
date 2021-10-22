import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';

const Map = ({ usersAndProducts }) => {
  const [viewport, setViewport] = useState({
    latitude: 43.836930,
    longitude: -79.554040,
    width: '100vw',
    height: '100vh',
    zoom: 10
  })

  const [selectedProduct, setSelectedProduct] = useState(null);

  //Adds ability to close selectedProduct with the escape key. 
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedProduct(null)
      }
    }
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener)
    }
  }, [])

  const productsOnMap = usersAndProducts.map((product, i) => (
      <Marker
        key={i}
        latitude={product.product_location && product.product_location[0]}  
        longitude={product.product_location && product.product_location[1]}  
      >
        <button onClick={(e) => {
          e.preventDefault()
          setSelectedProduct(product)
        }}>
          <img src="/imgs/mapArrow.png" alt="Map Arrow" /> 
        </button>
      </Marker>
    ))

  return (
    <div>
      <ReactMapGL 
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/rexiah23/ckv2jbc970n8u14nyzb407f1l"
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
      >
        <NavigationControl /> 
        {productsOnMap}
        {selectedProduct && (
          <Popup 
            latitude={selectedProduct.product_location[0]} 
            longitude={selectedProduct.product_location[1]}
            onClose={() => setSelectedProduct(null)}
            >
            <div> 
              <h2><strong>Full name: </strong>{selectedProduct.first_name} {selectedProduct.last_name}</h2>
              <p><strong>Email: </strong>{selectedProduct.email}</p>
              <p><strong>Product Description: </strong>{selectedProduct.product_description}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  )
}

export default Map; 