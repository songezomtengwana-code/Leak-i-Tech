import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Button, Avatar, ActivityIndicator } from 'react-native-paper';
import { styles } from './sign-up.styles';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../utils/services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { registerUser } from '../../utils/services/global';
import { updateProfile } from 'firebase/auth';

export default function SignUpScreen() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    async function emailAndPassowordSignup(email, password) {
        setUploading(true);
        setIsLoading(true)
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(UC => {
                const user = UC.user;
                updateProfile(auth.currentUser, {
                    displayName: fullname,
                }).then(() => {
                    console.log(auth.currentUser)
                }).catch((error) => {
                    console.log(error)
                });

                console.log({ email: user.email, fullname: user.displayName })

                navigation.navigate('tabs', { username: fullname });
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
        setIsLoading(false);
        setUploading(false);
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
                {uploading
                    ?
                    <View style={{ minheight: 500, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#004AADa1', flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                        <ActivityIndicator color='#FFFFFF' size='large'></ActivityIndicator>
                        <Text style={{ color: '#FFF', fontWeight: 'bold', marginTop: 15 }}>uploading, please wait ...</Text>
                    </View>
                    :
                    <View></View>
                }
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
                    <TouchableOpacity style={[styles.button, styles.primary_button]} onPress={() => { emailAndPassowordSignup(email, password) }}>
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