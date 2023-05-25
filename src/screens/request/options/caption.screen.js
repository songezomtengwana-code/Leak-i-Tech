import React, { useState } from 'react';
import { View, Text, TouchableOpacity,TextInput } from 'react-native';
import { styles } from './options.styles';
import { useNavigation } from '@react-navigation/native';

export function CaptionScreen({ route }) {
    const [comment, setComment] = useState('');

    const { key, name, type, localsrc, localname } = route.params;

    const requestPath = {
        key: key,
        category: name,
        sub: type ,
        image: localsrc
    }

    const navigation = useNavigation();

    function nextScreen(selection) {
        try {
            navigation.navigate('submit', { key: key, name: name, sub: type, image: localsrc, localname: localname,description: selection})
            console.log({ key: key, name: name, sub: type, image: localsrc, description: selection});
        } catch (error) {
            console.log({ response: error })
        }
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Comment</Text>
            <View style={styles.container}>
                <TextInput multiline={true} value={comment} onChangeText={(text) => setComment(text)}  style={styles.multiline} placeholder='Enter text here'/>
                <TouchableOpacity style={styles.button_alternative} onPress={() => nextScreen(comment)}>
                    <Text style={styles.button_alternative_text}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
