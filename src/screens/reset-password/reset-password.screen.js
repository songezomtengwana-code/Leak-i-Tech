import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../utils/services/firebase';
import { reset_password } from '../../utils/services/global';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ResetPassowordScreen() {
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleForgotPassword = () => {
    setIsLoading(true)
    reset_password(email)
    setIsLoading(false)
    setEmail('')
  }

  useEffect(() => {
    setIsLoading(false)
    setIsValid(true)
  }, [])

  return (
    <View style={{ height: '100%' }}>
      {isLoading ?
        <View style={{ minheight: 500, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#004AADa1', flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <ActivityIndicator color='#FFFFFF' size='large'></ActivityIndicator>
          <Text style={{ color: '#FFF', fontWeight: 'bold', marginTop: 15 }}>Sending Email ...</Text>
        </View>
        : <Text></Text>
      }
      <View style={styles.container}>
        <Text style={styles.title}>Forgot your password</Text>
        <Text style={styles.sub}>You are about to reset your SAMS password</Text>
        <View>
          <Text style={styles.label}>Email Address</Text>
          <TextInput style={styles.input} onChangeText={(text) => { setEmail(text) }} inputMode='email' />
          {isValid
            ? <TouchableOpacity style={styles.valid} onPress={handleForgotPassword}>
              <Text style={styles.valid_text}>Send Email</Text>
            </TouchableOpacity>
            : <TouchableOpacity style={styles.invalid} onPress={() => { Alert.alert('Problem', 'please fill in the email slot, aseblief tog') }} >
              <Text style={styles.invalid_text}>Send Email</Text>
            </TouchableOpacity>}
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
    marginHorizontal: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#004AAD',
    marginBottom: 20
  },
  sub: {
    marginBottom: 20,
    color: '#ff5e00',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    padding: 7.5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D9D9D9",
    color: '#000000',
    marginTop: 5,
  },
  label: {
    marginTop: 50,
  },
  valid: {
    backgroundColor: '#004AAD',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  valid_text: {
    color: '#ffffff',
    fontWeight: 'bold'
  },
  invalid: {
    backgroundColor: '#d0d0d0',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  invalid_text: {
    color: 'black'
  }
})