import Secrets from 'react-native-config'
import { composeAddress } from '../Utils/GeoUtils'
const baseUrl = Secrets.API_URL
const googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + Secrets.GOOGLE_MAPS_API_KEY + '&address='

const registerUser = (email, ssn, password, cb) => {
  return fetch(baseUrl + 'users/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      ssn: ssn,
      password: password
    })
  }).then(res => res.json())
    .then(cb)
}

const getAddressFromCoords = ({ lat, lng }, cb) => {
  return fetch(googleApiUrl + lat + ',' + lng)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        return new Promise((resolve) => { resolve('Indirizzo sconosciuto') })
      }
    })
    .then((responseJson) => {
      if (responseJson.status === 'OK') {
        try {
          let address = composeAddress(responseJson.results[0].address_components)
          cb(null, address)
        } catch (e) {
          console.error(e)
          cb(new Error('no address'), 'Indirizzo sconosciuto')
        }
      } else if (responseJson.status === 'REQUEST_DENIED') {
        cb(new Error('invalid api key'), 'Indirizzo sconosciuto')
      } else {
        cb(new Error('no address'), 'Indirizzo sconosciuto')
      }
    })
}

const getMarkers = (cb) => {
  return fetch(baseUrl + 'reports')
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
  return fetch(baseUrl + 'reports', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(infoReport)
  })
}
export default {
  getAddressFromCoords,
  getMarkers,
  uploadReport,
  registerUser
}
