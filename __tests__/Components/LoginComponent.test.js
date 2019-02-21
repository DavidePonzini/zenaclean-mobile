import React from 'react'
import LoginComponent from '../../App/Components/LoginComponent'

import { user1 } from '../../App/Services/FixtureApiService'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'isomorphic-fetch'
import { shallowToJson } from 'enzyme-to-json'

configure({ adapter: new Adapter() })

jest.mock('../../App/Services/ApiService', () => require('../../App/Services/FixtureApiService'))
const navigation = { navigate: jest.fn(), dispatch: jest.fn() }

describe('LoginComponent tests', () => {
  const wrapper = shallow(<LoginComponent navigation={navigation} />)
  it('renders correctly', () => {
    wrapper.update()
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('navigates when successful login', async (done) => {
    await logInCorrectly(wrapper)
    await expect(navigation.dispatch).toHaveBeenCalled()
    done()
  })

  it('navigates when it finds a persisted session', async (done) => {
    const wrapper = shallow(<LoginComponent navigation={navigation} />)
    await logInCorrectly(wrapper)
    wrapper.unmount()
    shallow(<LoginComponent navigation={navigation} />)
    await expect(navigation.dispatch).toHaveBeenCalled()
    done()
  })

  it('shows a popup on failed login attempt', async (done) => {
    const emailInput = wrapper.find({ testID: 'login-email' }).first()
    emailInput.simulate('changeText', 'pippo')
    const pwdInput = wrapper.find({ testID: 'login-password' }).first()
    pwdInput.simulate('changeText', 'pippo')
    wrapper.update()
    const loginButton = wrapper.find({ testID: 'login-button' }).first()
    await loginButton.simulate('Press')
    await expect(wrapper.find({ testID: 'login-failed' })).toHaveLength(1)
    done()
  })
})

const logInCorrectly = async (wrapper) => {
  const emailInput = wrapper.find({ testID: 'login-email' }).first()
  emailInput.simulate('changeText', user1.email)
  const pwdInput = wrapper.find({ testID: 'login-password' }).first()
  pwdInput.simulate('changeText', user1.password)
  wrapper.update()
  const loginButton = wrapper.find({ testID: 'login-button' }).first()
  await loginButton.simulate('Press')
}