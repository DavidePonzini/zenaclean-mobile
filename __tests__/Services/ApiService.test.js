import ApiService from '../../App/Services/ApiService'
import FixtureApiService, { fixtureMarkers, fixtureAddress } from '../../App/Services/FixtureApiService'
import 'react-test-renderer'
import 'isomorphic-fetch'

jest.mock('react-native-config', () => {
  const Secrets = require.requireActual('react-native-config')
  return { API_URL: Secrets.API_URL }
})

describe('API tests', () => {
  it('get correct markers', async () => {
    let markers
    await FixtureApiService.getMarkers((res) => {
      markers = res
    })
    expect(markers).toEqual(fixtureMarkers)
  })

  it('get correct address', async () => {
    let address, lat, lng
    await FixtureApiService.getAddressFromCoords({ lat, lng }, cb => {
      address = cb
    })
    expect(address).toEqual(fixtureAddress)
  })

  it('has the same keys as FixtureApi', () => {
    expect(Object.keys(ApiService)).toEqual(Object.keys(FixtureApiService))
  })
})
