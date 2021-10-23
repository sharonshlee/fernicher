import {useState, useEffect} from 'react'
import useLocation from './useLocation'

const useViewport = () => {
  const [viewport, setViewport] = useState({
    latitude: 43.835740,
    longitude: -79.553410,
    width: '100vw',
    height: '100vh',
    zoom: 10, 
    error: null,
    resolved: false
  })

  const coords = useLocation()
  
  useEffect(() => {
    if (coords.resolved && !coords.error) {
      setViewport(prev => {
        console.log("PREV IS:", prev)
        return {
          ...prev, 
          resolved: true, 
          latitude: coords.lat, 
          longitude: coords.lng
        }
      })
    } else if (coords.error) {
      setViewport(prev => {
        console.log("PREV IS:", prev)
        return {
        ...prev, 
        error: coords.error
      }})
    } 
  }, [coords])

  return { viewport, setViewport }
}

export default useViewport