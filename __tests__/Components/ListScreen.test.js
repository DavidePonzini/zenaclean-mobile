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
jest.mock('../../App//Services/GeolocationService', () => require('../../App/Services/FixtureGeolocationService'))
jest.mock('react-navigation', () => { return { SafeAreaView: 'SafeAreaView' } })

const navigation = { navigate: jest.fn() }

describe('List tests', () => {
  const wrapper = shallow(<ListScreen navigation={navigation} />)
  it('displays empty list before markers are loaded', () => {
    const list = wrapper.find('FlatList').first()
    expect(list.props().data).toEqual([])
  })
  it('renders correctly', async () => {
    const instance = wrapper.instance()
    await instance.componentWillMount()
    wrapper.update()
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
  it('displays NoReportsLeftComponent if no markers are present', () => {
    const instance = wrapper.instance()
    instance.setState({ markers: [] })
    wrapper.update()
    expect(wrapper.find('NoReportsLeftComponent').first()).toBeTruthy()
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
