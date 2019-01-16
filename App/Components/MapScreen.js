import React from 'react'
import MapView, { Marker, Callout, Circle } from 'react-native-maps'
import { Button } from 'native-base'
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import ActionButton from 'react-native-action-button'
import api from '../Services/ApiService'
import geolocationService from '../Services/GeolocationService'
import Fonts from '../Themes/Fonts'
import DateParser from '../Utils/DateParser'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../Themes/Colors'
import Images from '../Themes/Images'
import Metrics from '../Themes/Metrics'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Secrets from 'react-native-config'

export default class MapScreen extends React.Component {
  constructor (props) {
    super(props)
    // initial Region
    this.region = {
      latitude: 44.4056,
      longitude: 8.9463,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    }

    this.state = {
      region: this.region,
      inserting: false,
      fetching: true,
      markers: [],
      updateMaps: false,
      geolocating: false,
      geolocation: null,
      refreshShowing: false
    }
    this.logged = api.isLoggedIn()
  }

  static navigationOptions = {
    tabBarLabel: 'Mappa'
  }

  onRegionChange = (region) => {
    // prompt the user to refresh the markers only when moving or zooming out
    if ((region.latitude - this.state.region.latitude) ** 2 > 0.001 || (region.longitude - this.state.region.longitude) ** 2 > 0.001 ||
        region.longitudeDelta - this.state.region.longitudeDelta > 0.01) {
      this.setState({ refreshShowing: true })
    }
    this.region = region
    geolocationService.setCurrentRegion(region)
  }

  centerOn (region) {
    this.setState({ region: region })
    this.onRegionChange(region)
  }

  markerRegionUpdate = () => {
    const neLat = this.region.latitude + this.region.latitudeDelta / 2
    const swLat = this.region.latitude - this.region.latitudeDelta / 2
    const swLng = this.region.longitude - this.region.longitudeDelta / 2
    const neLng = this.region.longitude + this.region.longitudeDelta / 2
    const that = this

    return new Promise(resolve => {
      that.setState({ fetching: true, region: that.region }, () => {
        api.getMarkers(neLat, swLat, swLng, neLng, (res) => { that.setState({ markers: res, refreshShowing: false, fetching: false }, () => resolve()) })
      })
    })
  }

  componentWillMount () {
    return this.markerRegionUpdate()
  }

  componentDidUpdate () {
    if (this.state.updateMaps) {
      const tmp = api.getMarkers((res) => { this.setState({ markers: res }) })
      this.setState({ updateMaps: false, updatePosition: false })
      return tmp
    }
  }

  onUpdateMaps = data => {
    this.setState({ updateMaps: data })
  }

  navigateToAddReport = () => {
    this.updateMaps = true
    this.props.navigation.navigate('AddReport', {
      lat: this.region.latitude,
      lng: this.region.longitude,
      onUpdateMaps: this.onUpdateMaps
    })
  }

