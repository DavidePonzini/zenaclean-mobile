import { createStackNavigator, createAppContainer } from 'react-navigation'
import TabNavigator from './TabNavigator'
import AddReportScreen from '../Components/AddReportScreen'
import SingleReportScreen from '../Components/SingleReportScreen'
import Home from '../Components/Home'
import SignInScreen from '../Components/SignIn'

const MainNavigator = createStackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  AddReport: {
    screen: AddReportScreen
  },
  SingleReport: {
    screen: SingleReportScreen
  },
  SignIn: {
    screen: SignInScreen
  },
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  }
},
{
  initialRouteName: 'Main'
}
)

export default createAppContainer(MainNavigator)
