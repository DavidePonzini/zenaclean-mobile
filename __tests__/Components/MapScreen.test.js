import React from 'react'
import MapScreen from '../../App/Components/MapScreen'

import renderer from 'react-test-renderer'
import 'isomorphic-fetch'
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

test('renders correctly', () => {
  const navigation = { navigate: jest.fn() }
  const tree = renderer.create(<MapScreen navigation={navigation} />).toJSON()
  expect(tree).toMatchSnapshot()
})
