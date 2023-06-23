import { StyleSheet, Text, View, Image, Alert, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db, firebase, firestoreDB } from '../utils/services/firebase';
import { _requests_collection, _user, get_requests, get_store_user } from '../utils/services/global';
import { RequestCard } from '../components/request-card/request-card';
import { ApprovedBadge, PendingBadge } from '../components/badge/badge-component';
import { styles } from '../components/request-card/request-card.styles'
import { useNavigation } from '@react-navigation/native';

export default function TestScreen({ route }) {
    const [requests, setRequests] = useState([]);
    const user = auth.currentUser
    const nav = useNavigation()



    useEffect(() => {
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

            

        // Unsubscribe from events when no longer in use
        return () => subscriber();

    }, []);
    return (
        <View>
            <FlatList
                data={requests}
                renderItem={({ item }) => (
                    <TouchableOpacity key={item.id} style={styles.card} onPress={() => nav.navigate('itemModal', {
                        id: item.id
                    })}>
                        <View style={styles.container}>
                            <View style={{ marginVertical: 10, flexDirection: 'row', gap: 10 }}>
                                {user.photoUrl
                                    ? <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
                                    : <Text>NO PROFILE</Text>
                                }
                                <Text style={styles.username}>
                                    {item.authorName}
                                </Text>
                            </View>
                            <Text style={styles.text}>{item.category}</Text>
                            <View style={styles.image}></View>
                            <View style={styles.content}>
                                <Text style={styles.description}>{item.description}</Text>
                                <View style={styles.location}>
                                    <Image source={require('../images/pin.png')} style={{ height: 20, width: 20 }} />
                                    <Text style={{ fontWeight: 'bold', marginLeft: 5, color: 'grey' }}>
                                        {item.location}
                                    </Text>
                                </View>
                                <View>
                                    {item.isApproved
                                        ? <ApprovedBadge />
                                        : <PendingBadge />
                                    }
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}