import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const Map = props => {
  const [viewport, setViewport] = useState({
    latitude: 43.836930,
    longitude: -79.554040,
    width: '100vw',
    height: '100vh',
    zoom: 10
  })
  return (
    <div>
      <ReactMapGL 
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        Markers here
      </ReactMapGL>
    </div>
  )
}

export default Map; 