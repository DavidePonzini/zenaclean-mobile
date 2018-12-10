import Secrets from 'react-native-config'

const baseUrl = Secrets.API_URL
const googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

const getAddressFromCoords = ({ lat, lng }, cb) => {
  return fetch(googleApiUrl + lat + ',' + lng + '&key=' + Secrets.GOOGLE_MAPS_API_KEY)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return 'Indirizzo sconosciuto'
      }
    })
    .then((responseJson) => { cb(responseJson) })
}

const getMarkers = (cb) => {
  return fetch(baseUrl + 'markers.json')
    .then((response) => response.json())
    .then((responseJson) => {
      let markers = []
      Object.keys(responseJson).map((k) => {
        const marker = responseJson[k]
        markers.push({
          ...marker,
          id: k
        })
      })
      cb(markers)
    })
}

const uploadReport = (infoReport) => {
  return fetch(baseUrl + 'markers.json', {
    method: 'POST',
    body: JSON.stringify(infoReport)
  })
}
export default {
  getAddressFromCoords,
  getMarkers,
  uploadReport
}
