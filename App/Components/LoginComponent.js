import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button, Text, Input, Item, Icon } from 'native-base'
import Colors from '../Themes/Colors'
import Images from '../Themes/Images'
import api from '../Services/ApiService'
import { NavigationActions, StackActions } from 'react-navigation'

export default class LoginComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputEmail: '',
      inputPassword: '',
      loginChecked: ''
    }
    api.rehydrateLogin().then(this.navigateAfterLogin)
  }

  navigateAfterLogin = (user) => {
    if (user != null) {
      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'TabNavigator',
            params: {
              logged: true,
              inputEmail: user.email
            }
          })
        ]
      }))
    }
  }
  loginPressed = () => {
    api.logInUser(this.state.inputEmail, this.state.inputPassword, (err, user) => {
      if (err == null) {
        this.navigateAfterLogin(user)
      } else {
        console.log(err)
        this.setState({ loginChecked: 'failed' })
      }
    })
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={{ ...this.props.style }}>
        <View style={styles.container}>
          <Image style={styles.logo}
            source={Images.logo}
          />
          <Item rounded style={styles.width_items}>
            <Icon name='ios-at' />
            <Input
              accessibilityLabel='login-email'
              testID={'login-email'}
              placeholder='Email'
              onChangeText={(email) => this.setState({ inputEmail: email })} />
          </Item>
          <Item rounded style={[styles.width_items, styles.input_pwd]}>
            <Icon name='ios-lock' />
            <Input
              accessibilityLabel='login-password'
              testID={'login-password'}
              placeholder='Password' secureTextEntry
              onChangeText={(password) => this.setState({ inputPassword: password })} />
          </Item>
          <Button
            accessibilityLabel='login-button'
            testID={'login-button'}
            rounded style={styles.button_login}
            onPress={() => this.loginPressed()}>
            <Text>Login</Text>
          </Button>
          {this.state.loginChecked === 'failed' && <Text style={styles.errorInputMessage}>{'Email e/o password errati'}</Text> }
          <View style={styles.fpwd_nuser}>
            <Button transparent>
              <Text accessibilityLabel='signup-button'
                testID={'signup-button'}
                style={styles.color} onPress={() => { navigate('SignUp') }}>Registrati</Text>
            </Button>
            <Button transparent
              accessibilityLabel='signup-forgot'
              testID={'signup-forgot'}>
              <Text style={styles.color}>Password Dimenticata</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    margin: 40,
    width: 180,
    height: 180,
    alignSelf: 'center'
  },
  button_login: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent
  },
  width_items: {
    width: '90%'
  },
  input_pwd: {
    marginTop: 20
  },
  fpwd_nuser: {
    width: '95%',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  color: {
    color: Colors.accent
  },
  errorInputMessage: {
    color: 'red',
    fontSize: 12
  }
})
