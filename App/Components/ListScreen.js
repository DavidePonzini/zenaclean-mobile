import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SafeAreaView } from 'react-navigation'
import ReportListItem from './ReportListItem'
import api from '../Services/ApiService'
import geolocationService from '../Services/GeolocationService'
import Fonts from '../Themes/Fonts'
import Colors from '../Themes/Colors'
import Metrics from '../Themes/Metrics'

export class NoReportsLeftComponent extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Buone notizie!</Text>
          <Icon style={styles.splashIcon} name='trophy' />
          <Text style={styles.descr}>Non ci sono segnalazioni nei dintorni!</Text>
          <Text style={styles.descr}>Prenditi un attimo per assaporare il momento</Text>
          <Text style={styles.descr}> oppure</Text>
          <Button onPress={this.props.onPress} style={styles.goBackButton} full iconLeft>
            <Icon style={styles.buttonContent} name='arrow-left' />
            <Text style={styles.buttonContent}>Cerca in un'altra zona</Text>
          </Button>
        </View>
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    height: Metrics.height
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: Fonts.size.h1,
    color: Colors.defaultText,
    textAlign: 'center'
  },
  descr: {
    fontSize: Fonts.size.h6,
    textAlign: 'center',
    margin: 10,
    color: Colors.defaultText
  },
  splashIcon: {
    color: Colors.accent,
    fontSize: 200
  },
  goBackButton: {
    backgroundColor: Colors.accent
  },
  buttonContent: {
    color: 'white',
    padding: 10,
    fontSize: Fonts.size.h5
  }
})

export default class ListScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      markers: [],
      fetching: true
    }
    this.props.navigation.addListener('didFocus', this.markerRegionUpdate)
  }
  // this is used by the navigator to set the title in the header
  static navigationOptions = {
    tabBarLabel: 'Lista'
  }

  markerRegionUpdate = () => {
    let region = geolocationService.getCurrentRegion()
    this.region = region
    const neLat = region.latitude + region.latitudeDelta / 2
    const swLat = region.latitude - region.latitudeDelta / 2
    const swLng = region.longitude - region.longitudeDelta / 2
    const neLng = region.longitude + region.longitudeDelta / 2
    this.setState({ fetching: true })
    const that = this
    return api.getMarkers(neLat, swLat, swLng, neLng, (res) => { that.setState({ fetching: false, markers: res }) })
  }

  navigateBackToMap = () => {
    return this.props.navigation.navigate('Map')
  }
  componentWillMount () {
    return this.markerRegionUpdate()
  }

  renderItem = ({ item }) => (
    <ReportListItem
      onPress={(marker) => this.props.navigation.navigate('SingleReport', { marker })}
      marker={item} />)

  render () {
    return (
      <SafeAreaView>
        <FlatList
          accessibilityLabel='list-report'
          testID={'list-report'}
          data={this.state.markers}
          onRefresh={this.markerRegionUpdate}
          refreshing={this.state.fetching}
          renderItem={this.renderItem}
          keyExtractor={(_, index) => ('' + index)}
          ListEmptyComponent={!this.state.fetching && <NoReportsLeftComponent onPress={this.navigateBackToMap} />}
        />
      </SafeAreaView>
    )
  }
}
