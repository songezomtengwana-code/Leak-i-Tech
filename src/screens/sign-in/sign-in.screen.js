import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Switch, Alert } from 'react-native';
import { Button, Avatar, Checkbox } from 'react-native-paper';
import { styles } from '../sign-up/sign-up.styles'; 
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../utils/services/firebase';
// import { emailPassowordLogin } from '../../utils/services/global';


export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const navigation = useNavigation();

    async function emailPassowordLogin(email, password) {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                navigation.navigate('tabs');
                console.log({
                    userEmail: user.email,
                    $date: Date.now(),
                });
            }).catch((error) => Alert.alert(error.message));
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
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.icon} source={require('../../images/icon.png')} />
                <Text style={styles.header}>Log In</Text>
                <TouchableOpacity style={styles.button} onPress={() =>  navigation.navigate('tabs') }>
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
                        <Text style={styles.form_area_label}>Email</Text>
                        <TextInput style={styles.form_area_input} value={email} onChangeText={(text) => setEmail(text)} />
                    </View>
                    <View style={styles.form_area}>
                        <Text style={styles.form_area_label}>Password</Text>
                        <TextInput style={styles.form_area_input} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={styles.option}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isEnabled ? '#004AAD' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                            <Text style={{ marginHorizontal: 10, fontWeight: '300', color: '#0e0e0e', fontSize: 14 }}>Remeber Me</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold', color: '#000000', textDecorationLine: 'underline' }}>Forgot Password</Text>
                    </View>
                    <TouchableOpacity style={[styles.button, styles.primary_button]} onPress={() => emailPassowordLogin(email, password)}>
                        <Text style={styles.primary_button_text}>Sign In</Text>
                    </TouchableOpacity>
                    <Text style={styles.redirect}>
                        Don't have an account ? <Text style={styles.redirect_prompt} onPress={() => { navigation.navigate('signup') }}>Sign up</Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}