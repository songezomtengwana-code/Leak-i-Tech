import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { TextInput } from 'react-native-paper';
import { styles } from './options.styles';
import { useNavigation } from '@react-navigation/native';
import { _image, get_storage_image } from '../../../utils/services/global';

export function CaptionScreen({ route }) {
    const [comment, setComment] = useState('');

    const { key, name, type, localsrc, localname, location, directLocation } = route.params;

    const requestPath = {
        key: key,
        category: name,
        sub: type,
        image: localsrc
    }

    const navigation = useNavigation();

    function nextScreen(selection) {
        try {
            navigation.navigate('submit', { key: key, name: name, sub: type, image: localsrc, image_name: localname, description: selection, location: location, directLocation: directLocation, download_image: _image })
            console.log(
                {
                    postedon: Date.UTC(),
                    key: key,
                    name: name,
                    sub: type,
                    image: localsrc,
                    description: selection,
                });
        } catch (error) {
            console.log({ response: error })
        }
    }

    useEffect(() => {
        get_storage_image(localname)
        if (_image == undefined) { get_storage_image(localname) } 
    }, [])

    return (
        <View style={styles.screen}>
            <Text style={styles.title} onPress={() => { navigation.navigate('tests', { key: key, name: name, sub: type, image: localsrc, localname: localname, description: comment, location: location, directLocation: directLocation }) }}>Comment</Text>
            <View style={styles.container}>
                <TextInput
                    multiline={true}
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                    underlineColor="#004AAD"
                    activeUnderlineColor="#004AAD"
                    label='Type Additional Information Here'
                    multiline={true}
                    numberOfLines={10}
                    style={{ marginVertical: 10, backgroundColor: '#f1f1f1' }}
                />
                <TouchableOpacity style={styles.button_alternative} onPress={() => nextScreen(comment)}>
                    <Text style={styles.button_alternative_text}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
