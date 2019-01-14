import React, { Component } from 'react'
import { Text } from 'native-base'
import { View, StyleSheet, ScrollView } from 'react-native'
import Colors from '../Themes/Colors'
import Metrics from '../Themes/Metrics'

export default class GdprScreen extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <ScrollView>
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
        </ScrollView>
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
  text: {
    fontSize: 20
  }
})
