import React from 'react'
import MapScreen from '../../App/Components/MapScreen'

import { fixtureMarkers } from '../../App/Services/FixtureApiService'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'isomorphic-fetch'
import { shallowToJson } from 'enzyme-to-json'
import { Marker, Callout } from 'react-native-maps'

configure({ adapter: new Adapter() })

jest.mock('../../App/Services/ApiService', () => require('../../App/Services/FixtureApiService'))

const navigation = { navigate: jest.fn(), state: { params: { logged: true } } }

describe('MapScreen tests', () => {
  const wrapper = shallow(<MapScreen navigation={navigation} />)
  it('renders correctly', async () => {
    const instance = wrapper.instance()
    await instance.componentWillMount()
    wrapper.update()
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('downloads markers', async () => {
    const instance = wrapper.instance()
    await instance.componentWillMount()
    expect(instance.state.markers.length).toBe(fixtureMarkers.length)
  })

  it('renders markers', () => {
    const instance = wrapper.instance()
    const marker = instance.renderMarker(fixtureMarkers[0])
    expect(marker.type).toBe(Marker)
  })

  it('navigates when marker callout is pressed', async () => {
    const instance = wrapper.instance()
    await instance.componentWillMount()
    const marker = wrapper.find(Marker).first()
    marker.simulate('Press')
    wrapper.update()
    const callout = wrapper.find(Callout).first()
    callout.simulate('Press')
    expect(navigation.navigate).toHaveBeenCalled()
  })
})
