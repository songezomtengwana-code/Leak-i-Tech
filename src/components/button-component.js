import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {BPO} from '../utils/theme/buttons';
import {Text} from 'react-native';

const ButtonComponent = ({text}) => {
  const handle_post_comment = () => {
    console.log('comment shall be posted');
  };
  return (
    <GestureHandlerRootView>
      <TouchableOpacity
        style={[BPO.button_primary, styles.config]}
        onPress={handle_post_comment}>
        <Text style={BPO.button_primary_text}>{text}</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  config: {
    paddingVertical: 10,
    marginTop: 0,
    paddingHorizontal: 20,
    marginBottom: 0,
  },
});

export default ButtonComponent;
