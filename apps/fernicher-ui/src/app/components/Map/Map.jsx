import { useState, useRef, useCallback, useContext  } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import '@reach/combobox/styles.css';
import mapStyles from './mapStyles';
import ProductCard from '../products/ProductCard';
import { stateContext } from '../../providers/StateProvider';
import { ViewportContext } from '../../providers/ViewportProvider';

const libraries = ['places'];

const center = {
  lat: 53.83579,
  lng: -79.55343,
};

const Map = ({ mapTitle = '', width = '100%', height = '80vh' }) => {
  const { products } = useContext(stateContext);
  const { viewport, setMapRef } = useContext(ViewportContext);

  const mapContainerStyle = {
    width,
    height,
  };
  const [selected, setSelected] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NX_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMapRef(mapRef)
  }, [setMapRef]);

  const options = {
    styles: mapStyles,
    zoomControl: true,
    streetViewControl: false
  };

  if (loadError) return <h1>Error loading maps</h1>;
  if (!isLoaded) return <h1>Loading Maps</h1>;

  const productMarkers = products.map((product, i) => (
    <Marker
      key={i}
      position={{
        lat: product.productLocation[0],
        lng: product.productLocation[1],
      }}
      onClick={() => {
        setSelected(product);
        mapRef.current.panTo({
          lat: product.productLocation[0],
          lng: product.productLocation[1],
        });
        mapRef.current.setZoom(11);
      }}
    />
  ));

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={viewport ? { lat: viewport.lat, lng: viewport.lng } : center}
        options={options}
        onLoad={onMapLoad}
      >
        {productMarkers}
        {selected && (
          <InfoWindow
            position={{
              lat: selected.productLocation[0],
              lng: selected.productLocation[1],
            }}
            onCloseClick={() => setSelected(null)}
          >
            <ProductCard
              title={selected.name}
              description={selected.description}
              date={selected.createdAt}
              firstName={selected.name}
              image={selected.image}
              email={selected.user.email && selected.user.email}
            />
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
