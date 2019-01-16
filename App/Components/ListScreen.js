import React from 'react'
import { FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import ReportListItem from './ReportListItem'
import api from '../Services/ApiService'
import geolocationService from '../Services/GeolocationService'

export class NoReportsLeftComponent extends React.Component {
  render () {
    return (<Text>Congratulazioni! Non ci sono segnalazioni nella zona!</Text>)
  }
}

export default class ListScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      markers: [],
      fetching: false
    }
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
    return api.getMarkers(neLat, swLat, swLng, neLng, (res) => { this.setState({ refreshShowing: false, markers: res }) })
  }
  componentWillUpdate = () => {
    if (geolocationService.getCurrentRegion() !== this.region) {
      return this.markerRegionUpdate()
    }
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
          refreshing={this.state.fetching}
          renderItem={this.renderItem}
          keyExtractor={(_, index) => ('' + index)}
          ListEmptyComponent={!this.state.fetching && <NoReportsLeftComponent />}
        />
      </SafeAreaView>
    )
  }
}
