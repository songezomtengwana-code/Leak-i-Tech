import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {_user, get_store_user} from '../../../utils/services/global';
import {ActivityIndicator} from 'react-native-paper';
import InfoCircleIcon from 'react-native-bootstrap-icons/icons/info-circle';
import {colors} from '../../../utils/theme/colors';
import InfoCircle from 'react-native-bootstrap-icons/icons/info-circle';

export default function NotificationScreen() {
  const navigation = useNavigation();
  const [expand, setExpand] = useState(false);
  const [notification, setnotification] = useState(undefined);

  function toggleExpander() {
    const invert = !expand;
    setExpand(invert);
  }

  useEffect(() => {
    get_store_user();
    setnotification(_user.notifications);
    if (_user == null || undefined) {
      get_store_user();
    } else {
      setnotification(_user.notifications);
    }
  }, []);

  if (notification !== undefined) {
    return (
      <View style={{minHeight: '100%', backgroundColor: '#ffffff'}}>
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity>
            <InfoCircleIcon fill={colors.white} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{marginBottom: 100}}>
          <View styles={styles.container}>
            {notification?.map(res => {
              return (
                <View style={styles.column} key={res.id}>
                  {res.readStatus !== false ? (
                    <TouchableOpacity
                      style={[styles.block, styles.active]}
                      onPress={() => toggleExpander()}>
                      <Text style={styles.sender}>{res.body.sender}</Text>
                      {expand ? (
                        <Text
                          style={styles.body}
                          ellipsizeMode="tail"
                          numberOfLines={2}>
                          {res.body.content}
                        </Text>
                      ) : (
                        <Text style={styles.body}>{res.body.content}</Text>
                      )}
                      <Text style={styles.date}>{res.sentOn}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.block, styles.inactive]}
                      key={res.id}
                      onPress={() => toggleExpander()}>
                      <Text style={styles.sender}>{res.body.sender}</Text>
                      {expand ? (
                        <Text
                          style={styles.body}
                          ellipsizeMode="tail"
                          numberOfLines={2}>
                          {res.body.content}
                        </Text>
                      ) : (
                        <Text style={styles.body}>{res.body.content}</Text>
                      )}
                      <Text style={styles.date}>{res.sentOn.substring(0,21)}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{minHeight: '100%', backgroundColor: '#ffffff'}}>
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity>
            <InfoCircle  fill={colors.primary}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={{marginBottom: 100}}>
          <View styles={styles.container}>
            <View
              style={{
                marginVertical: 50,
                textAlign: 'center',
                height: '100%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="small" color="#004aad" />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'black',
                  marginVertical: 10,
                }}>
                Loading{' '}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#004aad',
    paddingBottom: 25,
    paddingHorizontal: 20,
    paddingTop: 35,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  gear: {
    height: 25,
    width: 25,
  },
  empty: {
    minHeight: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  empty_text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#5e5e5e',
  },
  column: {},
  block: {
    color: '#000000',
    padding: 20,
  },
  sender: {
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18,
  },
  body: {
    width: 350,
    color: '#000000',
    fontSize: 15,
    marginBottom: 10,
  },
  inactive: {
    backgroundColor: 'white',
    borderBottomColor: '#ededed',
    borderBottomWidth: 2,
  },
  date: {
    color: 'grey',
  },
});
