import React, { Component } from 'react'
import { StyleSheet, View, Image, Alert } from 'react-native'
import { Button, Text, Container, Content } from 'native-base'
import Colors from '../Themes/Colors'
import { NavigationActions, StackActions } from 'react-navigation'

export default class AccountScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
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

  logout = () => {
    const that = this
    Alert.alert('Attenzione!', 'Sei sicuro di voler effettuare il logout?', [
      {
        text: 'OK',
        onPress: that.navigateToSignIn
      },
      { text: 'Annulla', style: 'cancel' }
    ])
  }
  render () {
    return (
      <Container>
        <Content>
          <Image style={styles.logo}
            source={require('../Assets/Images/logo.png')}
          />
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
  logoutButton: {
    marginTop: 40,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent
  }
})
