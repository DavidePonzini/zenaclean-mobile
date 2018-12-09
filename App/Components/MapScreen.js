import React from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'
import { StyleSheet, View } from 'react-native'
import ActionButton from 'react-native-action-button'
import api from '../Services/ApiService'

export default class MapScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      region: {
        latitude: 44.4056,
        longitude: 8.9463,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      },
      markers: []
    }
  }
    static navigationOptions = {
      tabBarLabel: 'Mappa'
    }

    onRegionChange = (region) => {
      this.setState({ region })
    }

    componentWillMount () {
      return api.getMarkers((res) => { this.setState({ markers: res }) })
    }

    renderMarker = (marker, key) => (
      <Marker
        key={key}
        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
        title={marker.title}
        description={marker.description}
      >
        <Callout onPress={() => this.props.navigation.navigate('SingleReport', { marker })} />
      </Marker>)

    render () {
      const { navigate } = this.props.navigation
      return (
        <View style={styles.map}>
          <MapView
            style={styles.map}
            initialRegion={this.state.region}
            onRegionChange={this.onRegionChange}
          >
            {this.state.markers.map(this.renderMarker)}
          </MapView>
          <ActionButton buttonColor='dodgerblue' onPress={() => navigate('AddReport', { lat: this.state.region.latitude, lng: this.state.region.latitude })} />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
