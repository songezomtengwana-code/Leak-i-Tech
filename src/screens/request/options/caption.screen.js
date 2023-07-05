import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {overlay, styles} from './options.styles';
import {useNavigation} from '@react-navigation/native';
import {_image, get_storage_image} from '../../../utils/services/global';
import {colors} from '../../../utils/theme/colors';

export function CaptionScreen({route}) {
  const [comment, setComment] = useState('');
  const [point, setpoint] = useState('');
  const [pop, setPop] = useState(false);

  const {key, name, type, localsrc, localname, location, directLocation} =
    route.params;

  const navigation = useNavigation();

  function nextScreen(selection) {
    if (comment.length < 10) {
      setPop(true);
    } else if (comment.length > 100) {
      setPop(true);
    } else {
      navigation.navigate('submit', {
        key: key,
        name: name,
        sub: type,
        image: localsrc,
        image_name: localname,
        description: selection,
        location: location,
        directLocation: directLocation,
        download_image: _image,
        point: point,
      });
    }
  }

  const overlay_props = {
    title: 'Caption Length',
    body: 'Captions length should be longer that 20 less than 100 charactersor to better describe the situation thats being reported',
    info: `Current length: ${comment.length}`
  };

  useEffect(() => {
    // get_storage_image(localname)
    if (_image === null || _image === undefined) {
      get_storage_image(localname);
    }

    if(comment.length > 100) {
      setPop(true)
    }
  }, []);

  return (
    <>
      <ScrollView style={{padding: 20, backgroundColor: colors.white}}>
        <Text style={styles.title}>Comment</Text>
        <View style={styles.container}>
          <Text style={{ textAlign: 'right', marginVertical: 5 }}>{comment.length} / 100</Text>
          <TextInput
            value={comment}
            onChangeText={text => setComment(text)}
            underlineColor={colors.primary}
            activeUnderlineColor={colors.primary}
            label="Type Additional Information Here"
            multiline={true}
            numberOfLines={10}
            style={{marginVertical: 10, backgroundColor: colors.soft_grey}}
          />
          <TextInput
            value={point}
            onChangeText={text => setpoint(text)}
            underlineColor={colors.primary}
            activeUnderlineColor={colors.primary}
            label="Please Enter Location"
            style={{marginVertical: 10, backgroundColor: colors.soft_grey}}
          />
          <TouchableOpacity
            style={styles.button_alternative}
            onPress={() => nextScreen(comment)}>
            <Text style={styles.button_alternative_text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {pop ? (
        <View style={overlay.top}>
          <View style={overlay.top_container}>
            <Text style={overlay.top_container_title}>
              {overlay_props.title}
            </Text>
            <Text style={overlay.top_container_context}>
              {overlay_props.body}
            </Text>
            <View style={overlay.top_container_buttons}>
              <Button
                textColor={colors.primary}
                type="contained"
                onPress={() => {
                  setPop(false);
                }}>
                Ok
              </Button>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
