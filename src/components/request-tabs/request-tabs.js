import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './request-tabs.styles';
import { useNavigation } from '@react-navigation/native';


export const RequestTabUser = () => {
const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.active]}>
        <Text style={[styles.text, styles.active_text]}>My Requests</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('communaltab')}>
        <Text style={styles.text} >Communial Requests</Text>
      </TouchableOpacity>
    </View>
  );
};

export const RequestTabCommunial = () => {
const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('usertab')}>
        <Text style={styles.text}>My Requests</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.active]}>
        <Text style={[styles.text, styles.active_text]}>Communial Requests</Text>
      </TouchableOpacity>
    </View>
  );
};
