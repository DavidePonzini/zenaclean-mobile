import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default class ReportListItem extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.item.title}</Text>
        <Text style={styles.descr}>{this.props.item.descr}</Text>
        <Image style={styles.image} source={{ uri: this.props.item.url }} />
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
