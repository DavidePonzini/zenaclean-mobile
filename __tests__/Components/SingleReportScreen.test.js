import React from 'react'
import SingleReportScreen from '../../App/Components/SingleReportScreen'

import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'isomorphic-fetch'
import { shallowToJson } from 'enzyme-to-json'
import { fixtureMarkers } from '../../App/Services/FixtureApiService'

configure({ adapter: new Adapter() })

const fixtureNavigation = { navigate: jest.fn(),
  state: {
    params: {
      marker: fixtureMarkers[0]
    }
  }
}

jest.mock('../../App/Services/ApiService', () => require('../../App/Services/FixtureApiService'))

describe('SingleReportScreen tests', () => {
  const wrapper = shallow(<SingleReportScreen navigation={fixtureNavigation} />)
  it('renders correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('converts coordinates to address', async () => {
    const instance = wrapper.instance()
    await instance.componentWillMount()
    expect(instance.state.address).toBe('Via del Camoscio')
  })
})
