import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import DateParser from '../Utils/DateParser'
import Images from '../Themes/Images'
import Fonts from '../Themes/Fonts'
import Metrics from '../Themes/Metrics'

export default class SingleReportScreen extends Component {
  constructor (props) {
    super(props)
    this.marker = props.navigation.state.params.marker
    this.imgUri = (this.marker.url == null) ? Images.defaultReportPicture : { uri: this.marker.url }
    const { date, time } = DateParser.timestampToItalianDate(this.marker.timestamp)
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

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{this.marker.title}</Text>
          <Text style={styles.address}>{this.marker.address == null ? 'Indirizzo sconosciuto' : this.marker.address}, {this.date + ' alle ' + this.time}</Text>
        </View>
        <ScrollView style={styles.scrollable}>
          <Image style={styles.image} source={this.imgUri} />
          <View style={styles.innerContainer}>
            <Text style={styles.description}>{this.marker.description}</Text>
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
    padding: 5
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
