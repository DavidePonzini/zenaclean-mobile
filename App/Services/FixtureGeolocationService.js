const fixturePosition = {
  coords: {
    accuracy: 1135,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 44.4135423,
    longitude: 8.9554223,
    speed: null
  },
  timestamp: 1547641567823
}

const fixtureRegion = {
  latitude: 44.4135423,
  longitude: 8.9554223,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1
}

let lastLocation = fixturePosition
let currentRegion = fixtureRegion

const setCurrentRegion = reg => { currentRegion = reg }
const getCurrentRegion = () => currentRegion

const geolocateOnce = async () => {
  return new Promise(resolve => {
    let pos = fixturePosition
    lastLocation = pos
    resolve(pos)
  })
}

const getLatestPosition = () => lastLocation

const geolocateContinuously = (cb, cbErr, options) => {
  return setInterval(cb, 100)
}

const stopGeolocating = (id) => {
  clearInterval(id)
}

export default {
  geolocateOnce,
  geolocateContinuously,
  stopGeolocating,
  getLatestPosition,
  getCurrentRegion,
  setCurrentRegion
}
