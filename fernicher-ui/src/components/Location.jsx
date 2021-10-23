import useLocation from '../hooks/useLocation';

const Location = () => {
  const coords = useLocation();

  return (
    <div>
      <h1>Location</h1>
      {!coords.resolved && <p>fectching your location</p>}
      {(coords.resolved && !coords.error) && <p>your location is {coords.lat}, {coords.lng}</p>}
      {coords.error && <p>{coords.error}</p>}
    </div>
  )

}

export default Location;