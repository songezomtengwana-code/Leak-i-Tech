import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {styles} from './options.styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import UploadComponent from '../../../components/upload/upload-component';
import {useNavigation} from '@react-navigation/native';
import GetLocation from 'react-native-get-location';
import {ActivityIndicator} from 'react-native-paper';
import {
  get_storage_image,
  upload_to_storage,
} from '../../../utils/services/global';
import {reverse_geocoder} from '../../../utils/services/location-service';

export function UploadScreen( {route}) {
  const [isValid, setValid] = useState(false);
  const [response, setResponse] = useState(null);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const [directLocation, setDirectLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [geolocation, setGeoLocation] = useState(null);
  let src;

  const {key, name, type} = route.params;

  const pick_image = async () => {
    let result = await launchImageLibrary(
      {
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: false,
        allowsEditing: true,
      },
      setResponse,
    );
    const source = {uri: result.assets[0].uri, name: result.assets[0].fileName};
    setImage(source);
    upload_to_storage(source);
    get_storage_image(source.name);
    setValid(true);
  };

  const take_image = async () => {
    setValid(true);
    let result = await launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
      },
      setResponse,
    );
    const source = {uri: result.assets[0].uri, name: result.assets[0].fileName};
    setImage(source);
    upload_to_storage(source);
    get_storage_image(source.name);
    setValid(true);
  };

  const get_location_prompt = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setGeoLocation(location);
        src = location;
        reverse_geocoder(src);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  function nextScreen() {
    upload_to_storage(image);
    navigation.navigate('caption', {
      key: key,
      name: name,
      type: type,
      localsrc: image.uri,
      localname: image.name,
      location: geolocation,
      directLocation: directLocation,
    });
  }

  useEffect(() => {
    get_location_prompt();
  }, []);

  return (
    <ScrollView style={styles.screen}>
      {loading ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#004AADa1',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}>
          <ActivityIndicator color="#FFFFFF" size="large"></ActivityIndicator>
          <Text style={{color: '#FFF', fontWeight: 'bold', marginTop: 15}}>
            Uploading Image
          </Text>
        </View>
      ) : (
        <View></View>
      )}
      <View>
        <Text style={styles.title}>Upload Image</Text>
        <Text style={styles.caution}>
          it is recommended that the picture is in landscape mode
        </Text>
        {response?.assets &&
          response?.assets.map(image => (
            <View key={image.uri}>
              <View style={styles.image}>
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  style={{width: 400, height: 200}}
                  source={{uri: image.uri}}
                />
              </View>
            </View>
          ))}

        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity style={styles.button} onPress={take_image}>
              <Text style={styles.button_text}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pick_image}>
              <Text style={styles.button_text}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
          {isValid ? (
            <TouchableOpacity
              style={styles.button_alternative}
              onPress={() => nextScreen()}>
              <Text style={styles.button_alternative_text}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button_disabled}>
              <Text style={styles.button_text}>Next</Text>
            </TouchableOpacity>
          )}
          <UploadComponent />
        </View>
      </View>
    </ScrollView>
  );
}
