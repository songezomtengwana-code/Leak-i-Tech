import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function SplashScreen() {
    return (
        <View style={styles.splash}>
            <View style={styles.contianer}>
                {/* <Avatar.Image size={30} source={require('../../images/')} /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})