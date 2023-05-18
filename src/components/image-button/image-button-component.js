import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

export const ImageButtonComponent = ({ image, text }) => {
    return (
        <TouchableOpacity style={styles.button}>
            <Avatar.Image style={styles.image} source={require(`${image}`)} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {

    },
    image: {

    },
    text: {

    }
})