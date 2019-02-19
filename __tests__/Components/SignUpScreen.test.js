import React from 'react'
import SignUpScreen from '../../App/Components/SignUpScreen'
import Alert from 'Alert'

import { user1 } from '../../App/Services/FixtureApiService'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'isomorphic-fetch'
import { shallowToJson } from 'enzyme-to-json'

configure({ adapter: new Adapter() })

jest.mock('../../App/Services/ApiService', () => require('../../App/Services/FixtureApiService'))
jest.mock('Alert', () => {
  return {
    alert: jest.fn()
  }
})
const navigation = { navigate: jest.fn(), goBack: jest.fn() }

describe('SignUpScreen tests', () => {
  const wrapper = shallow(<SignUpScreen navigation={navigation} />)
  it('renders correctly', () => {
    wrapper.update()
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('shows a popup on failed sign up attempt', async (done) => {
    Alert.alert.mockClear()
    const ssnInput = wrapper.find({ testID: 'ssn-signup' }).first()
    ssnInput.simulate('changeText', user1[2])
    const emailInput = wrapper.find({ testID: 'signup-email' }).first()
    emailInput.simulate('changeText', user1[0])
    const pwdInput = wrapper.find({ testID: 'signup-password' }).first()
    pwdInput.simulate('changeText', user1[1])
    const cpwdInput = wrapper.find({ testID: 'signup-confirmbutton' }).first()
    cpwdInput.simulate('changeText', 'nop')
    wrapper.update()
    const signUpButton = wrapper.find({ testID: 'signup-button' }).first()
    await signUpButton.simulate('Press')
    await expect(Alert.alert.mock.calls[0][0]).toEqual('Campi inseriti non validi o mancanti')
    done()
  })

  it('navigates when successful register', async (done) => {
    Alert.alert.mockClear()
    const ssnInput = wrapper.find({ testID: 'ssn-signup' }).first()
    ssnInput.simulate('changeText', user1[2])
    const emailInput = wrapper.find({ testID: 'signup-email' }).first()
    emailInput.simulate('changeText', user1[0])
    const pwdInput = wrapper.find({ testID: 'signup-password' }).first()
    pwdInput.simulate('changeText', user1[1])
    const cpwdInput = wrapper.find({ testID: 'signup-confirmbutton' }).first()
    cpwdInput.simulate('changeText', user1[1])
    const gdprButton = wrapper.find({ testID: 'gdpr-checkbox' }).first()
    await gdprButton.simulate('Press')
    const signUpButton = wrapper.find({ testID: 'signup-button' }).first()
    await signUpButton.simulate('Press')
    Alert.alert.mock.calls[0][2][0].onPress()
    await expect(navigation.goBack).toHaveBeenCalled()
    done()
  })
})
