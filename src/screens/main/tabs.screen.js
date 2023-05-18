import React from 'react';
import HomeScreen from './tabs/home.screen';
import NotificationScreen from './tabs/notifications.screen';
import { RequestScreen } from '../request/request.screen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Avatar } from 'react-native-paper';
import { Image } from 'react-native';

const Tab = createMaterialBottomTabNavigator();

export default function TabsScreen() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#000000"
            inactiveColor="#000000"
            barStyle={{ backgroundColor: '#ffffff', borderTopWidth: 2, borderTopColor: '#ededed' }}
            backBehavior='initialRoute'
        >
            <Tab.Screen name='home' component={HomeScreen} options={{
                headerShown: false, tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <Image source={require('../../images/home.png')} size={25} style={{ backgroundColor: 'transparent', height: 20, width: 20 }} />
                ),
            }} />
            <Tab.Screen name="add" component={RequestScreen} options={{
                headerShown: false, tabBarLabel: 'Request',
                tabBarIcon: ({ color }) => (
                    <Image source={require('../../images/add.png')} size={25} style={{ backgroundColor: 'transparent', height: 20, width: 20 }} />
                ),
            }} />
            <Tab.Screen name="notification" component={NotificationScreen} options={{
                headerShown: false, tabBarLabel: 'Notifications',
                tabBarIcon: ({ color }) => (
                    <Image source={require('../../images/bell.png')} size={25} style={{ backgroundColor: 'transparent', height: 20, width: 20 }} />
                ),
            }} />

        </Tab.Navigator>
    );
}  