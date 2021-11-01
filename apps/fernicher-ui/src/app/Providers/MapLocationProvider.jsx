import React, { useState, useEffect } from 'react';

const MapLocationContext = React.createContext();

const MapLocationProvider = (props) => {
  const [currLocation, setCurrLocation] = useState({
    lat: 53.83579,
    lng: -79.55343,
  });

  return (
    <MapLocationContext.Provider value={{ currLocation, setCurrLocation }}>
      {props.children}
    </MapLocationContext.Provider>
  );
};

export { MapLocationContext, MapLocationProvider };
