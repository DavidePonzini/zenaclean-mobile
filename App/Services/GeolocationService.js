let lastLocation = null
let currentRegion = null

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

const getLatestPosition = () => lastLocation

export default {
  geolocateOnce,
  getLatestPosition,
  getCurrentRegion,
  setCurrentRegion
}
