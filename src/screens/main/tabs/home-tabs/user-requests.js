import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {HeaderComponent} from '../../../../components/header/header-component';
import {RequestCard} from '../../../../components/request-card/request-card';
import {auth, firebase} from '../../../../utils/services/firebase';
import {RefreshControl} from 'react-native';
import {
  _requests_collection,
  get_store_user,
} from '../../../../utils/services/global';
import {useNavigation} from '@react-navigation/native';

export default function UserRequests() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [requests, setRequests] = useState([]);
  const user = auth.currentUser;
  const nav = useNavigation();

  useEffect(() => {
    const subscriber = firebase
      .firestore()
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    get_store_user();

    console.log(requests);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View style={{backgroundColor: 'white', minHeight: '100%'}}>
      <HeaderComponent title="Your Requests" />
      <ScrollView
        style={{marginBottom: 75}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <RequestCard
          config={requests.filter(res => res.authorEmail === `${user.email}`)}
        />
      </ScrollView>
    </View>
  );
}
