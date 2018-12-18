import ApiService from '../../App/Services/ApiService'
import FixtureApiService, { fixtureMarkers, fixtureAddress, fixtureMessageOk, fixtureMessageNotOk } from '../../App/Services/FixtureApiService'
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

  it('correct sign up user', async () => {
    let email, password, checked
    let ssn = 'LNGSVV60T17H509H'
    await FixtureApiService.registerUser(email, ssn, password, (_, res) => {
      checked = res
    })
    expect(checked).toEqual(fixtureMessageOk)
  })

  it('not correct sign up user', async () => {
    let email, password, checked
    let ssn = 'LNGSVV60T17H509N'
    await FixtureApiService.registerUser(email, ssn, password, (_, res) => {
      checked = res
    })
    expect(checked).toEqual(fixtureMessageNotOk)
  })
})
