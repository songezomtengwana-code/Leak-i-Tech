import React, { useEffect, useState } from 'react';
import HomeScreen from './tabs/home.screen';
import NotificationScreen from './tabs/notifications.screen';
import { RequestScreen } from '../request/request.screen'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { notifications } from '../../utils/database/app';
import HouseDoorFill from 'react-native-bootstrap-icons/icons/house-door-fill';
import { colors } from '../../utils/theme/colors';
import PlusSquareFill from 'react-native-bootstrap-icons/icons/plus-square-fill';
import BellFill from 'react-native-bootstrap-icons/icons/bell-fill';
import { _user } from '../../utils/services/global';

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
                        <HouseDoorFill fill={colors.primary} />
                    ),
            }} />
            <Tab.Screen name="add" component={RequestScreen} options={{
                headerShown: false, tabBarLabel: 'Request',
                tabBarIcon: ({ color }) => (
                    <PlusSquareFill fill={colors.primary} />

                ),
            }} />
            <Tab.Screen name="notification" component={NotificationScreen} options={{
                headerShown: false, tabBarLabel: 'Notifications',
                tabBarIcon: ({ color }) => (
                    <BellFill fill={colors.primary} />
                    ),
            }} />

        </Tab.Navigator>
    );
}  