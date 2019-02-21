import React from 'react'
import SingleReportScreen from '../../App/Components/SingleReportScreen'
import { Alert } from 'react-native'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'isomorphic-fetch'
import { shallowToJson } from 'enzyme-to-json'
import FixtureApiService, { fixtureMarkers } from '../../App/Services/FixtureApiService'
import ApiService from '../../App/Services/ApiService'

configure({ adapter: new Adapter() })

const fixtureNavigation = { navigate: jest.fn(),
  state: {
    params: {
      marker: fixtureMarkers[0]
    }
  }
}
jest.mock('Alert', () => {
  return {
    alert: jest.fn()
  }
})
jest.mock('../../App/Services/ApiService', () => require('../../App/Services/FixtureApiService'))

describe('SingleReportScreen tests', () => {
  const wrapper = shallow(<SingleReportScreen navigation={fixtureNavigation} />)
  it('renders correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('fires api when voting', () => {
    const voteButton = wrapper.find({ testID: 'vote-up' })
    FixtureApiService.isLoggedIn = jest.fn(() => true)
    FixtureApiService.voteReport = jest.fn()
    voteButton.simulate('Press')
    Alert.alert.mock.calls[0][2][0].onPress()
    expect(FixtureApiService.voteReport).toHaveBeenCalled()
  })

  it('prevents voting if not logged in', () => {
    const voteButton = wrapper.find({ testID: 'vote-up' })
    FixtureApiService.isLoggedIn = jest.fn(() => false)
    FixtureApiService.voteReport = jest.fn()
    voteButton.simulate('Press')
    const alert = Alert.alert.mock.calls[0][0]
    expect(alert).toEqual('Attenzione!')
  })

  it('prevents voting own report', () => {
    const fixtureNavigation = { navigate: jest.fn(),
      state: {
        params: {
          marker: { ...fixtureMarkers[0], own: true }
        }
      }
    }
    const wrapper = shallow(<SingleReportScreen navigation={fixtureNavigation} />)
    const voteButton = wrapper.find({ testID: 'vote-up' })
    expect(voteButton).toHaveLength(0)
  })
})
