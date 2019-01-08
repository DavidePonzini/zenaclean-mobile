import { createStackNavigator, createAppContainer } from 'react-navigation'
import TabNavigator from './TabNavigator'
import AddReportScreen from '../Components/AddReportScreen'
import SingleReportScreen from '../Components/SingleReportScreen'
import HomeScreen from '../Components/HomeScreen'
import SignUpScreen from '../Components/SignUpScreen'
import GdprScreen from '../Components/GdprScreen'

const MainNavigator = createStackNavigator({
  Main: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  AddReport: {
    screen: AddReportScreen
  },
  Gdpr: {
    screen: GdprScreen
  },
  SingleReport: {
    screen: SingleReportScreen
  },
  SignUp: {
    screen: SignUpScreen
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
