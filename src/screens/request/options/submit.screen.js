import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';
import { auth, db } from '../../../utils/services/firebase';
import { useNavigation } from '@react-navigation/native';
import { post_request, user_delete_account, user_push_notifications } from '../../../utils/services/global';

export default function SubmitScreen({ route }) {
    const { key, name, sub, image, description, image_name, location, directLocation, download_image } = route.params;
    const user = auth.currentUser;
    const [uploading, setUploading] = useState(false);
    const navigation = useNavigation()


    const result = {
        order: Date.now(),
        postedon: Date(),
        authorName: user.displayName,
        authorEmail: user.email,
        authorTag: user.displayName.toString().trim(),
        category: name,
        sub: sub,
        imagesrc: image,
        imagename: image_name,
        description:
            description,
        location: directLocation,
        geolocation: location,
        isTerminated: false,
        isApproved: false,
        downloadurl: download_image
    }

    /**
     * @important consult before clearing
     */
    const display_request = [
        result
    ]

    const handle_upload = () => {
        user_push_notifications(result.sub)
        setUploading(true)
        post_request(result)
        navigation.navigate('complete')
        setUploading(false)
    }

    return (
        <ScrollView style={{ minHeight: '100%', backgroundColor: 'white' }}>
            {uploading
                ?
                <View style={{ minheight: 500, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#004AADa1', flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <ActivityIndicator color='#FFFFFF' size='large'></ActivityIndicator>
                    <Text style={{ color: '#FFF', fontWeight: 'bold', marginTop: 15 }}>Posting Request</Text>
                </View>
                :
                <View></View>}
            <View style={styles.container}>
                {display_request.map((request) => {
                    return (
                        <View style={styles.container} key={request.order}>
                            <View style={styles.modal}>
                                <TouchableOpacity>
                                    <Image source={require('../../../images/icon.png')} style={styles.icon} />

                                </TouchableOpacity>
                                <Text style={styles.category}>
                                    {request.category}
                                </Text>
                                <Text style={styles.key} selectable={true}>
                                    key_id: {request.order}
                                </Text>
                                <Text style={styles.date} selectable={true}>
                                    {request.postedon}
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
                                    <TouchableOpacity onPress={() => {navigation.navigate('options')}}>
                                        <Button type="contained" style={styles.delete} buttonColor='#004aad' textColor='#ffffff' > <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Cancel</Text> </Button>
                                    </TouchableOpacity> : <View></View>

                                }
                                <TouchableOpacity onPress={handle_upload}>
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
    },
    icon: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    }
})

