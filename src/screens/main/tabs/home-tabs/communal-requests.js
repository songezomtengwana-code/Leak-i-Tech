import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, ScrollView, RefreshControl } from 'react-native';
import { HeaderComponent } from '../../../../components/header/header-component';
import { styles } from '../../tabs.style';
import { RequestCard } from '../../../../components/request-card/request-card';
import { V2requests } from '../../../../utils/database/app';
import { auth, firebase } from '../../../../utils/services/firebase';
import { useNavigation } from '@react-navigation/native';


export default function CommunalRequest() {
    const [refreshing, setRefreshing] = React.useState(false);
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
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        console.log(requests)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    return (
        <View style={{ backgroundColor: 'white', minHeight: '100%' }}>
            <HeaderComponent title="Communal Request" />
            <ScrollView 
                style={{ marginBottom: 75 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
                }
            >
                <TextInput style={styles.search} placeholder='Search Request' />
                <RequestCard config={requests.filter((res) => res.authorEmail !== `${auth.currentUser.email}`)} />
            </ScrollView>
        </View>
    )
}