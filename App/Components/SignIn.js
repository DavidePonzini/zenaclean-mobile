import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button, Text, Input, Item, Container, Content, Icon } from 'native-base'
import api from '../Services/ApiService'

export default class SignIn extends Component {
  render () {
    return (
      <Container>
        <Content>
          <Image style={styles.logo}
            source={require('../Assets/Images/logo.jpg')}
          />
          <View style={styles.container}>
            <Item rounded style={styles.width_items}>
              <Icon name='ios-person' />
              <Input placeholder='Codice Fiscale' />
            </Item>
            <Item rounded style={[styles.width_items, styles.input_pwd]}>
              <Icon name='ios-at' />
              <Input placeholder='Email' />
            </Item>
            <Item rounded style={[styles.width_items, styles.input_pwd]}>
              <Icon name='ios-lock' />
              <Input placeholder='Password' secureTextEntry />
            </Item>
            <Item rounded style={[styles.width_items, styles.input_pwd]}>
              <Icon name='ios-lock' />
              <Input placeholder='Conferma Password' secureTextEntry />
            </Item>
            <Button rounded style={styles.button_sign_in}>
              <Text>Registrati</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    marginTop: 20,
    width: 150,
    height: 150,
    alignSelf: 'center'
  },
  button_sign_in: {
    marginTop: 40,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  width_items: {
    width: '90%'
  },
  input_pwd: {
    marginTop: 20
  },
  text_footer: {
    fontSize: 15,
    color: 'white'
  }
})
