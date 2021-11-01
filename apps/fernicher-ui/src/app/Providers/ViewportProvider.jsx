import React, { useState, useEffect } from 'react';
import useLocation from '../hooks/useLocation';

const ViewportContext = React.createContext();

const ViewportProvider = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 43.835740,
    longitude: -79.553410,
    width: '100vw',
    height: '100vh',
    zoom: 10,
    error: null,
    resolved: false
  })

  const [mapRef, setMapRef] = useState(null);

  const coords = useLocation()

  useEffect(() => {
    if (coords.resolved && !coords.error) {
      setViewport(prev => ({
          ...prev,
          resolved: true,
          lat: coords.lat,
          lng: coords.lng
      }))
    } else if (coords.error) {
      setViewport(prev => ({
        ...prev,
        error: coords.error
      }))
    }
  }, [coords])

  return (
    <ViewportContext.Provider value={{ viewport, setViewport, mapRef, setMapRef }}>
      {props.children}
    </ViewportContext.Provider>
  );
};

export { ViewportContext, ViewportProvider };
