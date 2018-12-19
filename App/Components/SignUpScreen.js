import React, { Component } from 'react'
import { StyleSheet, View, Image, Alert } from 'react-native'
import { Button, Text, Input, Item, Container, Content, Icon } from 'native-base'
import Colors from '../Themes/Colors'
import api from '../Services/ApiService'
import ActionButton from 'react-native-action-button'

export default class SignUpScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputCV: '',
      inputEmail: '',
      inputPassword: '',
      inputRePassword: '',
      validCV: undefined,
      validEmail: undefined,
      validPassword: undefined,
      validRePassword: undefined
    }
  }

  submit = () => {
    let that = this
    if (this.state.validCV && this.state.validEmail && this.state.validPassword && this.state.validRePassword) {
      api.registerUser(this.state.inputEmail, this.state.inputCV, this.state.inputPassword, res => {
        if (res.status === 'ok') {
          Alert.alert('Registrazione effettuata con successo!', '', [
            { text: 'OK', onPress: () => { that.props.navigation.goBack() } }
          ])
        } else {
          Alert.alert(res.error)
        }
      })
    } else {
      Alert.alert('Campi inseriti non validi')
    }
  }

  checkInputCV = (cv) => {
    this.setState({ inputCV: cv })
    let reg = /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/
    reg.test(cv) ? this.setState({ validCV: true }) : this.setState({ validCV: false })
  }

  checkInputEmail = (email) => {
    this.setState({ inputEmail: email })
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    reg.test(email) ? this.setState({ validEmail: true }) : this.setState({ validEmail: false })
  }

  checkInputPassword = (password) => {
    this.setState({ inputPassword: password })
    password.length >= 8 ? this.setState({ validPassword: true }) : this.setState({ validPassword: false })
  }

  checkInputRePassword = (rePassword) => {
    this.setState({ inputRePassword: rePassword })
    this.state.inputPassword === rePassword
      ? this.setState({ validRePassword: true }) : this.setState({ validRePassword: false })
  }

  render () {
    return (
      <Container>
        <Content>
          <Image style={styles.logo}
            source={require('../Assets/Images/logo.png')}
          />
          <View style={styles.container}>
            <Item rounded style={styles.width_items}
              success={typeof this.state.validCV !== 'undefined' ? this.state.validCV : undefined}
              error={typeof this.state.validCV !== 'undefined' ? !(this.state.validCV) : undefined}>
              <Icon name='ios-person' />
              <Input
                accessibilityLabel='ssn-signup'
                testID={'ssn-signup'}
                placeholder='Codice Fiscale'
                onChangeText={(cv) => this.checkInputCV(cv)} />
            </Item>
            {typeof this.state.validCV !== 'undefined' && !this.state.validCV && <Text style={styles.errorInputMessage}>{'CV non valido'}</Text> }
            <Item rounded style={[styles.width_items, styles.input_pwd]}
              success={typeof this.state.validEmail !== 'undefined' ? this.state.validEmail : undefined}
              error={typeof this.state.validEmail !== 'undefined' ? !(this.state.validEmail) : undefined}>
              <Icon name='ios-at' />
              <Input
                accessibilityLabel='signup-email'
                testID={'signup-email'}
                placeholder='Email'
                onChangeText={(email) => this.checkInputEmail(email)} />
            </Item>
            {typeof this.state.validEmail !== 'undefined' && !this.state.validEmail && <Text style={styles.errorInputMessage}>{'Email non valida'}</Text> }
            <Item rounded style={[styles.width_items, styles.input_pwd]}
              success={typeof this.state.validPassword !== 'undefined' ? this.state.validPassword : undefined}
              error={typeof this.state.validPassword !== 'undefined' ? !(this.state.validPassword) : undefined}>
              <Icon name='ios-lock' />
              <Input placeholder='Password'
                secureTextEntry
                accessibilityLabel='signup-password'
                testID={'signup-password'}
                onChangeText={(password) => this.checkInputPassword(password)} />
            </Item>
            {typeof this.state.validPassword !== 'undefined' && !this.state.validPassword && <Text style={styles.errorInputMessage}>{'La password deve essere almeno di 8 caratteri'}</Text> }
            <Item rounded style={[styles.width_items, styles.input_pwd]}
              success={typeof this.state.validRePassword !== 'undefined' ? this.state.validRePassword : undefined}
              error={typeof this.state.validRePassword !== 'undefined' ? !(this.state.validRePassword) : undefined}>
              <Icon name='ios-lock' />
              <Input placeholder='Conferma Password'
                secureTextEntry
                accessibilityLabel='signup-confirmbutton'
                testID={'signup-confirmbutton'}
                onChangeText={(rePassword) => this.checkInputRePassword(rePassword)} />
            </Item>
            {typeof this.state.validRePassword !== 'undefined' && !this.state.validRePassword && <Text style={styles.errorInputMessage}>{'Le password non coincidono'}</Text> }
            <Button rounded style={styles.button_sign_in}
              accessibilityLabel='signup-button'
              testID={'signup-button'}
              onPress={() => this.submit()}>
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
    justifyContent: 'center',
    backgroundColor: Colors.accent
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
  },
  errorInputMessage: {
    color: 'red',
    fontSize: 12
  }
})
