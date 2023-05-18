import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Button, Avatar, ActivityIndicator } from 'react-native-paper';
import { styles } from './sign-up.styles';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../utils/services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { registerUser } from '../../utils/services/global';

export default function SignUpScreen() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    async function emailAndPassowordSignup(email, password) {
        setIsLoading(true)
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(UC => {
                const user = UC.user;
                console.log({ userEmailAddress: user.email });
                navigation.navigate('setup', { username: fullname });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    Alert.alert('Please enter an un used email');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    Alert.alert('Please enter a valid email.');
                }

                console.error(error);
            });
        setIsLoading(false)
    }

    async function createUser() {
        setDoc(
            doc(db, 'users', email), {
            fullname: fullname,
            email: email,
            tag: fullname
        }
        ).then(() => {
            console.log('new user registered');
        }).catch((err) => {
            console.log({ error: err })
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace('tabs');
            }
        }, []);

        return unsubscribe;
    });

    return (
        <ScrollView style={{ minHeight: '100%' }}>
            <View style={styles.container}>
                <Image style={styles.icon} source={require('../../images/icon.png')} />
                <Text style={styles.header}>Create Account</Text>
                <TouchableOpacity style={styles.button}>
                    <Avatar.Image style={styles.button_image} size={20} source={require('../../images/google.png')} />
                    <Text style={styles.button_text}>Sign up with google</Text>
                </TouchableOpacity>
                <View style={styles.split}>
                    <View style={styles.split_thread}>
                        <Text style={styles.split_thread_text}>Or</Text>
                    </View>
                </View>
                <View style={styles.form}>
                    <View style={styles.form_area}>
                        <Text style={styles.form_area_label}>Fullname</Text>
                        <TextInput style={styles.form_area_input} value={fullname} onChangeText={(text) => setFullname(text)} />
                    </View>
                    <View style={styles.form_area}>
                        <Text style={styles.form_area_label}>Email</Text>
                        <TextInput style={styles.form_area_input} value={email} onChangeText={(text) => setEmail(text)} />
                    </View>
                    <View style={styles.form_area}>
                        <Text style={styles.form_area_label}>Password</Text>
                        <TextInput style={styles.form_area_input} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
                    </View>
                    <TouchableOpacity style={[styles.button, styles.primary_button]} onPress={() => { emailAndPassowordSignup(email, password), registerUser(fullname, email) }}>
                        <Text style={styles.primary_button_text}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={styles.redirect}>
                        Already have an account ? <Text style={styles.redirect_prompt} onPress={() => navigation.navigate('signin')}>Log in</Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}