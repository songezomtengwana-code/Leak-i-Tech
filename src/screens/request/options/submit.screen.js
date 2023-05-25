import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper';
import React, { useState } from 'react'
import { auth } from '../../../utils/services/firebase';
import { ApprovedBadge, PendingBadge } from '../../../components/badge/badge-component';
import { V2requests } from '../../../utils/database/app';
import { useNavigation } from '@react-navigation/native';

export default function SubmitScreen({ route }) {
    const { key, name, sub, image, description, localname, location } = route.params
    const user = auth.currentUser;
    const [uploading, setUploading] = useState(false);
    const navigation = useNavigation()

    const result = [
        {
            postedon: Date.UTC().toString(),
            authorName: user.displayName,
            authorEmail: user.email,
            authorTag: user.displayName,
            id: Math.random(),
            category: name,
            sub: sub,
            imagesrc: image,
            description:
                description,
            location: 'Makhaza, Khayelistsha, Cape Town, 43235',
            geolocation: location,
            isTerminated: false,
            isApproved: false,
        }
    ]

    function handleUpload() {
        setUploading(true)
        try {
            console.log(result[0]);
            V2requests.push(result[0]);
            console.log(V2requests)
        } catch(error) {
            console.error({ error: error })
        }
        setUploading(false);
        setTimeout(() => {
            navigation.navigate('complete');
        }, 1000);
    }

    return (
        <ScrollView style={{ minHeight: '100%' }}>
            {uploading
                ?
                <View style={{ minheight: 500, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#004AADa1', flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <ActivityIndicator color='#FFFFFF' size='large'></ActivityIndicator>
                    <Text style={{ color: '#FFF', fontWeight: 'bold', marginTop: 15 }}>uploading, please wait ...</Text>
                </View>
                :
                <View></View>}
            <View style={styles.container}>
                {result.map((request) => {
                    return (
                        <View style={styles.container} key={request.id}>
                            <View style={styles.modal}>
                                <Text style={styles.category}>
                                    {request.category}
                                </Text>
                                <Text style={styles.key} selectable={true}>
                                    key_id: {request.id}
                                </Text>
                                <Text style={styles.key} selectable={true}>
                                    date: {request.postedon}
                                </Text>
                                <View style={{ marginVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={{ uri: request.imagesrc }} style={{ height: 200, width: 350 }} />
                                </View>
                                <View style={styles.location}>
                                    <Image source={require('../../../images/pin.png')} style={{ height: 15, width: 15 }} />
                                    <Text style={{ color: '#004AAD', fontWeight: 'bold' }}>
                                        {request.location}
                                    </Text>

                                </View>
                                <Text style={styles.description}>
                                    {request.description}
                                </Text>

                                {request.authorEmail === auth.currentUser.email ?
                                    <TouchableOpacity>
                                        <Button type="contained" style={styles.delete} buttonColor='#004aad' textColor='#ffffff' > <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Cancel</Text> </Button>
                                    </TouchableOpacity> : <View></View>

                                }
                                <TouchableOpacity onPress={() => handleUpload()}>
                                    <Button type="contained" style={styles.home} buttonColor='#ffffff' textColor='#004aad' > <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Submit</Text> </Button>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        height: '100%',

    },
    modal: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        paddingVertical: 30
    },
    category: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#004aad',
        marginBottom: 5
    },
    key: {
        fontSize: 10,
        fontWeight: '300',
        marginBottom: 20
    },
    location: {
        flexDirection: 'row',
        gap: 5,
        marginBottom: 10
    },
    description: {
        fontSize: 18,
        color: '#0e0e0e',
        marginBottom: 25
    },
    delete: {
        borderRadius: 5,
        marginTop: 5,
        paddingVertical: 5
    },
    home: {
        paddingVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#004aad', marginTop: 10
    }
})

