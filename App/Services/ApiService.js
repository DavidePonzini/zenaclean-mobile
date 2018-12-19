import Secrets from 'react-native-config'
import { AsyncStorage } from 'react-native'
import { composeAddress } from '../Utils/GeoUtils'
const baseUrl = Secrets.API_URL
const googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + Secrets.GOOGLE_MAPS_API_KEY + '&address='

const _storeData = async () => {
  try {
    await AsyncStorage.setItem('@zenaclean:logged', 'true');
  } catch (error) {
    console.log(error)
  }
}

const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('@zenaclean:logged');
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

const logInUser = (email, password, cb) => {
  return fetch(baseUrl + 'users/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(res => res.json())
    .then((res) => {
      if (res.status === 'ok') {
        cb(null)
      } else {
        cb(new Error('login failed'), res)
      }
    })
}

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
    .then((res) => {
      if (res.status === 'ok') {
        cb(null)
      } else {
        cb(new Error('registration failed'), res)
      }
    })
}

const uploadReport = (infoReport, cb) => {
  return fetch(baseUrl + 'reports', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(infoReport)
  }).then(res => res.json())
    .then((res) => {
      if (res.status === 'ok') {
        cb(null)
      } else {
        cb(new Error('failed to upload'), res)
      }
    })
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

export default {
  getAddressFromCoords,
  getMarkers,
  uploadReport,
  registerUser,
  logInUser
}
