import React from 'react'
import UserRequests from './home-tabs/user-requests';
import CommunalRequest from './home-tabs/communal-requests';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function HomeScreen() {
    return (
        <Tab.Navigator
            tabBarPosition='top'
            screenOptions={{
                tabBarAndroidRipple: { borderless: false },

                pressColor: 'transparent',
                pressOpacity: 1,
                labelStyle: {
                    fontSize: 16,
                    textTransform: 'none',
                },
                style: {
                    backgroundColor: 'white',
                    height: 50,
                    elevation: 0
                },
                indicatorStyle: {
                    backgroundColor: 'blue',
                    height: 4,
                },
                tabStyle: { width: 'auto', marginLeft: 0, alignItems: 'center' },
            }}
        >
            <Tab.Screen name='usertab' component={UserRequests} options={{ headerShown: false, tabBarLabel: 'Your Requests' }} />
            <Tab.Screen name='communaltab' component={CommunalRequest} options={{ headerShown: false, tabBarLabel: 'Communal Requests' }} />
        </Tab.Navigator>
    )
}
