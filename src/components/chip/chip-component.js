import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../utils/theme/colors';
import {windowHeight, windowWidth} from '../../utils/theme/dimensions';
import { chip_state_handler } from '../../utils/services/chips-service';

export const ChipComponent = ({config}) => {
  const [state, setState] = useState([]);
  useEffect(() => {
    setState(config);
  });

  return (
    <ScrollView
      style={{
        backgroundColor: colors.white,
        minHeight: windowHeight,
        marginVertical: 10,
      }}>
      <View style={styles.container}>
        {state.map(item => {
          return (
            <TouchableOpacity style={styles.chip} onPress={chip_state_handler(item.name)}>
              <Text style={styles.chip_text}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2.5,
    flexDirection: 'row',
    gap: 15,
    width: windowWidth,
    backgroundColor: colors.white,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 17.5,
    color: colors.black,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    minWidth: 25,
    maxWidth: 100,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chip_text: {
    color: colors.primary,
    fontWeight: '500'
  }
});
