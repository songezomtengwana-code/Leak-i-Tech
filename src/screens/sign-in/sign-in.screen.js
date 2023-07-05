import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import {Button, Avatar, Checkbox, ActivityIndicator} from 'react-native-paper';
import {styles} from '../sign-up/sign-up.styles';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../../utils/services/firebase';
import {google_sigin} from '../../utils/services/authentication-service';
import {colors} from '../../utils/theme/colors';
import {windowHeight} from '../../utils/theme/dimensions';
import {environment} from '../../utils/environment';
import GoogleIcon from 'react-native-bootstrap-icons/icons/google';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigation = useNavigation();

  async function emailPassowordLogin(email, password) {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        setLoading(true);
        const user = userCredentials.user;

        if (user.emailVerified) {
          navigation.navigate('tabs');
        } else {
          Alert.alert(
            'Account Not Activated',
            'Please verify your account by clicking on the link sent to your email account',
          );
          setLoading(false)
        }
        console.log({
          userEmail: user.email,
          $date: Date.now(),
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Alert.alert('Please enter an un used email');
          setEmail(undefined);
          setPassword(undefined);
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Alert.alert('Please enter a valid email.');
          setEmail(undefined);
        }

        if (error.code === 'auth/user-not-found') {
          console.log('That email address is invalid!');
          Alert.alert(
            'Incorrrect Password',
            'The password you entered is incorrect',
          );
          setPassword(undefined);
        }

        if (error.code === 'auth/user-not-found') {
          console.log('That email address is invalid!');
          Alert.alert('Not Found', 'The user email is not a valid');
          setPassword(undefined);
        }

        if (error.code === 'auth/network-request-failed') {
          console.log('Unable to connect with the database!');
          Alert.alert('Network Erorr', 'Please check your internet connection');
          setPassword(undefined);
        }

        setLoading(false);
        setLoading(false);
        setLoading(false);
        console.error(error);
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user.emailVerified === true) {
        console.log(user.emailVerified)
        navigation.replace('tabs');
      }
    }, []);
    return unsubscribe;
  });

  return (
    <ScrollView style={styles.cover}>
      {loading ? (
        <View
          style={{
            flex: 1,
            zIndex: 100,
            backgroundColor: colors.primary_transparent,
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            height: windowHeight,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            paddingHorizontal: 25,
          }}>
          <ActivityIndicator color="#FFFFFF" size="large"></ActivityIndicator>
          <Text style={{color: '#FFF', fontWeight: 'bold', marginTop: 15}}>
            Logging in ...
          </Text>
        </View>
      ) : (
        <View></View>
      )}
      <View style={styles.container}>
        <Image style={styles.icon} source={{uri: environment.logo}} />
        <Text style={styles.header}>Log In</Text>
        <TouchableOpacity style={styles.button} onPress={google_sigin}>
          <GoogleIcon fill={colors.primary} />
          <Text style={styles.button_text}>Sign in with google</Text>
        </TouchableOpacity>
        <View style={styles.split}>
          <View style={styles.split_thread}>
            <Text style={styles.split_thread_text}>Or</Text>
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.form_area}>
            <Text style={styles.form_area_label}>Email</Text>
            <TextInput
              style={styles.form_area_input}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.form_area}>
            <Text style={styles.form_area_label}>Password</Text>
            <TextInput
              style={styles.form_area_input}
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={styles.option}>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#004AAD' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontWeight: '300',
                  color: '#0e0e0e',
                  fontSize: 14,
                }}>
                Remeber Me
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('forgot-password')}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#000000',
                  textDecorationLine: 'underline',
                }}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, styles.primary_button]}
            onPress={() => emailPassowordLogin(email, password)}>
            <Text style={styles.primary_button_text}>Sign In</Text>
          </TouchableOpacity>
          <Text style={styles.redirect}>
            Don't have an account ?{' '}
            <Text
              style={styles.redirect_prompt}
              onPress={() => {
                navigation.navigate('signup');
              }}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
