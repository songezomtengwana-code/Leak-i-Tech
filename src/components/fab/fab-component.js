import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

export function FabComponent() {
    return (
        <View><Text>FAB BUTTON HERE</Text></View>
    );
}