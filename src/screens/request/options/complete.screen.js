import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './options.styles';
import { useNavigation } from '@react-navigation/native';

export function CompleteScreen() {

    const navigation = useNavigation();

    function nextScreen(selection) {
        try {
            navigation.navigate('usertab')
            console.log({ selected: selection })
        } catch (error) {
            console.log({ response: error })
        }
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Submission Complete</Text>
            <View style={styles.container}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Image source={require('../../../images/check.png')} style={{ height: 100, width: 100, marginBottom: 20 }} />
                </View>
                <TouchableOpacity style={styles.button_alternative} onPress={() => nextScreen(null)} >
                    <Text style={styles.button_alternative_text} >Return Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
