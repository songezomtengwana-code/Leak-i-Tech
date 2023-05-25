import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { ApprovedBadge, PendingBadge } from '../badge/badge-component';
import { auth } from '../../utils/services/firebase';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

export const RequestCard = ({ config }) => {
  const user = auth.currentUser
  const nav = useNavigation()

  if (config.length > 0) {
    return (
      <SafeAreaView style={styles.displayer}>
        {config.map((request) => {
          return (
            <TouchableOpacity key={request.id} style={styles.card} onPress={() => nav.navigate('requestModal', {
              id: request.id
            })}>
              <View style={styles.container}>
                <View style={{ marginVertical: 10, flexDirection: 'row', gap: 10 }}>
                  {user.photoUrl
                    ? <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
                    : <Image source={require('../../images/person.png')} style={styles.avatar} />
                  }
                  <Text style={styles.username}>
                    {request.authorName}
                  </Text>
                </View>
                <Text style={styles.text}>{request.category}</Text>
                <View style={styles.image}></View>
                <View style={styles.content}>
                  <Text style={styles.description}>{request.description}</Text>
                  <View style={styles.location}>
                    <Image source={require('../../images/pin.png')} style={{ height: 20, width: 20 }} />
                    <Text style={{ fontWeight: 'bold', marginLeft: 5, color: 'grey' }}>
                      {request.location}
                    </Text>
                  </View>
                  <View>
                    {request.isApproved
                      ? <ApprovedBadge />
                      : <PendingBadge />
                    }
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    );
  }
  else {
    return (
      <View Style={{ flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', paddingVertical: 50 }}>
        <Text style={{ textAlign: 'center', padding: 50, fontWeight: 700 }}> No Requests </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  displayer: {
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 15,
  },
  card: {
    marginVertical: 10,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#004AAD'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12.5,
    color: '#004AAD'
  },
  image: {},
  content: {},
  description: {
    marginBottom: 10,
    fontSize: 18,
    color: '#171717',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'grey'
  },
  avatar: {
    height: 20, width: 20
  },
  username: {
    color: 'black'
  }
});

/**
 * CONFIG PROPERTIES
 *
 * TITLE
 * IMAGESRC
 * DESCRIPTION
 * LOCATION
 * STATUS
 */
