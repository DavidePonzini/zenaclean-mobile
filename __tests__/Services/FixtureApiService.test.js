import ApiService from '../../App/Services/ApiService'
import FixtureApiService, {
  fixtureMarkers,
  fixtureAddress,
  fixtureMessageOk,
  fixtureMessageNotOk
} from '../../App/Services/FixtureApiService'
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
    let address = null
    const lat = 0
    const lng = 0
    await FixtureApiService.getAddressFromCoords({ lat, lng }, (_, res) => {
      address = res
    })
    expect(address).toEqual(fixtureAddress)
  })

  it('has the same methods as ApiService', () => {
    expect(Object.keys(FixtureApiService)).toEqual(Object.keys(ApiService))
  })

  it('correctly signs up user', async () => {
    const email = ''
    const password = ''
    let checked = null
    const ssn = 'LNGSVV60T17H509H'
    await FixtureApiService.registerUser(email, ssn, password, (_, res) => {
      checked = res
    })
    expect(checked).toEqual(fixtureMessageOk)
  })

  it('fails with non existing user', async () => {
    const email = ''
    const password = ''
    let checked = null
    const ssn = 'LNGSVV60T17H509N'
    await FixtureApiService.registerUser(email, ssn, password, (_, res) => {
      checked = res
    })
    expect(checked).toEqual(fixtureMessageNotOk)
  })

  it('uploads report', async () => {
    const infoReport = {}
    let error = ''
    await FixtureApiService.uploadReport(infoReport, (err) => {
      error = err
    })
    expect(error).toBeNull()
  })

  it('logs in correctly', async () => {
    const email = ''
    const password = ''
    let error = ''
    await FixtureApiService.logInUser(email, password, (err) => {
      error = err
    })
    expect(error).toBeNull()
  })

  it('checks whether the user is logged in', async () => {
    const email = ''
    const password = ''
    await FixtureApiService.logInUser(email, password, () => {})
    expect(FixtureApiService.isLoggedIn()).toBeTruthy()
  })

  it('logs out correctly', () => {
    FixtureApiService.logoutUser()
    expect(FixtureApiService.isLoggedIn()).toBeFalsy()
  })
})
