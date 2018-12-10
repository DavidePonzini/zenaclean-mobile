export const fixtureMarkers = [{ title: 'Divano abbandonato', latitude: 44.1234, longitude: 8.1234, description: 'Divano abbandonato in via Gramsci', timestamp: '2018-12-09T14:40:35 -02:00' }]
export const fixtureAddress = 'Via del Camoscio'

const getAddressFromCoords = ({ lat, lng }, cb) => {
  return new Promise((resolve) => {
    resolve(fixtureAddress)
  }).then((res) => { cb(res) })
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

export default {
  getAddressFromCoords,
  getMarkers,
  uploadReport
}
