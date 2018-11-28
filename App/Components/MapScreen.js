import React from 'react'
import MapView from 'react-native-maps/lib/components/MapView'
import { StyleSheet, View } from 'react-native'
import ActionButton from 'react-native-action-button'

export default class MapScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.getInitialState()
  }

  getInitialState () {
    return {
      region: {
        latitude: 44.4056,
        longitude: 8.9463,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }
    }
  }

    onRegionChange = (region) => {
      this.setState({ region })
    }

    render () {
      return (
        <View style={styles.map}>
          <MapView
            style={styles.map}
            initialRegion={this.state.region}
            onRegionChange={this.onRegionChange}
          />

          <ActionButton buttonColor='#0022EE' onPress={() => {}} />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
