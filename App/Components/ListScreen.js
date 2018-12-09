import React from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import ReportListItem from './ReportListItem'
import api from '../Services/ApiService'

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

  componentWillMount () {
    this.setState({ fetching: true })
    return api.getMarkers((res) => { this.setState({ markers: res, fetching: false }) })
  }

  renderItem = ({ item }) => (
    <ReportListItem
      onPress={(marker) => this.props.navigation.navigate('SingleReport', { marker })}
      marker={item} />)

  render () {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.markers}
          refreshing={this.state.fetching}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => ('' + index)}
        />
      </SafeAreaView>
    )
  }
}
