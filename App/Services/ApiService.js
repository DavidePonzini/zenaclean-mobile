import Secrets from 'react-native-config'

const baseUrl = Secrets.API_URL

const getAddressFromCoords = ({ lat, lng }, cb) => {
  const googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

  fetch(googleApiUrl + lat + ',' + lng + '&key=' + Secrets.GOOGLE_MAPS_API_KEY)
    .then((response) => response.json())
    .then((responseJson) => cb(responseJson))
}

const getMarkers = (cb) => {
  fetch(baseUrl + 'markers.json')
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
      console.log(markers)
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
