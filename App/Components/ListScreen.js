import React from 'react'
import { FlatList, View } from 'react-native'
import ReportListItem from './ReportListItem'

export default class ListScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount () {
    return fetch('https://zenaclean-224012.firebaseio.com/markers.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          items: responseJson
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    return (
      <View>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => <ReportListItem item={item} />}
        />
      </View>
    )
  }
}
