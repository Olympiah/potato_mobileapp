import {createStackNavigator} from '@react-navigation/stack';
import React from 'react'
import Landing from '../screens/Landing'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Animation from '../screens/Animation'

const Stack = createStackNavigator();

function RootstackScreen() {
  return (
      <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName='Landing'
      >
          <Stack.Screen name='Landing' component={Landing} />
          {/* <Stack.Screen name='Login' component={Login} /> */}
          {/* <Stack.Screen name='Signup' component={Signup} /> */}
          {/* <Stack.Screen name='Animation' component={Animation} /> */}
      </Stack.Navigator>

  )
}

export default RootstackScreen