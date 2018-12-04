import React from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import ReportListItem from './ReportListItem'
import api from '../Services/ApiService'

export default class ListScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      markers: []
    }
  }
  static navigationOptions = {
    tabBarLabel: 'Lista'
  }

  componentWillMount () {
    api.getMarkers((res) => { this.setState({ markers: res }) })
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.markers}
          renderItem={({ item }) => <ReportListItem onPress={(marker) => { navigate('SingleReport', { marker }) }} marker={item} />}
          keyExtractor={(item, index) => ('' + index)}
        />
      </SafeAreaView>
    )
  }
}
