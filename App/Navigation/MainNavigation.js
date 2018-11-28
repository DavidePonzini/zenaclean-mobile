import { createStackNavigator, createAppContainer } from 'react-navigation'
import TabNavigator from './TabNavigator'

const MainNavigator = createStackNavigator({
  Main: {
    screen: TabNavigator
  }
},
{
  initialRouteName: 'Main',
  headerMode: 'none'
}
)

export default createAppContainer(MainNavigator)
