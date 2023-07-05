import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {styles} from './sign-up.styles';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../../utils/services/firebase';
import {store_user, authenticate_user} from '../../utils/services/global';
import {environment} from '../../utils/environment';
import GoogleIcon from 'react-native-bootstrap-icons/icons/google';
import {colors} from '../../utils/theme/colors';

export default function SignUpScreen() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [uploading, setUploading] = useState(false);

  async function signup() {
    // configure user profile object
    const user_config = {
      fullname: fullname,
      tag: fullname.trim(),
      email_address: email,
      $date: {
        value: `${Date()}`,
      },
      notifications: [
        {
          id: Date.now(),
          body: {
            sender: 'SAMS',
            senderEmail: 'sams.mun.project@gmail.com',
            content: `👋 Hello ${fullname}, And Thank You For Downloading The South African Municipal Services, For Help On How To Use This App Please Click On The Question Mark Icon Above`,
          },
          sentOn: Date(),
          readStatus: false,
        },
      ],
    };

    if ((fullname.length < 1, email.length < 1, password.length < 1)) {
      return Alert.alert('Cancelled', 'Seems like some fields were not filled');
    } else {
      // creates user profile
      setUploading(true);
      store_user(user_config);
      authenticate_user(email, password, fullname);
      setUploading(false);
      navigation.navigate('signin');
    }
  }

  return (
    <ScrollView style={{height: '100%', backgroundColor: 'white'}}>
      {uploading ? (
        <View
          style={{
            height: '100%',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#004AADa1',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}>
          <ActivityIndicator color="#FFFFFF" size="large"></ActivityIndicator>
          <Text style={{color: '#FFF', fontWeight: 'bold', marginTop: 15}}>
            Signing Up ...
          </Text>
        </View>
      ) : (
        <View></View>
      )}
      <View style={styles.container}>
        <Image style={styles.icon} source={{uri: environment.logo}} />
        <Text style={styles.header}>Create Account</Text>
        <TouchableOpacity style={styles.button}>
          <GoogleIcon fill={colors.primary} />
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
            <TextInput
              style={styles.form_area_input}
              value={fullname}
              onChangeText={text => setFullname(text)}
            />
          </View>
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
          <TouchableOpacity
            style={[styles.button, styles.primary_button]}
            onPress={() => {
              signup();
            }}>
            <Text style={styles.primary_button_text}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.redirect}>
            Already have an account ?{' '}
            <Text
              style={styles.redirect_prompt}
              onPress={() => navigation.navigate('signin')}>
              Log in
            </Text>
          </Text>

          {/* <View style={{ marginVertical: 20 }}
                    >
                        <Button textColor='#fff' buttonColor='#0f0f' onLongPress={() => { create_user() }}> TEST BUTTON 01 </Button>
                    </View> */}
        </View>
      </View>
    </ScrollView>
  );
}
