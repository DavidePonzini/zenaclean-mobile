import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SafeAreaView, NavigationEvents } from 'react-navigation'
import ReportListItem from './ReportListItem'
import api from '../Services/ApiService'
import geolocationService from '../Services/GeolocationService'

export class NoReportsLeftComponent extends React.Component {
  render () {
    return (
      <View>
        <Text>Buone Notizie!</Text>
        <Icon name='street-view' />
        <Text>Non ci sono segnalazioni nella tua zona!</Text>
        <Text>Prenditi un attimo per assaporare il momento oppure </Text>
        <Button><Text>Cerca in un'altra zona</Text></Button>
      </View>)
  }
}

export default class ListScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      markers: [],
      fetching: true
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
    this.setState({ fetching: true })
    const that = this
    return api.getMarkers(neLat, swLat, swLng, neLng, (res) => { that.setState({ fetching: false, markers: res }) })
  }
  componentWillUpdate = () => {
    console.log(this.region)
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
        <NavigationEvents
          onWillFocus={this.markerRegionUpdate} />
        <FlatList
          accessibilityLabel='list-report'
          testID={'list-report'}
          data={this.state.markers}
          onRefresh={this.markerRegionUpdate}
          refreshing={this.state.fetching}
          renderItem={this.renderItem}
          keyExtractor={(_, index) => ('' + index)}
          ListEmptyComponent={!this.state.fetching && <NoReportsLeftComponent />}
        />
      </SafeAreaView>
    )
  }
}
