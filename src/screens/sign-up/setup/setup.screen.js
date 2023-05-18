import { Text, StyleSheet, View, TextInput, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../utils/services/firebase';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from 'react-native-paper';
import GetLocation from 'react-native-get-location';
import { updateProfile } from 'firebase/auth';

export default function SetUpScreen({ route }) {
    // key properties to tie to backend 
    const [fullname, setFullname] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [image, setImage] = useState();
    const [location, setLocation] = useState({});
    const [response, setResponse] = useState(null);
    const [isValid, setValid] = useState(false);
    let src;
    const user = auth.currentUser;
    const navigation = useNavigation();

    function handleImageConfiguration() {
        response?.assets.map((uri) => {
            setImage(uri)
            src = uri
            console.log(src.uri)
        })
    }
    function handleImageProfilePicker() {
        launchImageLibrary({
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
        }, setResponse)
    }



    function finalImage() {
        if (src !== undefined) {
            setImage(src)
            return image.uri;
        } else {
            response?.assets.map((uri) => {
                setImage(uri)
            })
            return image.uri;
        }
    }

    function getLocationPrompt() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                console.log(location);
                setLocation(location)
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }

    function update() {
        updateProfile(auth.currentUser, {
            displayName: fullname, photoURL: finalImage(), appName: 'SAMS'
        }).then(() => {
            console.log(auth.currentUser)
            navigation.navigate('profile')
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        // if (location === undefined && finalImage() === undefined && fullname === undefined) {
        //     console.log({ error: 'some of the required inputs fields were let empty' })
        // } else {
        //     setValid(true)
        // }
    })

    function completeTest() {
        const finale = {
            phoneNumber: phoneNumber,
            photoURL: finalImage(),
            displayName: fullname
        }

        if (user.email === undefined && finalImage() === undefined && fullname === undefined) {
            console.log({ error: 'some of the required inputs fields were let empty' })
        } else {
            update();
            update();
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Set Up Your Profile</Text>
                <View style={styles.form}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50, marginBottom: 20, backgroundColor: 'white', elevation: 1, width: 150, height: 150, alignSelf: 'center', borderRadius: 100 }}>
                        {response?.assets &&
                            response?.assets.map(({ uri }) => (
                                <View key={uri} style={styles.image}>
                                    <Image
                                        resizeMode="cover"
                                        resizeMethod="scale"
                                        style={{ width: 200, height: 200, borderRadius: 100 }}
                                        source={{ uri: uri }}
                                    />
                                </View>
                            ))}
                    </View>
                    <Button type='contained' textColor='#004AAD' buttonColor='#ffffff' style={styles.image_button_prompt} onPress={() => { handleImageProfilePicker(); handleImageConfiguration() }}>Upload Custom Profile Image</Button>
                    <View style={styles.input}>
                        <Text style={styles.label}>Full Name *</Text>
                        <TextInput style={styles.text} value={fullname} onChangeText={(text) => setFullname(text)} />
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.label}>Email Address *</Text>
                        <TouchableOpacity style={styles.text}>
                            <Text>{user.email}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.label}>Phone Number (Optional)</Text>
                        <TextInput style={styles.text} value={user.phoneNumber} onChangeText={(text) => setPhoneNumber(text)} />
                    </View>
                    <View style={styles.input}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.label}>Location *</Text>
                            <TouchableOpacity style={{ flexDirection: 'row', gap: 5 }} onPress={() => getLocationPrompt()}>
                                <Text>Get Location</Text><Image source={require('../../../images/pin.png')} style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.text} value={location} onChangeText={(text) => setLocation(text)} />
                    </View>
                    <View style={{ borderColor: 'transparent', borderBottomColor: '#004AAD', borderWidth: 1, marginVertical: 10 }}></View>
                    {isValid
                        ? <TouchableOpacity onPress={() => Alert.alert('Please fill in all the fields with asterik (*)')}>
                            <Button type='contained' style={{
                                backgroundColor: '#d0d0d0',
                                color: '#ffffff',
                                padding: 10,
                                borderRadius: 10
                            }} buttonColor='#d0d0d0' textColor='white'>Sorry The Form Is Incomplete</Button>
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={() => completeTest()}>
                        <Button type='contained' style={styles.complete} textColor='#ffffff'>Complete</Button>
                    </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                        <Button type='contained' style={[styles.cancel]} textColor='#004AAD' buttonColor='#ffffff'>Cancel</Button>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: '#ffffff'
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#004AAD',
        textAlign: 'center'
    },
    form: {
        flexDirection: 'column',
        gap: 10,
    },
    input: {
        paddingVertical: 5,
    },
    label: {
        fontWeight: 'bold',
        color: 'grey',
        fontSize: 14
    },
    text: {
        paddingHorizontal: 12.5,
        paddingVertical: 10,
        borderWidth: 1.25,
        borderColor: '#004AAD',
        borderRadius: 10,
        marginTop: 10
    },
    complete: {
        backgroundColor: '#004AAD',
        color: '#ffffff',
        padding: 10,
        borderRadius: 10
    },
    cancel: {
        borderWidth: 1.25,
        borderColor: '#004AAD',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    }
})