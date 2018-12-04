import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import ListScreen from '../Components/ListScreen'
import MapScreen from '../Components/MapScreen'

const TabNavigator = createBottomTabNavigator({
  Map: {
    screen: MapScreen
  },
  List: ListScreen
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state
      let iconName
      if (routeName === 'Map') {
        iconName = 'map'
      } else if (routeName === 'List') {
        iconName = 'list'
      }

      return <Icon name={iconName} size={25} color={tintColor} />
    }
  }),
  tabBarOptions: {
    activeTintColor: 'dodgerblue',
    inactiveTintColor: 'gray'
  }
})

export default createAppContainer(TabNavigator)
