export const fixtureAddress = 'Via del Camoscio'
export const fixtureMarkers = [{ address: fixtureAddress, title: 'Divano abbandonato', latitude: 44.1234, longitude: 8.1234, description: 'Divano abbandonato in via Gramsci', timestamp: '2018-12-09T14:40:35 -02:00' }]
export const fixtureMessageOk = 'Registrazione effettuata con successo!'
export const fixtureMessageNotOk = 'Utente già esistente'
export const fixtureUserId = 'verylonguserid'
const SSNlist = ['LNGSVV60T17H509N', 'HTHHLG90R62B112N', 'BRTHZG56P68C982U']
let userId = null

const logInUser = (email, password, cb) => {
  return new Promise(resolve => {
    resolve({ status: 'ok' })
  }).then((res) => {
    if (res.status === 'ok') {
      userId = fixtureUserId
      cb(null)
    } else {
      cb(new Error('login failed'), res)
    }
  })
}

const getAddressFromCoords = ({ lat, lng }, cb) => {
  return new Promise((resolve) => {
    resolve(fixtureAddress)
  }).then((res) => { cb(null, res) })
}

const getMarkers = (ne_lat, sw_lat, sw_lng, ne_lng, cb) => {
  return new Promise((resolve) => {
    resolve(JSON.stringify(fixtureMarkers))
  }).then((res) => { cb(JSON.parse(res)) })
}

const uploadReport = (infoReport, cb) => {
  return new Promise((resolve) => {
    resolve({ status: 'ok' })
  }).then(() => {
    cb(null)
  })
}

const registerUser = (email, ssn, password, cb) => {
  return new Promise((resolve) => {
    let checked = false
    for (let i = 0; i < SSNlist.length; i++) {
      if (SSNlist[i] === ssn) checked = true
    }
    if (!checked) { resolve(fixtureMessageOk) }
    if (checked) { resolve(fixtureMessageNotOk) }
  }).then((res) => { cb(null, res) })
}

// To Fix
const voteReport = (v, report, cb) => {
  return new Promise((resolve) => {
    resolve({ status: 'ok' })
  }).then(() => {
    cb(null)
  })
}

// To Fix
const changePassword = (email, oldPassword, newPassword, confirmPassword, cb) => {
  return new Promise((resolve) => {
    resolve({ status: 'ok' })
  }).then(() => {
    cb(null)
  })
}

const isLoggedIn = () => userId != null

const logoutUser = () => {
  userId = null
}
const rehydrateLogin = () => { userId = fixtureUserId }

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
  rehydrateLogin
}
