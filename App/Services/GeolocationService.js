let lastLocation = null

// initial region
let currentRegion = {
  latitude: 44.4056,
  longitude: 8.9463,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1
}

const setCurrentRegion = reg => { currentRegion = reg }
const getCurrentRegion = () => currentRegion

const geolocateOnce = async () => {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition((pos) => {
      lastLocation = pos
      resolve(pos)
    })
  })
}

const geolocateContinuously = (cb, cbErr, options) => {
  return navigator.geolocation.watchPosition((pos) => {
    cb(pos)
    lastLocation = pos
  }, cbErr, options)
}

const stopGeolocating = (id) => {
  navigator.geolocation.clearWatch(id)
}

const getLatestPosition = () => lastLocation

export default {
  geolocateOnce,
  geolocateContinuously,
  stopGeolocating,
  getLatestPosition,
  getCurrentRegion,
  setCurrentRegion
}
