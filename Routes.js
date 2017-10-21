import { StackNavigator } from 'react-navigation';

import Login from './components/Login';
import Home from './components/Home';

export const Routes = StackNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  }
}, {
  headerMode: 'screen'
});
