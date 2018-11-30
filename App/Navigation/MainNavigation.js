import { createStackNavigator, createAppContainer } from 'react-navigation'
import TabNavigator from './TabNavigator'
import AddReportScreen from '../Components/AddReportScreen'

const MainNavigator = createStackNavigator({
  Main: {
    screen: TabNavigator
  },
  AddReport: {
    screen: AddReportScreen
  }
},
{
  initialRouteName: 'Main',
  headerMode: 'none'
}
)

export default createAppContainer(MainNavigator)
