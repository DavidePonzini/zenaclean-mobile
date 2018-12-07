import React from 'react'
import SingleReportScreen from '../../App/Components/SingleReportScreen'

import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import 'isomorphic-fetch'

configure({ adapter: new Adapter() })

const fixtureMarker = { 'description': 'In mezzo alla strada', 'latitude': 44.400879, 'longitude': 8.972585, 'timestamp': '2018-02-28T06:35:33 -01:00', 'title': 'Divano abbandonato' }
const fixtureNavigation = { navigate: jest.fn(),
  state: {
    params: {
      marker: fixtureMarker
    }
  }
}

jest.mock('../../App/Services/ApiService', () => require('../../App/Services/FixtureApiService'))

test('renders correctly', () => {
  const tree = renderer.create(<SingleReportScreen navigation={fixtureNavigation} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('coordinates converted to address', async () => {
  const wrapper = shallow(<SingleReportScreen navigation={fixtureNavigation} />)
  const instance = wrapper.instance()
  await instance.componentWillMount()
  expect(instance.state.address).toBe('Via del Camoscio')
})
