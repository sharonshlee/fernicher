import React, { useState, useRef, useCallback } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import mapStyles from './mapStyles';
import ProductCard from '../products/ProductCard';
import useViewport from '../../hooks/useViewport';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};
const center = {
  lat: 53.835790,
  lng: -79.553430,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
};

const Map = ({ usersAndProducts }) => {
  const [selected, setSelected] = useState(null);
  const { viewport, setViewPort } = useViewport();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD4Ka7REwY3ga4Q_JgVgTxuD5iGLT_7Vhw",
    libraries
  });

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, []);

  if (loadError) return <h1>Error loading maps</h1>
  if (!isLoaded) return <h1>Loading Maps</h1>

  const products = usersAndProducts.map((product, i) => (
    <Marker
      key={i}
      position={{lat:product.productLocation[0], lng:product.productLocation[1]}}
      onClick={() => {
        setSelected(product)
        mapRef.current.panTo({lat:product.productLocation[0], lng:product.productLocation[1]})
        mapRef.current.setZoom(11)
      }}
    />
  ))


  return <div>

    <h2 className="map-title">FerniCher <span role="img" aria-label="couch">🛋</span></h2>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      center={viewport ? {lat:viewport.lat, lng:viewport.lng}: center}
      options={options}
      onLoad={onMapLoad}
      >
      {products}
      {selected && (
      <InfoWindow
        position={{lat: selected.productLocation[0], lng: selected.productLocation[1]}}
        onCloseClick={() => setSelected(null)}
      >
        <ProductCard title={selected.name} description={selected.description}/>
      </InfoWindow>)}
      </GoogleMap>
  </div>;
}

export default Map;
