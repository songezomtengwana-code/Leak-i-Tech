import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Avatar} from 'react-native-paper';
import {styles} from './header.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {auth} from '../../utils/services/firebase';
import {useNavigation} from '@react-navigation/native';
import { colors } from '../../utils/theme/colors';

// icons
import SearchIcon from 'react-native-bootstrap-icons/icons/search'
import PersonFillIcon from 'react-native-bootstrap-icons/icons/person-fill'

export const HeaderComponent = ({title}) => {
  const navigation = useNavigation();

  async function signout() {
    auth.signOut().then(() => navigation.navigate('signin'));
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onLongPress={() => {
          navigation.navigate('tests');
        }}>
        <Image source={require('../../images/icon.png')} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity
          style={styles.out}
          onPress={() => navigation.navigate('profile')}>
          <PersonFillIcon fill={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.out}
          onPress={() => navigation.navigate('search')}>
          <SearchIcon scale={1.2} fill={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
