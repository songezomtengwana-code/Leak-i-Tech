import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { db, firebase } from '../utils/services/firebase';
import firestore from '@react-native-firebase/firestore';

export default function TestSreen() {

    useEffect(() => {
        const cities = db.collection('cities').get(); 
        

        console.log({users: cities})
    })
    return (
        <View>
            <Text>Users Registration</Text>
        </View>         
    )
}

const styles = StyleSheet.create({})