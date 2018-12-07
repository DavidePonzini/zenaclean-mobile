import React from 'react'
import MapScreen from '../../App/Components/MapScreen'

import { fixtureMarkers } from '../../App/Services/FixtureApiService'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import 'isomorphic-fetch'

configure({ adapter: new Adapter() })

jest
  .mock('react-native-maps', () => {
    // eslint-disable-next-line import/no-unresolved
    const React = require('React')
    const PropTypes = require('prop-types')
    return class MockPicker extends React.Component {
      static Item = props => React.createElement('Item', props, props.children);
      static propTypes = { children: PropTypes.any };
      static defaultProps = { children: '' };

      render () {
        return React.createElement('MapView', this.props, this.props.children)
      }
    }
  })

jest
  .mock('react-native-action-button', () => {
    // eslint-disable-next-line import/no-unresolved
    const React = require('React')
    const PropTypes = require('prop-types')
    return class MockPicker extends React.Component {
      static Item = props => React.createElement('Item', props, props.children);
      static propTypes = { children: PropTypes.any };
      static defaultProps = { children: '' };

      render () {
        return React.createElement('ActionButton', this.props, this.props.children)
      }
    }
  })

jest.mock('../../App/Services/ApiService', () => require('../../App/Services/FixtureApiService'))

const navigation = { navigate: jest.fn() }

test('renders correctly', () => {
  const tree = renderer.create(<MapScreen navigation={navigation} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('markers downloaded', async () => {
  const wrapper = shallow(<MapScreen navigation={navigation} />)
  const instance = wrapper.instance()
  await instance.componentWillMount()
  expect(instance.state.markers.length).toBe(fixtureMarkers.length)
})
