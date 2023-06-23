import React, { useEffect, useState } from 'react';
import { Alert, Text } from 'react-native';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'react-native';
import { ApprovedBadge, PendingBadge } from '../badge/badge-component';
import { useNavigation } from '@react-navigation/native';
import { auth, firebase, firebaseConfig, storageDB } from '../../utils/services/firebase';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { user_delete_request } from '../../utils/services/global';

const RequestModal = ({ route }) => {
    const { id, request } = route.params;
    const [requests, setRequests] = useState([]);
    const [imageDownloadUrl, setImageDownloadUrl] = useState(null)
    const navigation = useNavigation();


    useEffect(() => {

        getDownloadURL(ref(storageDB, request.imagename)).then((url) => {
            setImageDownloadUrl(url)
        })
        
        if (imageDownloadUrl !== null) {
            console.log(imageDownloadUrl)
        } else {
            getDownloadURL(ref(storageDB, request.imagename)).then((url) => {
            setImageDownloadUrl(url)
        })
        }
 
        // no code below this one
        const subscriber = firebase.firestore()
            .collection('requests')
            .onSnapshot(querySnapshot => {
                const requests_collection = [];

                querySnapshot.forEach(documentSnapshot => {
                    requests_collection.push({
                        ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                    });
                });

                setRequests(requests_collection);
            });

        return () => subscriber();
    }, [])

    return (
        <ScrollView>
            <View>
                {requests.filter((res) => res.order === id).map((request) => {
                    return (
                        <View style={styles.container} key={request.order}>
                            <View style={styles.modal}>
                                <Text style={styles.category}>
                                    {request.category}
                                </Text>
                                <Text style={{ marginBottom: 10, color: '#000' }}>
                                    {request.postedon}
                                </Text>
                                <View style={{ marginBottom: 10 }}>
                                    {request.isApproved
                                        ? <ApprovedBadge />
                                        : <PendingBadge />
                                    }
                                </View>
                                <View style={{ marginVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={{ uri: request.downloadurl }} style={{ height: 200, width: 350 }} />
                                </View>
                                <View style={styles.location}>
                                    <Image source={require('../../images/pin.png')} style={{ height: 15, width: 15 }} />
                                    <Text style={{ color: '#004AAD', fontWeight: 'bold' }}>
                                        {request.location}
                                    </Text>
                                </View>
                                <Text style={styles.description}>
                                    {request.description}
                                </Text>

                                <View style={styles.banner}>
                                    <TouchableOpacity onPress={() => navigation.navigate('home')} style={{ width: 100, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 50, paddingVertical: 5 }}>
                                        <Image style={{ height: 25, width: 25, marginVertical: 10 }} source={require('../../images/home.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('home')} style={{ width: 100, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 50, paddingVertical: 5 }}>
                                        <Image style={{ height: 25, width: 25, marginVertical: 10 }} source={require('../../images/comment.png')} />
                                    </TouchableOpacity>
                                    {request.authorEmail === auth.currentUser.email ?
                                        <TouchableOpacity style={{ width: 100, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 50, paddingVertical: 5 }} onPress={() => {
                                            user_delete_request(request.order)
                                            Alert.alert('Deleted', 'Your Post Has Been Deleted Successfully')
                                            navigation.navigate('usertab')
                                        }}>
                                            <Image style={{ height: 25, width: 25, marginVertical: 10 }} source={require('../../images/bin.png')} />
                                        </TouchableOpacity> : <></>
                                    }
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
            <View style={styles.container}>
                <Text>Hello Upvotes</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        paddingHorizontal: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: '',
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
        paddingVertical: 5
    },
    home: {
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#f1f1f1',
    },
    banner: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#ffffff',
        borderRadius: 50,
        padding: 5,
        alignItems: 'center'
    }
})

export default RequestModal;
