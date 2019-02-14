export const fixtureAddress = 'Via del Camoscio'
export const fixtureMarkers = [{ address: fixtureAddress, title: 'Divano abbandonato', latitude: 44.1234, longitude: 8.1234, description: 'Divano abbandonato in via Gramsci', timestamp: '2018-12-09T14:40:35 -02:00' }]
export const fixtureMessageOk = 'Registrazione effettuata con successo!'
export const fixtureMessageNotOk = 'Utente già esistente'
export const fixtureUserId = 'verylonguserid'
const SSNlist = ['LNGSVV60T17H509N', 'HTHHLG90R62B112N', 'BRTHZG56P68C982U']
const emailList = ['prova@gmail.com', 'prova@hotmail.it']
const user1 = ['prova@gmail.com', '12345678']
const totVoti = [32, 45, 21]
let userId = null

const logInUser = (email, password, cb) => {
  return new Promise(resolve => {
    (user1[0] === email && user1[1] === password) ? resolve({ status: 'ok' }) : resolve({ status: 'no' })
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

const getMarkers = (neLat, swLat, swLng, neLng, cb) => {
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
    for (let i = 0; i < emailList.length; i++) {
      if (emailList[i] === email) checked = true
    }
    if (!checked) { resolve(fixtureMessageOk) }
    if (checked) { resolve(fixtureMessageNotOk) }
  }).then((res) => { cb(null, res) })
}

const voteReport = (v, report, cb) => {
  return new Promise((resolve) => {
    let old = totVoti[report]
    let current = totVoti[report] + 1
    if (old < current) resolve({ status: 'ok' })
    else resolve({ status: 'no' })
  }).then((res, current) => {
    if (res.status === 'ok') {
      totVoti[report] = current
      cb(null)
    } else {
      cb(new Error('login failed'), res)
    }
  })
}

const changePassword = (email, oldPassword, newPassword, confirmPassword, cb) => {
  return new Promise((resolve) => {
    if (user1[1] === oldPassword && newPassword === confirmPassword) resolve({ status: 'ok' })
    else resolve({ status: 'no' })
  }).then((res) => {
    if (res.status === 'ok') {
      user1[1] = newPassword
      cb(null)
    } else {
      cb(new Error('login failed'), res)
    }
  })
}

const isLoggedIn = () => userId != null

const logoutUser = () => {
  userId = null
}
const rehydrateLogin = () => { userId = fixtureUserId }
const getBalance = () => {}
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
