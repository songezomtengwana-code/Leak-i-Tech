import React from 'react';
import { Text } from 'react-native';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { V2requests } from '../../utils/database/app';
import { Image } from 'react-native';
import { ApprovedBadge, PendingBadge } from '../badge/badge-component';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../utils/services/firebase';

const RequestModal = ({ route }) => {
    const { id } = route.params;
    console.log(id)
    const navigation = useNavigation();

    return (
        <View>
            {V2requests.filter((res) => res.id === id).map((request) => {
                return (
                    <View style={styles.container} key={request.id}>
                        <View style={styles.modal}>
                            <Text style={styles.category}>
                                {request.category}
                            </Text>
                            <Text style={styles.key} selectable={true}>
                                key_id: {request.id}
                            </Text>
                            <View style={{ marginBottom: 10 }}>
                                {request.isApproved
                                    ? <ApprovedBadge />
                                    : <PendingBadge />
                                }
                            </View>
                            <View style={{ marginVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: request.imagesrc }} style={{ height: 200, width: 350 }} />
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

                            {request.authorEmail === auth.currentUser.email ?
                                <TouchableOpacity>
                                    <Button type="contained" style={styles.delete} buttonColor='#ff0000' textColor='#ffffff' > <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Delete</Text> </Button>
                                </TouchableOpacity> : <View></View>

                            }
                            <TouchableOpacity onPress={() => navigation.navigate('home')}>
                                <Button type="contained" style={styles.home} buttonColor='#ffffff' textColor='#004aad' > <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Return Home</Text> </Button>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })}
        </View>
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

export default RequestModal;
