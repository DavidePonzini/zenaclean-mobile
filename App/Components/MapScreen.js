import React from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'
import { StyleSheet, Text, View } from 'react-native'
import ActionButton from 'react-native-action-button'
import api from '../Services/ApiService'
import Fonts from '../Themes/Fonts'
import DateParser from '../Utils/DateParser'

export default class MapScreen extends React.Component {
  constructor (props) {
    super(props)
    // initial Rrgion
    this.region = {
      latitude: 44.4056,
      longitude: 8.9463,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    }
    this.state = {
      region: this.region,
      markers: []
    }
  }
    static navigationOptions = {
      tabBarLabel: 'Mappa'
    }

    onRegionChange = (region) => {
      this.region = region
    }

    componentWillMount () {
      return api.getMarkers((res) => { this.setState({ markers: res }) })
    }

    renderMarker = (marker, key) => {
      const { date, time } = DateParser.timestampToItalianDate(marker.timestamp)
      const description = marker.description.length > 80 ? marker.description.substring(0, 80) + '...' : marker.description
      return (
        <Marker
          key={key}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
        >
          <Callout style={styles.callout} onPress={() => this.props.navigation.navigate('SingleReport', { marker })}>
            <Text style={styles.calloutTitle}>{marker.title}</Text>
            <View style={styles.row}>
              <View style={styles.innerContainer}>
                <Text style={styles.address}>{marker.address == null ? 'Indirizzo sconosciuto' : marker.address}</Text>
                <Text style={styles.calloutDescr}>{description}</Text>
                <Text style={styles.timestamp}>{date + ' alle ' + time}</Text>
              </View>
            </View>
          </Callout>
        </Marker>)
    }

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
          <ActionButton buttonColor='dodgerblue' offsetY={50} onPress={() => navigate('AddReport', { lat: this.region.latitude, lng: this.region.longitude })} />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  calloutTitle: {
    ...Fonts.style.h6,
    borderBottomColor: '#EAEAEA',
    textAlign: 'center',
    paddingBottom: 2.5,
    marginBottom: 5,
    borderBottomWidth: 1
  },
  calloutDescr: {
    ...Fonts.style.description,
    flex: 0.8
  },
  timestamp: {
    ...Fonts.style.footer,
    flex: 0.2
  },
  address: {
    fontSize: Fonts.size.small,
    flex: 0.2
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    padding: 2.5
  },
  innerContainer: {
    flexDirection: 'column',
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  callout: {
    width: 250,
    height: 150
  }
})
