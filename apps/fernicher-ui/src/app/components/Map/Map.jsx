import React from 'react';
import {
  Google Map,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import { formatRelative } from "date-fns"

import "@reach/combobox/styles.css"

const libraries = ['places']
const Map = props => {
  const {} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

}
