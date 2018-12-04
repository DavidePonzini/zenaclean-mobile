import { createStackNavigator, createAppContainer } from 'react-navigation'
import TabNavigator from './TabNavigator'
import AddReportScreen from '../Components/AddReportScreen'
import SingleReportScreen from '../Components/SingleReportScreen'

const MainNavigator = createStackNavigator({
  Main: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  },
  AddReport: {
    screen: AddReportScreen
  },
  SingleReport: {
    screen: SingleReportScreen
  }
},
{
  initialRouteName: 'Main'
}
)

export default createAppContainer(MainNavigator)
