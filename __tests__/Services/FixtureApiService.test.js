import ApiService from '../../App/Services/ApiService'
import FixtureApiService, {
  fixtureMarkers,
  fixtureAddress,
  fixtureMessageOk,
  fixtureMessageNotOk,
  user1,
  wallets
} from '../../App/Services/FixtureApiService'
import 'react-test-renderer'
import 'isomorphic-fetch'

describe('FixtureApi tests', () => {
  it('gets correct markers', async () => {
    let markers = null
    const neLat = 0
    const swLat = 0
    const swLng = 0
    const neLng = 0
    await FixtureApiService.getMarkers(neLat, swLat, swLng, neLng, (res) => {
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

  it('fails with email already existing', async () => {
    const email = 'prova@gmail.com'
    const password = ''
    let checked = null
    const ssn = ''
    await FixtureApiService.registerUser(email, ssn, password, (_, res) => {
      checked = res
    })
    expect(checked).toEqual(fixtureMessageNotOk)
  })

  it('fails with ssn already existing', async () => {
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
    const email = 'prova@gmail.com'
    const password = '12345678'
    let error = ''
    await FixtureApiService.logInUser(email, password, (err) => {
      error = err
    })
    expect(error).toBeNull()
  })

  it('logs in fail password uncorrectly', async () => {
    const email = 'prova@gmail.com'
    const password = ''
    let error = ''
    await FixtureApiService.logInUser(email, password, (err) => {
      error = err
    })
    expect(error)
  })

  it('logs in fail password uncorrectly', async () => {
    const email = ''
    const password = '12345678'
    let error = ''
    await FixtureApiService.logInUser(email, password, (err) => {
      error = err
    })
    expect(error)
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

  it('checks success vote', async () => {
    const vote = 1
    const report = 0
    let error = ''
    await FixtureApiService.voteReport(vote, report, (err) => {
      error = err
    })
    expect(error).toBeNull()
  })

  it('checks error vote', async () => {
    const vote = 0
    const report = 0
    let error = ''
    await FixtureApiService.voteReport(vote, report, (err) => {
      error = err
    })
    expect(error)
  })

  it('unsuccess change password', async () => {
    const email = 'prova@gmail.com'
    const oldPassword = '12345678'
    const newPassword = '87654321'
    const corfirmPassword = '44444444'
    let error = ''
    await FixtureApiService.changePassword(email, oldPassword, newPassword, corfirmPassword, (err) => {
      error = err
    })
    expect(error)
  })

  it('success change password', async () => {
    const email = 'prova@gmail.com'
    const oldPassword = '12345678'
    const newPassword = '87654321'
    const corfirmPassword = '87654321'
    let error = ''
    await FixtureApiService.changePassword(email, oldPassword, newPassword, corfirmPassword, (err) => {
      error = err
    })
    expect(error).toBeNull()
  })

  it('gets tokens amount from wallet', async (done) => {
    let value = 0
    const cb = v => { value = v }
    await FixtureApiService.getBalance(null, cb)
    expect(value).toBe(wallets[user1.id])
    done()
  })
})
