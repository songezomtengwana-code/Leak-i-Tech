import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {ApprovedBadge, PendingBadge} from '../badge/badge-component';
import {auth} from '../../utils/services/firebase';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/theme/colors';
import MapFillIcon from 'react-native-bootstrap-icons/icons/map-fill';
import PersonFillIcon from 'react-native-bootstrap-icons/icons/person-fill';

export const RequestCard = ({config}) => {
  const user = auth.currentUser;
  const nav = useNavigation();
  const [date, setDate] = useState(null);

  const handle_date_config = () => {
    let initialDateIdentifier = config.map(r => r.postedon);
    let parsedDateIdentifier = initialDateIdentifier[0];
    setDate(parsedDateIdentifier);
  };

  useEffect(() => {
    handle_date_config();
  }, []);

  if (config.length > 0) {
    return (
      <SafeAreaView style={styles.displayer}>
        {config?.map(request => {
          return (
            <TouchableOpacity
              key={request.order}
              style={styles.card}
              onPress={() =>
                nav.navigate('requestModal', {
                  id: request.order,
                  request: request,
                })
              }>
              <View style={styles.container}>
                <View
                  style={{marginVertical: 10, flexDirection: 'row', gap: 10}}>
                  {user.photoUrl ? (
                    <Image
                      source={{uri: user.photoUrl}}
                      style={styles.avatar}
                    />
                  ) : (
                    <PersonFillIcon scale={1.2} fill={colors.primary} />
                  )}
                  <Text style={styles.username}>{request.authorName}</Text>
                </View>
                <View>
                  {request.isApproved ? <ApprovedBadge /> : <PendingBadge />}
                </View>

                <Text style={styles.text}>{request.category}</Text>

                <Text style={{marginBottom: 10, color: '#000'}}>
                  {request?.postedon ? request.postedon.substring(0, 21) : request.postedon}
                </Text>

                <View style={styles.content}>
                  <Text
                    style={styles.description}
                    ellipsizeMode="tail"
                    numberOfLines={3}>
                    {request.description}
                  </Text>
                </View>
                <View style={styles.image}>
                  <Image
                    source={{uri: request.downloadurl}}
                    style={{height: 200, width: '100%'}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    );
  } else {
    return (
      <View
        Style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          paddingVertical: 100,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 700,
            color: 'black',
            marginTop: 50,
          }}>
          {' '}
          No Requests{' '}
        </Text>
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
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12.5,
    color: colors.primary,
  },
  image: {
    marginVertical: 20,
  },
  content: {},
  description: {
    marginBottom: 10,
    fontSize: 18,
    color: colors.dark,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'grey',
  },
  avatar: {
    height: 20,
    width: 20,
  },
  username: {
    color: 'black',
  },
  banner: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
  },
  banner_votes: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
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
