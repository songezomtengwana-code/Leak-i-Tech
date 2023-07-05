import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {auth} from '../../utils/services/firebase';
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {BAO, BPO} from '../../utils/theme/buttons';
import {colors} from '../../utils/theme/colors';
import {windowHeight} from '../../utils/theme/dimensions';
import {text} from '../../utils/theme/text';

const CommentScreen = () => {
  const user = auth.currentUser;
  return (
    <GestureHandlerRootView>
      <ScrollView style={styles.container}>
        <View style={styles.container_header}>
          <View style={styles.container_header_image}>
            {auth.photoUrl ? (
              <Image source={{uri: auth.photoUrl}} />
            ) : (
              <Image
                source={require('../../images/person.png')}
                style={{height: 50, width: 50}}
              />
            )}

            <View style={styles.container_header_user}>
              <Text style={styles.container_header_user_name}>
                {user.displayName}
              </Text>
              <Text style={styles.container_header_user_profile}>
                View Profile
              </Text>
            </View>
          </View>

          {/* <Button type="contained" >Post</Button> */}
        </View>
        <View style={styles.container_body}>
          <TextInput
            multiline={true}
            underlineColor={colors.white}
            activeUnderlineColor={colors.primary}
            label="Write Comment Here"
            numberOfLines={10}
            style={{marginVertical: 10, backgroundColor: '#f1f1f1'}}
          />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
    flexDirection: 'column',
    minHeight: windowHeight,
  },
  container_header: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  container_header_image: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: colors.white,
    flexDirection: 'row',
    alignItems:'center',
    gap: 5
  },
  container_header_user_name: {
    fontSize: text.header_one,
    fontWeight: 'bold',
  },
  container_header_user_profile: {
    fontSize: text.fine,
    fontWeight: 100,
    color: colors.black,
  },
});

export default CommentScreen;
