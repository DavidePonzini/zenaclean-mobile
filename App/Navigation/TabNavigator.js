import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import ListScreen from '../Components/ListScreen'
import MapScreen from '../Components/MapScreen'

const TabNavigator = createBottomTabNavigator({
  Map: MapScreen,
  List: ListScreen
})

export default createAppContainer(TabNavigator)
