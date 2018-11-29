import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Images } from '../Themes/Images'
export default class ReportListItem extends React.Component {
  constructor (props) {
    super(props)
    this.imgUri = (this.props.item.url == null) ? Images.defaultReportPicture : { uri: this.props.item.url }
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.item.title}</Text>
        <Text style={styles.descr}>{this.props.item.descr}</Text>
        <Image style={styles.image} source={this.imgUri} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  descr: {

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
