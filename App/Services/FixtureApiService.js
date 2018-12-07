export const fixtureMarkers = []

const getAddressFromCoords = ({ lat, lng }, cb) => {
  return new Promise((resolve) => {
    resolve('Via del Camoscio')
  }).then((res) => { cb(res) })
}

const getMarkers = (cb) => {
  return new Promise((resolve) => {
    resolve(JSON.stringify(fixtureMarkers))
  }).then((res) => { cb(JSON.parse(res)) })
}

export default {
  getAddressFromCoords,
  getMarkers
}
