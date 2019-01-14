import React from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'
import { Button } from 'native-base'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import ActionButton from 'react-native-action-button'
import api from '../Services/ApiService'
import Fonts from '../Themes/Fonts'
import DateParser from '../Utils/DateParser'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SearchBar } from 'react-native-elements'
import Colors from '../Themes/Colors'

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
      markers: [],
      updateMaps: false
    }
    this.logged = this.props.navigation.state.params.logged
  }

  static navigationOptions = {
    tabBarLabel: 'Mappa'
  }

  onRegionChange = (region) => {
    // console.log(this.region.latitudeDelta)
    this.region = region
  }

  markerRegionUpdate = () => {
    const ne_lat = this.region.latitude + this.region.latitudeDelta / 2
    const sw_lat = this.region.latitude - this.region.latitudeDelta / 2
    const sw_lng = this.region.longitude - this.region.longitudeDelta / 2
    const ne_lng = this.region.longitude + this.region.longitudeDelta / 2

    return api.getMarkers(ne_lat, sw_lat, sw_lng, ne_lng, (res) => { this.setState({ markers: res }) })
  }

  componentWillMount () {
    const ne_lat = this.region.latitude + this.region.latitudeDelta / 2
    const sw_lat = this.region.latitude - this.region.latitudeDelta / 2
    const sw_lng = this.region.longitude - this.region.longitudeDelta / 2
    const ne_lng = this.region.longitude + this.region.longitudeDelta / 2

    return api.getMarkers(ne_lat, sw_lat, sw_lng, ne_lng, (res) => { this.setState({ markers: res }) })
  }

  componentDidUpdate () {
    if (this.state.updateMaps) {
      const tmp = api.getMarkers((res) => { this.setState({ markers: res }) })
      this.setState({ updateMaps: false })
      return tmp
    }
  }
  onUpdateMaps = data => {
    this.setState({ updateMaps: data })
  };

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
        <Callout style={styles.callout} onPress={() => {this.navigateToSingleReport(marker)}}>
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
    return (
      <View style={styles.map}>

        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          {!this.state.inserting && this.state.markers.map(this.renderMarker)}
        </MapView>
        {this.state.inserting &&
          <View pointerEvents='none' style={styles.floatingMarkerContainer}>
            <Icon name='map-marker' style={styles.floatingMarker} />
          </View>
        }

        <SearchBar accessibilityLabel='searchBar' testID={'searchBar'} containerStyle={styles.searchBarStyle}
          searchIcon={{ size: 30 }}
          clearIcon
          round
          lightTheme
          placeholderTextColor={'#848484'}
          inputStyle={styles.textSearchBar}
          placeholder='Cerca Indirizzo' />

        <Button
          accessibilityLabel='update-markers-button'
          testID={'update-markers-button'}
          rounded
          style={styles.button_update_markers}
          onPress={() => this.markerRegionUpdate()}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Update</Text>
        </Button>

        <ActionButton fixNativeFeedbackRadius backgroundTappable
          accessibilityLabel='button-add'
          testID={'button-add'}
          buttonColor='dodgerblue'
          offsetY={50}
          onPress={this.beginMarkerPlacement}
          onReset={this.cancelMarkerPlacement}
        >
          {this.logged &&
            <ActionButton.Item accessibilityLabel='button-confirm' testID={'button-confirm'}
              buttonColor='dodgerblue' title='Scegli questa posizione'
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
  button_update_markers: {
    marginTop: 20,
    width: '15%',
    // alignSelf: 'center',
    borderRadius: 30,
    marginLeft: 330,
    justifyContent: 'center',
    backgroundColor: '#D55353'
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
