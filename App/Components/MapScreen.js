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
    this.region = geolocationService.getCurrentRegion() // region in the object holds the region we're currently viewing
    this.balance = ''
    this.state = {
      region: this.region, // region in the state holds the last "searched" region
      inserting: false,
      fetching: false,
      markers: [],
      geolocating: false,
      geolocation: null,
      refreshShowing: false,
      zoomShowing: false
    }
    this.logged = api.isLoggedIn()
    this.props.navigation.addListener('didFocus', this.refreshOnFocus)
    this.props.navigation.addListener('willBlur', () => { this.setState({ refreshShowing: false }) })
    this.markersRefs = {}
  }

  static navigationOptions = {
    tabBarLabel: 'Mappa'
  }

  onRegionChanged = (region) => {
    // prompt the user to refresh the markers only when moving or zooming out
    // -- however, if the zoom is TOO MUCH out, don't
    if (region.longitudeDelta > 0.11) {
      this.setState({ refreshShowing: false, zoomShowing: true })
    } else {
      let newState = { zoomShowing: false, moving: false }
      if ((region.latitude - this.state.region.latitude) ** 2 > 0.001 || (region.longitude - this.state.region.longitude) ** 2 > 0.001 ||
        region.longitudeDelta - this.state.region.longitudeDelta > 0.01) {
        newState.refreshShowing = true
      }
      this.setState(newState)
    }
    if (this.state.inserting) {
      this.insertingMarker.animateMarkerToCoordinate(region)
    }
    this.region = region
    geolocationService.setCurrentRegion(region)
  }

  centerOn (region) {
    this.map.animateToRegion(region)
  }

  markerRegionUpdate = () => {
    let latDelta
    let lngDelta
    if (this.region.longitudeDelta > 0.11) {
      latDelta = (this.region.latitudeDelta * 0.11) / this.region.longitudeDelta
      lngDelta = 0.11
    } else {
      latDelta = this.region.latitudeDelta
      lngDelta = this.region.longitudeDelta
    }
    const neLat = this.region.latitude + latDelta / 2
    const swLat = this.region.latitude - latDelta / 2
    const swLng = this.region.longitude - lngDelta / 2
    const neLng = this.region.longitude + lngDelta / 2
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

  navigateToAddReport = () => {
    return this.props.navigation.navigate('AddReport', {
      lat: this.region.latitude,
      lng: this.region.longitude
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
      this.setState({ inserting: true, region: this.region })
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
    return this.props.navigation.navigate('SingleReport', { marker })
  }

  cancelMarkerPlacement = () => {
    this.setState({ inserting: false })
  }

  renderMarkers = () => {
    if (!this.state.inserting) {
      this.markersRefs = {}
      return this.state.markers.map(this.renderMarker)
    }
  }

  renderMarker = (marker, key) => {
    const { date, time } = DateParser.timestampToItalianDate(marker.timestamp)
    const description = marker.description.length > 80 ? marker.description.substring(0, 80) + '...' : marker.description
    return (
      <Marker
        key={key}
        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
        ref={(ref) => { this.markersRefs[marker._id] = ref }}
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

  zoomIn = () => {
    this.map.animateToRegion({
      latitude: this.region.latitude,
      longitude: this.region.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    })
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
  refreshOnFocus = (payload) => {
    this.markerRegionUpdate().then(() => {
      if (payload.state.params.markerId != null) {
        const setParamsAction = NavigationActions.setParams({
          params: { marker: null },
          key: 'Map'
        })
        this.props.navigation.dispatch(setParamsAction)
        this.highlightMarker(payload.state.params.markerId)
      }
    })
  }

  highlightMarker = (id) => {
    const marker = this.markersRefs[id]
    if (marker != null) {
      setTimeout(() => { marker.showCallout() }, 0)
    }
  }

  render () {
    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          showsMyLocationButton={false}
          loadingEnabled
          pitchEnabled={false}
          toolbarEnabled={false}
          onRegionChangeComplete={this.onRegionChanged}
          ref={(map) => { this.map = map }}
        >
          {this.state.geolocating &&
            <View>
              <Marker anchor={{ x: 0.5, y: 0.5 }} image={Images.locationDot} coordinate={{ latitude: this.state.geolocation.latitude, longitude: this.state.geolocation.longitude }} />
              <Circle strokeColor='lightblue' fillColor='lightblue' center={{ latitude: this.state.geolocation.latitude, longitude: this.state.geolocation.longitude }} radius={this.state.geolocation.radius} />
            </View>
          }
          {this.renderMarkers()}
          {this.state.inserting &&
          <Marker
            ref={ref => { this.insertingMarker = ref }}
            coordinate={this.state.region}
          />
          }
        </MapView>
        <GooglePlacesAutocomplete
          placeholder='Cerca su Google Maps'
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
              latitudeDelta: 0.001,
              longitudeDelta: 0.001
            }
            this.centerOn(region)
          }}
          getDefaultValue={() => ''}
          query={{
            key: Secrets.GOOGLE_MAPS_API_KEY,
            language: 'it'
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
        { !this.state.inserting && this.state.refreshShowing &&
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
        { !this.state.inserting && this.state.zoomShowing &&
        <Button
          accessibilityLabel='zoom-button'
          testID={'zoom-button'}
          style={styles.button_update_markers}
          onPress={this.zoomIn}
          iconLeft>
          <View style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }}>
            <Icon name='search-plus' style={{ fontSize: 20, flex: 0.2 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 12, flex: 0.8 }}>Ingrandisci per cercare</Text>
          </View>
        </Button>}
        <ActionButton
          fixNativeFeedbackRadius
          accessibilityLabel='geolocate-button'
          testID={'geolocate-button'}
          buttonColor='#FAFAFA'
          offsetY={50}
          offsetX={-25}
          position='left/center'
          onPress={this.geolocateMe}
          renderIcon={() => (<Icon name='crosshairs' style={{ fontSize: 20, color: this.state.geolocating ? Colors.accent : Colors.inactiveIcon }} />)}
        />
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
    backgroundColor: Colors.materialGray,
    color: Colors.defaultText
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
  floatingMarker: {
    position: 'absolute',
    zIndex: 10,
    left: Metrics.width / 2,
    top: Metrics.height / 2,
    fontSize: 50
  }
})
