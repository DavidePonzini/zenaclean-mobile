import Secrets from 'react-native-config'

const baseUrl = Secrets.API_URL

const getAddressFromCoords = ({ lat, lng }, cb) => {
  const googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  return fetch(googleApiUrl + lat + ',' + lng + '&key=' + Secrets.GOOGLE_MAPS_API_KEY)
    .then((response) => response.json())
    .then((responseJson) => { cb(responseJson) })
}

const getMarkers = (cb) => {
  fetch(baseUrl + 'markers.json')
    .then((response) => response.json())
    .then((responseJson) => { cb(responseJson) })
}
export default {
  getAddressFromCoords,
  getMarkers
}
