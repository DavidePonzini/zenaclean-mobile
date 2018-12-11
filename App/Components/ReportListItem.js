import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Images from '../Themes/Images'
import Fonts from '../Themes/Fonts'
import DateParser from '../Utils/DateParser'

export default class ReportListItem extends React.Component {
  constructor (props) {
    super(props)
    this.imgUri = (this.props.marker.url == null) ? Images.defaultReportPicture : { uri: this.props.marker.url }
    const { date, time } = DateParser.timestampToItalianDate(this.props.marker.timestamp)
    this.date = date
    this.time = time
  }
  render () {
    const description = this.props.marker.description.length > 80 ? this.props.marker.description.substring(0, 80) + '...' : this.props.marker.description
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { this.props.onPress(this.props.marker) }} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.outerContainer}>
              <Text style={styles.title}>{this.props.marker.title}</Text>
              <View style={styles.row}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={this.imgUri} />
                </View>
                <View style={styles.innerContainer}>
                  <Text style={styles.address}>{this.props.marker.address == null ? 'Indirizzo sconosciuto' : this.props.marker.address}</Text>
                  <Text style={styles.descr}>{description}</Text>
                  <Text style={styles.timestamp}>{this.date + ' alle ' + this.time}</Text>
                </View>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <Icon style={styles.icon} color='gray' name='chevron-right' size={20} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    ...Fonts.style.h4,
    borderBottomColor: '#EAEAEA',
    textAlign: 'center',
    padding: 5,
    margin: 10,
    borderBottomWidth: 1
  },
  descr: {
    ...Fonts.style.description,
    flex: 0.8
  },
  timestamp: {
    ...Fonts.style.footer,
    flex: 0.1
  },
  address: {
    fontSize: Fonts.size.medium,
    flex: 0.1
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FAFAFA',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  container: {
    backgroundColor: '#FEFEFE',
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  outerContainer: {
    flex: 0.9
  },
  innerContainer: {
    flexDirection: 'column',
    flex: 0.75
  },
  imageContainer: {
    padding: 5,
    flex: 0.25
  },
  image: {
    width: 80,
    height: 80
  },
  iconContainer: {
    borderLeftWidth: 1,
    borderLeftColor: '#EAEAEA',
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5
  },
  icon: {
    flex: 1,
    textAlign: 'center'
  }
})
