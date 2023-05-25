  import React, { useEffect } from 'react'
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/sign-up/sign-up.screen';
import SignInScreen from './src/screens/sign-in/sign-in.screen';
import TabsScreen from './src/screens/main/tabs.screen';
import ProfileScreen from './src/screens/main/tabs/profile.screen';
import { Provider } from 'react-redux';
import { store } from './src/redux/database';
import RequestModal from './src/components/request modal/request.modal';
import SetUpScreen from './src/screens/sign-up/setup/setup.screen';
import TestSreen from './src/screens/test.screen';
import ResetPassowordScreen from './src/screens/reset-password/reset-password.screen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    return 
  })

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="signup" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name='setup' component={SetUpScreen} options={{ headerShown:  false }} />
          <Stack.Screen name="signin" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name='tabs' component={TabsScreen} options={{ headerShown: false }} />
          <Stack.Screen name='profile' component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name='forgot-password' component={ResetPassowordScreen} options={{ headerShown: false }} />
          <Stack.Screen name='tests' component={TestSreen} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name='requestModal' component={RequestModal} options={{ headerShown: false }} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}