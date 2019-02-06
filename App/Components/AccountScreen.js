import React, { Component } from 'react'
import { StyleSheet, View, Image, Alert, Linking } from 'react-native'
import { Button, Text, Container, Content, Input, Item, Icon } from 'native-base'
import Colors from '../Themes/Colors'
import { NavigationActions, StackActions } from 'react-navigation'
import api from '../Services/ApiService'

export default class AccountScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      balance: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      validOldPassword: undefined,
      validNewPassword: undefined,
      validConfirmPassword: undefined,
      resetChecked: '',
      fetching: false
    }
  }

  navigateBack = () => {
    this.props.navigation.dispatch(StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Main' }),
        NavigationActions.navigate({ routeName: 'TabNavigator', params: { logged: false } })
      ]
    }))
  }

  getBalance =() => {
    api.getBalance(this.props.navigation.state.params.eth_address, amount => {
      this.setState({ balance: amount, fetching: true })
    })
  }
  componentWillMount = () => {
    if (!this.props.navigation.state.params.logged) {
      const that = this
      Alert.alert('Attenzione!', 'Per accedere a questa pagina devi registrarti.', [
        {
          text: 'OK',
          onPress: that.navigateToSignUp
        },
        { text: 'Più tardi',
          onPress: that.navigateBack
        }
      ], { onDismiss: that.navigateBack }
      )
    }

    this.getBalance()
    console.log(this.balance)
  }

  navigateToSignIn = () => {
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main' })
      ]
    }))
  }

  navigateToSignUp = () => {
    this.props.navigation.dispatch(StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Main' }),
        NavigationActions.navigate({ routeName: 'SignUp' })
      ]
    }))
  }

  checkOldPassword = (password) => {
    this.setState({ oldPassword: password })
    password.length >= 8 ? this.setState({ validOldPassword: true }) : this.setState({ validOldPassword: false })
  }

  checkNewPassword = (password) => {
    this.setState({ newPassword: password })
    password.length >= 8 ? this.setState({ validNewPassword: true }) : this.setState({ validNewPassword: false })
  }

  checkConfirmPassword = (password) => {
    this.setState({ confirmPassword: password })
    password.length >= 8 ? this.setState({ validConfirmPassword: true }) : this.setState({ validConfirmPassword: false })
  }

  reset = () => {
    Alert.alert('Non ancora implementata!')
    // non cancellare il corpo della funzione commentato
    // funzione che modifica password utente

    /* let that = this
    if (this.state.validOldPassword && this.state.validNewPassword && this.state.validConfirmPassword && (this.state.newPassword === this.state.confirmPassword)) {
      api.changePassword(this.props.navigation.state.params.inputEmail, this.state.oldPassword, this.state.newPassword, this.state.confirmPassword, (err, res) => {
        if (err == null) {
          Alert.alert('Password cambiata con successo!', '', [
            { text: 'OK', onPress: () => { that.props.navigation.goBack() } }
          ])
        } else {
          Alert.alert(res.error)
        }
      })
    } else {
      Alert.alert('Campi inseriti non validi o mancanti')
    } */
  }

  logout = () => {
    const that = this
    Alert.alert('Attenzione!', 'Sei sicuro di voler effettuare il logout?', [
      {
        text: 'OK',
        onPress: () => { api.logoutUser(that.navigateToSignIn) }
      },
      { text: 'Annulla', style: 'cancel' }
    ])
  }

  showAddress = () => {
    Alert.alert('Non ancora implementata!')
  }

  _goToURL = () => {
    Linking.openURL('https://ropsten.etherscan.io/address/' + this.props.navigation.state.params.eth_address)
  }

  render () {
    return (
      <Container>
        <Content>
          <Image style={styles.avatar}
            source={require('../Assets/Images/user_avatar.png')}
          />

          {this.props.navigation.state.params.logged === true && <View>
            <Text
              accessibilityLabel='account-email'
              testID={'account-email'}
              style={styles.textAccount}>
              {this.props.navigation.state.params.inputEmail}
            </Text>
            <Text style={styles.textResetPassword}>Compila i campi per reimpostare la password:</Text>
          </View>}

          {(this.props.navigation.state.params.logged === true && this.state.fetching) && <View>
            <Text
              accessibilityLabel='account-balance'
              testID={'account-balance'}
              style={styles.textAccount}>
              {'Saldo: ' + this.state.balance + ' token'}
            </Text>

            <Button rounded style={styles.walletButton}
              accessibilityLabel='wallet-button'
              testID={'wallet-button'}
              onPress={this._goToURL}>
              <Text>Vai al Wallet</Text>
            </Button>
          </View>}

          { this.props.navigation.state.params.logged === true && <View style={styles.resetPasswordView}>
            <Item rounded style={styles.resetPasswordItem}>
              <Icon name='ios-lock' />
              <Input
                accessibilityLabel='account-password'
                testID={'account-password'}
                placeholder='Password'
                secureTextEntry
                onChangeText={(password) => this.checkOldPassword(password)}
              />
            </Item>
            {typeof this.state.validOldPassword !== 'undefined' && !this.state.validOldPassword && <Text style={styles.errorInputMessage}>{'La password deve essere almeno di 8 caratteri'}</Text> }
            <Item rounded style={styles.resetPasswordItem}>
              <Icon name='ios-lock' />
              <Input
                accessibilityLabel='account-new-password'
                testID={'account-new-password'}
                placeholder='New Password'
                secureTextEntry
                onChangeText={(password) => this.checkNewPassword(password)}
              />
            </Item>
            {typeof this.state.validNewPassword !== 'undefined' && !this.state.validNewPassword && <Text style={styles.errorInputMessage}>{'La password deve essere almeno di 8 caratteri'}</Text> }
            <Item rounded style={styles.resetPasswordItem}>
              <Icon name='ios-lock' />
              <Input
                accessibilityLabel='account-confirm-password'
                testID={'account-confirm-password'}
                placeholder='Repeat New Password'
                secureTextEntry
                onChangeText={(password) => this.checkConfirmPassword(password)}
              />
            </Item>
            {typeof this.state.validConfirmPassword !== 'undefined' && !this.state.validConfirmPassword && <Text style={styles.errorInputMessage}>{'La password deve essere almeno di 8 caratteri'}</Text> }
            <Button rounded style={styles.resetButton}
              accessibilityLabel='reset-button'
              testID={'reset-button'}
              onPress={this.reset}>
              <Text>Reset</Text>
            </Button>
          </View>
          }

          <View style={styles.container}>
            <Button rounded style={styles.logoutButton}
              accessibilityLabel='logout-button'
              testID={'logout-button'}
              onPress={this.logout}>
              <Text>Logout</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorInputMessage: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'center'
  },
  textAccount: {
    paddingTop: 30,
    alignSelf: 'center',
    fontSize: 25,
    color: Colors.accent
  },
  textResetPassword: {
    alignSelf: 'center',
    fontSize: 15
  },
  resetPasswordView: {
    padding: 10
  },
  resetPasswordItem: {
    marginTop: 10
  },
  avatar: {
    marginTop: 20,
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 63
  },
  logoutButton: {
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent
  },
  resetButton: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent
  },
  walletButton: {
    marginTop: 20,
    width: '40%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent
  }
})
