import React from 'react'
import AddReportScreen from '../../App/Components/AddReportScreen'

import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'isomorphic-fetch'
import { shallowToJson } from 'enzyme-to-json'
import { fixtureMarkers } from '../../App/Services/FixtureApiService'

configure({ adapter: new Adapter() })

const fixtureNavigation = { navigate: jest.fn(),
  state: {
    params: {
      lat: fixtureMarkers[0].latitude,
      lng: fixtureMarkers[0].longitude
    }
  }
}

jest.mock('../../App/Services/ApiService', () => require('../../App/Services/FixtureApiService'))

describe('AddReportScreen tests', () => {
  const wrapper = shallow(<AddReportScreen navigation={fixtureNavigation} />)
  it('renders correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
  const instance = wrapper.instance()
  it('converts coordinates to address', async () => {
    await instance.componentWillMount()
    expect(instance.state.address).toBe('Via del Camoscio')
  })
  const submitButton = wrapper.findWhere((element) => element.props().title === 'Invia').first()
  it('initializes title with empty string', () => {
    const titleComponent = wrapper.findWhere((element) => element.props().onChangeText === instance.handleTitle).first()
    expect(titleComponent.props().value).toEqual('')
  })
  it('prevents submit with empty title', () => {
    expect(submitButton.props().disabled).toBeTruthy()
  })
  it('uploads data successfully', async () => {
    instance.uploadData = jest.fn()
    instance.handleTitle('Divano abbandonato')
    wrapper.update()
    submitButton.simulate('Press')
    expect(instance.uploadData).toHaveBeenCalled()
  })
})
