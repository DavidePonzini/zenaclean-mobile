import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import api from '../Services/ApiService'
import DateParser from '../Utils/DateParser'
import Images from '../Themes/Images'
import Fonts from '../Themes/Fonts'
import Metrics from '../Themes/Metrics'

const labels = {
  title: 'Titolo Segnalazione',
  titleErrorMessage: 'Inserisci un titolo per la segnalazione',
  descrErrorMessage: 'Inserisci una descrizione per la segnalazione',
  address: 'Indirizzo',
  descr: 'Descrizione'
}

export default class SingleReportScreen extends Component {
  constructor (props) {
    super(props)
    const marker = props.navigation.state.params.marker
    this.state = {
      marker,
      address: ''
    }

    this.imgUri = (marker.url == null) ? Images.defaultReportPicture : { uri: marker.url }
    const { date, time } = DateParser.timestampToItalianDate(marker.timestamp)
    this.date = date
    this.time = time
  }

  componentWillMount () {
    api.getAddressFromCoords({ lat: this.state.marker.latitude, lng: this.state.marker.longitude }, (res) => {
      /* this.setState({ address: res }) */
    })
  }

  componentWillUnmount () {
  }

  render () {
    const { marker } = this.state
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{marker.title}</Text>
          <Text style={styles.timestamp}>{this.date + ' alle ' + this.time}</Text>
          <Text style={styles.description}>{marker.description}</Text>
          <Text>{labels.addr}</Text>
          <Text>{this.state.address}</Text>
          <Image style={styles.image} source={this.imgUri} />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: Metrics.baseMargin,
    flex: 1,
    alignItems: 'center'
  },
  title: {
    ...Fonts.style.h3
  },
  description: {
    ...Fonts.style.description
  },
  image: {
    width: 400,
    height: 400
  }
})
