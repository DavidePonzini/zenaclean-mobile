import React from 'react'
import { FlatList, View } from 'react-native'
import ReportListItem from './ReportListItem'

export default class ListScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [{ key: '0', title: 'Frigobarrrrrrrrrrrrrrrrrrrrr', descr: 'C\'è un frigobar', url: 'https://www.thehappycatsite.com/wp-content/uploads/2017/12/grow.jpg' },
        { key: '1', title: 'Frigobar', descr: 'C\'è un frigo nel bar', url: 'https://www.thehappycatsite.com/wp-content/uploads/2017/12/grow.jpg' },
        { key: '2', title: 'Bar', descr: 'C\'è un bar senza frigo', url: 'https://www.thehappycatsite.com/wp-content/uploads/2017/12/grow.jpg' }]
    }
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
