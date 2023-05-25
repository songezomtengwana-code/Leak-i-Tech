import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { styles } from './options.styles'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import UploadComponent from '../../../components/upload/upload-component';
import { useNavigation } from '@react-navigation/native';
import GetLocation from 'react-native-get-location';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { firebase } from '../../../utils/services/firebase';

export function UploadScreen({ route }) {
    const [isValid, setValid] = useState(false);
    const [response, setResponse] = useState(null);
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const [uploading, setUploading] = useState(null)
    const [comment, setComment] = useState(null)
    const [geolocation, setGeoLocation] = useState(null)
    let src;

    const { key, name, type } = route.params;

    const requestPath = {
        key: key,
        category: name,
        sub: type
    }

    const PickImage = async () => {
        let result = await launchImageLibrary({
            mediaType: 'mixed',
            saveToPhotos: true,
            includeBase64: false,
            quality: 1,
            aspect: [4, 3],
            allowEditing: true
        })

        const source = { uri: result.uri }
        console.log(source)
        setTestImage(source)
    }

    async function uploadToStorage(select) {
        setUploading(true)
        console.log(select)
        const response = await fetch(select.uri)
        const blob = await response.blob();
        const fileName = select.uri.substrig(select.uri.lastIndexOf('/') + 1);
        var ref = firebase.storage().ref().child(fileName).put(blob);

        try {
            await ref;
        } catch (error) {
            console.error(error)
        }

        setUploading(false)
        console.log('image is uploaded')
        setImage(null)
    }

    function handleImageConfiguration() {
        response?.assets.map((uri) => {
             setImage(uri)
        })
    }

    function getLocationPrompt() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                setGeoLocation(location)
                src = location
                console.log({ src: src });
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }

    function handleTakePictures() {
        getLocationPrompt();
        launchCamera({
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
        }, setResponse);
        handleImageConfiguration()
        setValid(true)
    }

    function handleImageUpload() {
        getLocationPrompt();
        launchImageLibrary({
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
        }, setResponse)
        handleImageConfiguration()
        setValid(true)
    }

    const finalImage = () => {
        if (image !== null) {
            setImage(src)
            return image;
        } else {
            response?.assets.map((uri) => {
                setImage(uri)
            })
            return image;
        }
    }

    function nextScreen(selection) {
        navigation.navigate('caption',
            { key: key, name: name, type: type, localsrc: selection.uri, localname: selection.fileName, location: geolocation }
        )
    }

    return (
        <ScrollView style={styles.screen}>
            <Text style={styles.title} onLongPress={() => nextScreen('quick pass enabled')}>Upload Image</Text>
            <Text style={styles.caution}>it is recommended that the picture is in landscape mode</Text>
            {response?.assets &&
                response?.assets.map((image) => (
                    <View key={image.uri}>
                        <View style={styles.image}>
                            <Image
                                resizeMode="cover"
                                resizeMethod="scale"
                                style={{ width: 400, height: 200, }}
                                source={{ uri: image.uri }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 10, alignItems: 'center' }}>
                            <Image source={require('../../../images/pin.png')} style={{ height: 20, width: 20 }} />
                            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', gap: 1 }}>
                                <Text>latitude : {geolocation.latitude}</Text>
                                <Text>longitude : {geolocation.longitude}</Text>
                            </View>
                        </View>
                        {/* <View>
                            <TextInput 
                                multiline={true} 
                                value={comment} 
                                onChangeText={(text) => setComment(text)} 
                                style={{ backgroundColor: 'white', borderBottomWidth: 2, borderBottomColor: '#004AAD' }} 
                                right={<Avatar.Icon icon='folder' />} 
                            />
                        </View> */}
                    </View>
                ))}

            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        handleTakePictures()
                    }}>
                        <Text style={styles.button_text}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handleImageUpload()}>
                        <Text style={styles.button_text} >Upload Photo</Text>
                    </TouchableOpacity>
                </View>
                {isValid
                    ? <TouchableOpacity style={styles.button_alternative} onPress={() => nextScreen(finalImage())}>
                        <Text style={styles.button_alternative_text}>Next</Text>
                    </TouchableOpacity>
                    : <TouchableOpacity style={styles.button_disabled}>
                        <Text style={styles.button_text}>Next</Text>
                    </TouchableOpacity>
                }
                <UploadComponent />
            </View>
        </ScrollView>
    );
}
