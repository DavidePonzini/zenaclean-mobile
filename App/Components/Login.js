import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button, Text, Input, Item, Container, Content, Icon } from 'native-base'
import Colors from '../Themes/Colors'
import api from '../Services/ApiService'

export default class Login extends Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <Container style={{ height: '200%' }}>
        <Content>
          <Image style={styles.logo}
            source={require('../Assets/Images/logo.png')}
          />
          <View style={styles.container}>
            <Item rounded style={styles.width_items}>
              <Icon name='ios-at' />
              <Input placeholder='Email' />
            </Item>
            <Item rounded style={[styles.width_items, styles.input_pwd]}>
              <Icon name='ios-lock' />
              <Input placeholder='Password' secureTextEntry />
            </Item>
            <Button rounded style={styles.button_login}>
              <Text>Login</Text>
            </Button>
            <View style={styles.fpwd_nuser}>
              <Button transparent >
                <Text style={styles.color} onPress={() => { navigate('SignIn') }}>Registrati</Text>
              </Button>
              <Button transparent >
                <Text style={styles.color}>Password Dimenticata</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    marginTop: 40,
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
  }
})
