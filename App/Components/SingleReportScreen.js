import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import api from '../Services/ApiService'
import DateParser from '../Utils/DateParser'
import Images from '../Themes/Images'
import Fonts from '../Themes/Fonts'
import Metrics from '../Themes/Metrics'

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
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'dodgerblue'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }

  componentWillMount () {
    return api.getAddressFromCoords({ lat: this.state.marker.latitude, lng: this.state.marker.longitude }, (res) => {
      if (typeof res === 'string') {
        this.setState({ address: res })
      }
    })
  }

  componentWillUnmount () {
  }

  render () {
    const { marker } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{marker.title}</Text>
          <Text style={styles.address}>{marker.address == null ? 'Indirizzo sconosciuto' : this.props.marker.address}, {this.date + ' alle ' + this.time}</Text>
        </View>
        <ScrollView style={styles.scrollable}>
          <Image style={styles.image} source={this.imgUri} />
          <View style={styles.innerContainer}>
            <Text style={styles.description}>{marker.description}</Text>
            <View style={styles.footer} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FEFEFE'
  },
  header: {
    padding: 5,
  },
  scrollable: {
    flexDirection: 'column'
  },
  innerContainer: {
    padding: 15
  },
  footer: {
    flex: 0.1
  },
  image: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth
  },
  title: {
    ...Fonts.style.h3,
    borderBottomColor: '#EAEAEA',
    textAlign: 'center',
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 1
  },
  address: {
    fontSize: Fonts.size.small,
    textAlign: 'center',
    padding: 5
  },
  row: {
    flexDirection: 'row'
  }
})
