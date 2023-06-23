import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../utils/services/firebase';
import { getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';

export default function ProfileScreen() {
    const navigation = useNavigation()

    const user = auth.currentUser;

    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;

    async function signout() {
        auth
            .signOut()
            .then(() => { navigation.navigate('signin'); console.log(user) });
    }

    const options = [
        { label: 'Username', value: displayName, icon: 'person' },
        { label: 'Email', value: email, icons: 'email' },
    ]



    return (
        <View style={{ minHeight: '100%', backgroundColor: '#ededed' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: '#004AAD', marginTop: 50 }}>{displayName}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25, backgroundColor: 'white', elevation: 1, width: 200, height: 200, alignSelf: 'center', borderRadius: 100 }}>
                {photoURL
                    ? <Image source={{ uri: photoURL }} style={styles.avatar} />
                    : <Image source={require('../../../images/person.png')} style={styles.avatar} />
                }
            </View>
            <View style={{ padding: 35, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {options.map((option) => {
                    return (
                        <View style={{ marginVertical: 10, flexDirection: 'column', gap: 5, justifyContent: 'center', alignItems: 'center' }} key={option.value}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'grey' }}>
                                {option.label}
                            </Text>
                            <Text style={{ fontSize: 18, color: '#000000' }}>
                                {option.value}
                            </Text>
                        </View>
                    );
                })
                }
                <View style={{ marginTop: 25 }}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('setup')}><Button textColor='#ffffff' buttonColor='#004AAD' style={styles.out} >Edit Profile</Button></TouchableOpacity> */}
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('tabs')} style={{ marginBottom: 12.5 }}><Button textColor='#004AAD' buttonColor='#ffffff' style={styles.home}>Home</Button></TouchableOpacity>
                    <TouchableOpacity><Button textColor='#ffffff' buttonColor='#ff0000' style={styles.out} onPress={() => signout()}>Log Out</Button></TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'center', color: '#f0f0f0', marginTop: 10 }}>{uid}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    out: {
        minWidth:120,
        padding: 5,
        borderRadius: 5
    },
    home: { 
        borderWidth: 1.25, 
        borderColor: '#004AAD', 
        borderRadius: 5,
        padding: 5,
        minWidth: 120
    },
    bottom: {
        backgroundColor: '#ffffff',
        width: '100%',
        padding: 20,
        position: 'absolute',
        bottom: -25,
        borderRadius: 14,
        paddingBottom: 40,
    },
    avatar: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        height: 100, 
        borderRadius: 100

    }
})