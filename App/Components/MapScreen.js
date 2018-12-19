import React from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import ActionButton from 'react-native-action-button'
import api from '../Services/ApiService'
import Fonts from '../Themes/Fonts'
import DateParser from '../Utils/DateParser'
import Icon from 'react-native-vector-icons/FontAwesome'

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
      markers: []
    }

    this.logged = this.props.navigation.state.params.logged
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

  navigateToAddReport = () => this.props.navigation.navigate('AddReport', {
    lat: this.region.latitude,
    lng: this.region.longitude
  })

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
