import React, { Component } from 'react'
import { Button, Footer, FooterTab, Icon, Text } from 'native-base'
import LoginComponent from './LoginComponent'
import { View, StyleSheet, ScrollView } from 'react-native'
import Colors from '../Themes/Colors'
import Metrics from '../Themes/Metrics'

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      y: 0
    }
  }
  scrollToIntro = () => {
    this.scroll.scrollTo({ y: Metrics.height, animated: true })
  }

  handleScroll = (event) => {
    this.setState({ y: event.nativeEvent.contentOffset.y })
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={{ flex: 1 }}>
        <ScrollView onScroll={this.handleScroll} ref={node => { this.scroll = node }}>
          <View style={styles.content}>
            <LoginComponent style={styles.login} navigation={this.props.navigation} />
            <View style={styles.scrollButtonContainer}>
              <Button style={styles.scroll_down} transparent onPress={this.scrollToIntro}>
                <Text accessibilityLabel='text-below'
                  testID={'text-below'}
                  style={styles.color}>Scorri per più informazioni </Text>
                <Icon style={[styles.color, styles.icon]} name='ios-arrow-down' />
              </Button>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>
              Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa.
              Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando
              un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo
              campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla
              videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60,
              con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi
              del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che
              includeva versioni del Lorem Ipsum.
              Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa.
              Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando
              un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo
              campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla
              videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60,
              con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi
              del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che
              includeva versioni del Lorem Ipsum.
              Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa.
              Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando
              un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo
              campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla
              videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60,
              con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi
              del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che
              includeva versioni del Lorem Ipsum.
            </Text>
          </View>

        </ScrollView>
        { this.state.y > Metrics.height - 10 && <Footer>
          <FooterTab style={styles.colorFooter}>
            <Button accessibilityLabel='demo-button'
              testID={'demo-button'}
              full onPress={() => { navigate('TabNavigator') }}>
              <Text style={styles.text_footer}>Prova Demo</Text>
            </Button>
          </FooterTab>
        </Footer> }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text_footer: {
    fontSize: 15,
    color: 'white'
  },
  text: {
    fontSize: 20
  },
  content: {
    flex: 1,
    minHeight: Metrics.height
  },
  login: {
    flex: 0.8
  },
  scrollButtonContainer: {
    flex: 0.2
  },
  scroll_down: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 47,
    height: 70
  },
  color: {
    color: 'black'
  },
  icon: {
    fontSize: 40
  },
  colorFooter: {
    backgroundColor: Colors.accent
  }
})
