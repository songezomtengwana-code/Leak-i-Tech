import React from 'react';
import { View, Text, TouchableOpacity,TextInput } from 'react-native';
import { styles } from './options.styles';
import { useNavigation } from '@react-navigation/native';

export function LocationScreen() {

    const navigation = useNavigation();

    function nextScreen(selection) {
        try {
            navigation.navigate('complete')
            console.log({ selected: selection })
        } catch (error) {
            console.log({ response: error })
        }
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Comment</Text>
            <View style={styles.container}>
                <TextInput multiline={true}  style={styles.multiline} placeholder='Enter text here'/>
                <TouchableOpacity style={styles.button_alternative}>
                    <Text style={styles.button_alternative_text} >Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
