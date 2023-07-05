import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {BPO} from '../utils/theme/buttons';
import {colors} from '../utils/theme/colors';

export const OverlayComponent = ({config}) => {
  if (config.length > 0) {
    return (
      <View style={overlay.top}>
        <View style={overlay.top_container}>
          <Text style={overlay.top_container_title}>{config.title}</Text>
          <Text style={overlay.top_container_context}>{config.body}</Text>
          <View style={overlay.top_container_buttons}>
            <Button style={BPO.button_primary} type="contained">
              Ok
            </Button>
          </View>
        </View>
      </View>
    );
  } else {
    return(
      <View></View>
    )
  }
};

export const overlay = StyleSheet.create({
  top: {
    flex: 1,
    zIndex: 100,
    backgroundColor: colors.primary_transparent,
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 25,
  },
  top_container: {
    backgroundColor: colors.white,
    padding: 25,
    borderRadius: 10,
  },
  top_container_title: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  top_container_context: {
    color: colors.black,
    marginVertical: 15,
    fontSize: 16,
  },
  top_container_buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
});
