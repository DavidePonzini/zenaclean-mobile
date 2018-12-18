export const fixtureAddress = 'Via del Camoscio'
export const fixtureMarkers = [{ address: fixtureAddress, title: 'Divano abbandonato', latitude: 44.1234, longitude: 8.1234, description: 'Divano abbandonato in via Gramsci', timestamp: '2018-12-09T14:40:35 -02:00' }]
export const fixtureMessageOk = 'Registrazione effettuata con successo!'
export const fixtureMessageNotOk = 'Utente già esistente'

const SSNlist = ['LNGSVV60T17H509N', 'HTHHLG90R62B112N', 'BRTHZG56P68C982U']

const getAddressFromCoords = ({ lat, lng }, cb) => {
  return new Promise((resolve) => {
    resolve(fixtureAddress)
  }).then((res) => { cb(null, res) })
}

const getMarkers = (cb) => {
  return new Promise((resolve) => {
    resolve(JSON.stringify(fixtureMarkers))
  }).then((res) => { cb(JSON.parse(res)) })
}

const uploadReport = () => {
  return new Promise((resolve) => {
    resolve({ ok: true })
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

export default {
  getAddressFromCoords,
  getMarkers,
  registerUser,
  uploadReport
}
