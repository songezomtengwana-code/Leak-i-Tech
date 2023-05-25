import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import { styles } from './header.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../../utils/services/firebase';
import { useNavigation } from '@react-navigation/native';

export const HeaderComponent = ({ title }) => {
    const navigation = useNavigation()

    async function signout() {
        auth
            .signOut()
            .then(() => navigation.navigate('signin'));
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onLongPress={() => { navigation.navigate('tests') }}>
                <Image source={require('../../images/icon.png')} style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.text}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            <TouchableOpacity style={styles.out} onPress={()=> navigation.navigate('profile')}>
                <Image source={require('../../images/person.png')} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
        </View>
    )
}