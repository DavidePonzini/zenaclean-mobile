import React from 'react'
import { fixtureMarkers } from '../../App/Services/FixtureApiService'
import { shallow, configure } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16'
import 'isomorphic-fetch'

import ListScreen from '../../App/Components/ListScreen'
import ReportListItem from '../../App/Components/ReportListItem'
configure({ adapter: new Adapter() })

jest.mock('../../App/Services/ApiService', () => require('../../App/Services/FixtureApiService'))
jest.mock('react-navigation', () => { return { SafeAreaView: 'SafeAreaView' } })

const navigation = { navigate: jest.fn() }

describe('List tests', () => {
  const wrapper = shallow(<ListScreen navigation={navigation} />)
  it('renders correctly', async () => {
    const instance = wrapper.instance()
    await instance.componentWillMount()
    wrapper.update()
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
  it('downloads markers', async () => {
    const instance = wrapper.instance()
    await instance.componentWillMount()
    expect(instance.state.markers).toEqual(fixtureMarkers)
  })
  it('renders markers', () => {
    const element = wrapper.instance().renderItem({ item: fixtureMarkers[0] })
    expect(element.type).toBe(ReportListItem)
    expect(element.props.marker).toEqual(fixtureMarkers[0])
  })
})
