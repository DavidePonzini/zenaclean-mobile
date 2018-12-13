import ApiService from '../../App/Services/ApiService'
import FixtureApiService, { fixtureMarkers, fixtureAddress } from '../../App/Services/FixtureApiService'
import 'react-test-renderer'
import 'isomorphic-fetch'

describe('FixtureApi tests', () => {
  it('gets correct markers', async () => {
    let markers = null
    await FixtureApiService.getMarkers((res) => {
      markers = res
    })
    expect(markers).toEqual(fixtureMarkers)
  })

  it('gets correct address', async () => {
    let address, lat, lng
    await FixtureApiService.getAddressFromCoords({ lat, lng }, (_, res) => {
      address = res
    })
    expect(address).toEqual(fixtureAddress)
  })

  it('has the same methods as ApiService', () => {
    expect(Object.keys(FixtureApiService)).toEqual(Object.keys(ApiService))
  })
})
