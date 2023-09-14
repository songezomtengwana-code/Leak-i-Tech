import React, {useEffect, useState} from 'react';
import {Alert, Text} from 'react-native';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Image} from 'react-native';
import {ApprovedBadge, PendingBadge} from '../badge/badge-component';
import {useNavigation} from '@react-navigation/native';
import {auth, firebase, storageDB} from '../../utils/services/firebase';
import {ref, getDownloadURL} from 'firebase/storage';
import {colors} from '../../utils/theme/colors';
import {windowHeight} from '../../utils/theme/dimensions';
import {user_delete_request} from '../../utils/services/global';
import {Button} from 'react-native-paper';
import TrashIcon from 'react-native-bootstrap-icons/icons/trash';
import BackIcon from 'react-native-bootstrap-icons/icons/back';
import ArrowLeftIcon from 'react-native-bootstrap-icons/icons/arrow-90deg-left';
import Back from 'react-native-bootstrap-icons/icons/back';
import Arrow90degLeft from 'react-native-bootstrap-icons/icons/arrow-90deg-left';

const RequestModal = ({route}) => {
  const {id, request} = route.params;
  const [requests, setRequests] = useState([]);
  const [imageDownloadUrl, setImageDownloadUrl] = useState(null);
  const navigation = useNavigation();
  const [overlayStatus, setOverlayStatus] = useState(false);

  useEffect(() => {
    getDownloadURL(ref(storageDB, request.imagename)).then(url => {
      setImageDownloadUrl(url);
    });

    if (imageDownloadUrl !== null) {
      console.log(imageDownloadUrl);
    } else {
      getDownloadURL(ref(storageDB, request.imagename)).then(url => {
        setImageDownloadUrl(url);
      });
    }

    // no code below this one
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

    return () => subscriber();
  }, []);

  const delete_request = order => {
    // initial step of displaying the loading overlay as deletation is in progress
    setOverlayStatus(true);
    user_delete_request(order);
    console.log('redirecting');
    navigation.navigate('usertab');
  };

  return (
    <ScrollView style={{backgroundColor: 'white', paddingBottom: 100}}>
      <View>
        <View>
          {requests
            .filter(res => res.order === id)
            .map(request => {
              return (
                <View style={styles.container} key={request.order}>
                  <View style={styles.modal}>
                    <View style={styles.banner}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('home')}
                        style={{
                          width: 100,
                          height: 35,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          paddingVertical: 5,
                        }}>
                        <Arrow90degLeft fill={colors.primary} />
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                        onPress={() => navigation.navigate('commentModal')}
                        style={{
                          width: 100,
                          height: 35,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 50,
                          paddingVertical: 5,
                        }}>
                        <Image
                          style={{height: 25, width: 25, marginVertical: 10}}
                          source={require('../../images/comment.png')}
                        />
                      </TouchableOpacity> */}
                      {request.authorEmail === auth.currentUser.email ? (
                        <TouchableOpacity
                          style={{
                            width: 100,
                            height: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            paddingVertical: 5,
                          }}
                          onPress={() => {
                            delete_request(request.order, request.imagename);
                          }}>
                          <TrashIcon fill={colors.primary} />
                        </TouchableOpacity>
                      ) : (
                        <></>
                      )}
                    </View>
                    <Text style={styles.category}>{request.category}</Text>
                    <Text style={{marginBottom: 10, color: '#000'}}>
                      {request.postedon}
                    </Text>
                    <View style={{marginBottom: 10}}>
                      {request.isApproved ? (
                        <ApprovedBadge />
                      ) : (
                        <PendingBadge />
                      )}
                    </View>
                    <View
                      style={{
                        marginVertical: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: request.downloadurl}}
                        style={{height: 200, width: '100%'}}
                      />
                    </View>
                    <View style={styles.location}>
                      <Image
                        source={require('../../images/pin.png')}
                        style={{height: 15, width: 15}}
                      />
                      <Text style={{color: '#004AAD', fontWeight: 'bold'}}>
                        {request.location}
                      </Text>
                    </View>
                    <Text style={styles.description}>
                      {request.description}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
      </View>
      {overlayStatus ? (
        <View style={styles.top}>
          <View style={styles.top_container}>
            <Text style={styles.top_container_title}>Deleted successfully</Text>
            <Text style={styles.top_container_context}>
              Request has been successfully removed from your account .
            </Text>
            <View style={styles.top_container_buttons}>
              <Button
                textColor={colors.primary}
                onPress={() => {
                  setOverlayStatus(false);
                  navigation.navigate('usertab');
                }}
                type="contained">
                Ok
              </Button>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    padding: 0,
    paddingVertical: 0,
    marginBottom: 25,
  },
  modal: {
    backgroundColor: '',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  category: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#004aad',
    marginBottom: 5,
  },
  key: {
    fontSize: 10,
    fontWeight: '300',
    marginBottom: 20,
  },
  location: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#0e0e0e',
    height: '100%',
    marginBottom: 25,
  },
  delete: {
    borderRadius: 5,
    paddingVertical: 5,
  },
  home: {
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f1f1f1',
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: colors.soft_grey,
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
    marginBottom: 50,
    position: 'absolute',
    bottom: 25,
    zIndex: 100,
  },
  top: {
    flex: 1,
    zIndex: 100,
    backgroundColor: colors.soft_grey,
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 25,
  },
  top_container: {
    backgroundColor: colors.white,
    padding: 25,
    borderRadius: 10,
  },
  top_container_title: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  top_container_context: {
    color: colors.black,
    marginVertical: 15,
    fontSize: 16,
  },
  top_container_buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
});

export default RequestModal;