  navigateToSignUp = () => {
    this.props.navigation.dispatch(StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Main' }),
        NavigationActions.navigate({ routeName: 'SignUp' })
      ]
    }))
  }

  beginMarkerPlacement = () => {
    if (this.logged) {
      this.setState({ inserting: true })
    } else {
      const that = this
      Alert.alert('Attenzione!', 'Registrati per effettuare una segnalazione', [
        {
          text: 'OK',
          onPress: that.navigateToSignUp
        },
        { text: 'Più tardi', style: 'cancel' }
      ])
    }
  }

  navigateToSingleReport = (marker) => {
    this.props.navigation.navigate('SingleReport', { marker })
  }

  cancelMarkerPlacement = () => {
    this.setState({ inserting: false })
  }

  renderMarker = (marker, key) => {
    const { date, time } = DateParser.timestampToItalianDate(marker.timestamp)
    const description = marker.description.length > 80 ? marker.description.substring(0, 80) + '...' : marker.description
    return (
      <Marker
        key={key}
        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
      >
        <Callout style={styles.callout} onPress={() => { this.navigateToSingleReport(marker) }}>
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

  geolocateMe = () => {
    const that = this
    geolocationService.geolocateOnce().then(pos => {
      that.setState({ geolocating: true, geolocation: { latitude: pos.coords.latitude, longitude: pos.coords.longitude, radius: pos.coords.accuracy } })
      const newRegion = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01
      }
      that.region = newRegion
      that.map.animateToRegion(newRegion, 200)
      setTimeout(that.markerRegionUpdate, 200)
    })
  }

  render () {
    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          ref={(map) => { this.map = map }}
        >
          {this.state.geolocating &&
            <View>
              <Marker anchor={{ x: 0.5, y: 0.5 }} image={Images.locationDot} coordinate={{ latitude: this.state.geolocation.latitude, longitude: this.state.geolocation.longitude }} />
              <Circle strokeColor='lightblue' fillColor='lightblue' center={{ latitude: this.state.geolocation.latitude, longitude: this.state.geolocation.longitude }} radius={this.state.geolocation.radius} />
            </View>
          }
          {!this.state.inserting && this.state.markers.map(this.renderMarker)}
        </MapView>

        {this.state.inserting &&
        <View pointerEvents='none' style={styles.floatingMarkerContainer}>
          <Icon name='map-marker' style={styles.floatingMarker} />
        </View>
        }
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2}
          autoFocus={false}
          returnKeyType='search'
          listViewDisplayed='false'
          fetchDetails
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            const region = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }
            this.centerOn(region)
          }}
          getDefaultValue={() => ''}
          query={{
            key: Secrets.GOOGLE_MAPS_API_KEY,
            language: 'en',
            types: '(cities)'
          }}
          styles={{
            textInputContainer: {
              width: '100%'
            },
            description: {
              fontWeight: 'bold',
              color: 'black'
            },
            listView: {
              backgroundColor: '#ffffff'
            }
          }}
          debounce={200}
        />
        { this.state.refreshShowing &&
        <Button
          accessibilityLabel='update-markers-button'
          testID={'update-markers-button'}

          style={styles.button_update_markers}
          onPress={this.markerRegionUpdate}
          iconLeft>
          <View style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }}>
            { (this.state.fetching && <ActivityIndicator style={{ flex: 0.2 }} />) ||
            <Icon name='search' style={{ fontSize: 20, flex: 0.2 }} /> }
            <Text style={{ fontWeight: 'bold', flex: 0.8 }}>Cerca in quest'area</Text>
          </View>
        </Button>}
        <Button
          accessibilityLabel='geolocate-button'
          testID={'geolocate-button'}
          rounded
          style={styles.geoBtn}
          onPress={this.geolocateMe}
          iconLeft>
          <Icon name='crosshairs' style={{ fontSize: 25, color: Colors.accent }} />
        </Button>
        <ActionButton fixNativeFeedbackRadius backgroundTappable
          accessibilityLabel='button-add'
          testID={'button-add'}
          buttonColor={Colors.accent}
          offsetY={50}
          onPress={this.beginMarkerPlacement}
          onReset={this.cancelMarkerPlacement}
        >
          {this.logged &&
          <ActionButton.Item accessibilityLabel='button-confirm' testID={'button-confirm'}
            buttonColor={Colors.accent} title='Scegli questa posizione'
            onPress={this.navigateToAddReport}>
            <Icon name='check' style={{ color: 'white' }} />
          </ActionButton.Item>
          }
        </ActionButton>
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
  searchBarStyle: {
    backgroundColor: 'white',
    opacity: 0.8,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  textSearchBar: {
    color: '#848484'
  },
  calloutDescr: {
    ...Fonts.style.description,
    flex: 0.8
  },
  timestamp: {
    ...Fonts.style.footer,
    flex: 0.2
  },
  geoBtn: {
    position: 'absolute',
    left: 10,
    bottom: 50,
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    width: 50
  },
  button_update_markers: {
    position: 'absolute',
    top: 100,
    width: 200,
    right: Metrics.width / 2 - 100,
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    color: '#2f2f2f'
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
  },
  floatingMarkerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  floatingMarker: {
    fontSize: 50
  }
})
