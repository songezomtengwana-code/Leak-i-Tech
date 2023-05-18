import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../utils/services/firebase';
import { getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';

export default function NotificationScreen() {
    const navigation = useNavigation()

    const notifications = [

    ]

    const user = auth.currentUser;

    return (
        <View style={{ minHeight: '100%', backgroundColor: '#ffffff' }}>
            <View style={styles.header}>
                <Text style={styles.title}>Notifications</Text>
                <TouchableOpacity>
                    <Image source={require('../../../images/gear.png')} style={styles.gear} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View styles={styles.container}>
                    {notifications.length > 0
                        ? <View>{notifications.length}</View>
                        : <View style={styles.empty}>
                            <Text style={styles.empty_text}>No New Notifications</Text>
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ffffff',
        paddingBottom: 10,
        paddingHorizontal: 20,
        paddingTop: 35,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#004AAD',
    },
    gear: {
        height: 25,
        width: 25
    },
    empty: {
        minHeight: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    empty_text: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#5e5e5e'
    }
})