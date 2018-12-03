import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
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
      <TouchableOpacity onPress={() => { this.props.onPress(this.props.marker) }} style={styles.container}>
        <Text style={styles.title}>{this.props.marker.title}</Text>
        <Text style={styles.descr}>{description}</Text>
        <Text style={styles.timestamp}>{this.date + ' alle ' + this.time}</Text>
        <Image style={styles.image} source={this.imgUri} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    ...Fonts.style.h2
  },
  descr: {
    ...Fonts.style.description
  },
  timestamp: {
  },
  container: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    paddingBottom: 5
  },
  image: {
    width: 100,
    height: 100
  }
})
