import Secrets from 'react-native-config'
import { AsyncStorage } from 'react-native'
import { composeAddress } from '../Utils/GeoUtils'
const baseUrl = Secrets.API_URL
const googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + Secrets.GOOGLE_MAPS_API_KEY + '&address='

let userId = null

const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.log(error)
  }
}

const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value != null) {
      return JSON.parse(value)
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

const _unsetData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.log(error)
    return null
  }
}

const voteReport = (v, report, cb) => {
  let body = {
    user: userId,
    report: report,
    vote: v ? 1 : 0
  }
  return fetch(baseUrl + 'reports/vote', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
    .then((response) => {
      if (response.status === 'ok') {
        cb(null)
      } else {
        console.log(response)
        cb(new Error('Error voting'))
      }
    }).catch((err) => {
      cb(new Error('Error voting: ' + err))
    })
}

const rehydrateLogin = async () => {
  try {
    const user = await _retrieveData('@zenaclean:user')
    userId = user.id
    return user
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
        userId = res.user.id
        _storeData('@zenaclean:user', res.user).catch((err) => { console.log(err) })
        cb(null, res.user)
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

const changePassword = (email, oldPassword, newPassword, confirmPassword, cb) => {
  return fetch(baseUrl + 'users/change-password', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    })
  }).then(res => res.json())
    .then((res) => {
      if (res.status === 'ok') {
        cb(null)
      } else {
        cb(new Error('password restore failed'), res)
      }
    })
}

const uploadReport = (infoReport, cb) => {
  infoReport.id = userId // probably this should be different
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
        cb(null, res._id)
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

const getMarkers = (neLat, swLat, swLng, neLng, cb) => {
  return fetch(baseUrl + 'reports?ne_lat=' + neLat + '&sw_lat=' + swLat + '&sw_lng=' + swLng + '&ne_lng=' + neLng +
  (userId != null ? ('&user=' + userId) : ''))
    .then((response) => response.json())
    .then((responseJson) => {
      let markers = []
      Object.keys(responseJson).map((k) => {
        const marker = responseJson[k]
        markers.push({
          ...marker,
          own: marker['user_id'] === userId, // I should not be able to know the author of a report
          id: k
        })
      })
      cb(markers)
    })
}

const logoutUser = (cb) => {
  userId = null
  _unsetData('@zenaclean:user').then(() => { cb(null) })
}

const isLoggedIn = () => userId !== null

const getBalance = (eth_addr, cb) => {
  return fetch(baseUrl + 'users/balance?addr=' + eth_addr)
    .then((response) => {
      return response.json()
    }
    )
    .then(res => {
      cb(res.value)
    })
}

export default {
  getAddressFromCoords,
  getMarkers,
  uploadReport,
  registerUser,
  logInUser,
  changePassword,
  voteReport,
  isLoggedIn,
  logoutUser,
  rehydrateLogin,
  getBalance
}
