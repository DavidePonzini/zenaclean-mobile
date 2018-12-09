import React from 'react'
import { fixtureMarkers } from '../../App/Services/FixtureApiService'
import { shallow, configure } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import 'isomorphic-fetch'

import ReportListItem from '../../App/Components/ReportListItem'
configure({ adapter: new Adapter() })

jest.mock('../../App/Services/ApiService', () => require('../../App/Services/FixtureApiService'))
const onPress = jest.fn()

describe('List tests', () => {
  const wrapper = shallow(<ReportListItem marker={fixtureMarkers[0]} onPress={onPress} />)
  it('renders correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
  it('navigates when tapped', () => {
    wrapper.find('TouchableOpacity').first().simulate('Press')
    expect(onPress).toHaveBeenCalled()
  })
})
