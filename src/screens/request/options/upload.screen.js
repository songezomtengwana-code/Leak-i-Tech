import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { styles } from './options.styles'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import UploadComponent from '../../../components/upload/upload-component';
import { useNavigation } from '@react-navigation/native';
import GetLocation from 'react-native-get-location';
import { Button } from 'react-native-paper';
import { firebase } from '../../../utils/services/firebase';

export function UploadScreen() {
    const [isValid, setValid] = useState(false);
    const [response, setResponse] = useState(null);
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const [testImage, setTestImage] = useState(null)
    const [uploading, setUploading] = useState(null)
    let src;

    const PickImage = async () => {
        let result = await launchImageLibrary({
            mediaType: 'mixed',
            saveToPhotos: true,
            includeBase64: false,
            quality: 1,
            aspect: [4,3],
            allowEditing: true
        })

        const source = { uri: result.uri }
        console.log(source)
        setTestImage(source)
    }

    const uploadToStorage = async () => {
        setUploading(true)
        const response = await fetch(testImage.uri)
        const blob = await response.blob();
        const fileName = testImage.uri.substrig(testImage.uri.lastIndexOf('/')+1);
        var ref = firebase.storage().ref().child(fileName).put(blob);

        try {
            await ref;
        } catch (error) {
            console.error(error)
        }

        setUploading(false)
        console.log('image is uploaded')
        setTestImage(null)
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
                console.log(location);
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
    }

    function handleImageUpload() {
        getLocationPrompt();
        launchImageLibrary({
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
        }, setResponse)
        handleImageConfiguration()

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
        navigation.navigate('caption')
        console.log({ selected: selection, finalImage: finalImage() })
        // const ref = storage().ref(`requests/dcim/${selection.fileName}`)
        // const task = ref.putFile(selection.uri)
    }

    return (
        <ScrollView style={styles.screen}>
            <Text style={styles.title} onPress={() => nextScreen('quick pass enabled')}>Upload Image</Text>
            {response?.assets &&
                response?.assets.map((image) => (
                    <View>
                        <View key={image.uri} style={styles.image}>
                            <Image
                                resizeMode="cover"
                                resizeMethod="scale"
                                style={{ width: 200, height: 400 }}
                                source={{ uri: image.uri }}
                            />
                        </View>
                        {/* <Button buttonColor='limegreen' textColor='#ffffff' style={{ padding: 7.5, borderRadius: 10, color: 'white' }} onPress={() => { test(image); test(image.uri) }}>Upload Image To Server</Button> */}
                    </View>

                ))}

            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    handleTakePictures()
                }}>
                    <Text style={styles.button_text}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    handleImageUpload()
                }}>
                    <Text style={styles.button_text} >Upload Photo</Text>
                </TouchableOpacity>
                {isValid
                    ? <TouchableOpacity style={styles.button_alternative} onPress={() => nextScreen(image)}>
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
