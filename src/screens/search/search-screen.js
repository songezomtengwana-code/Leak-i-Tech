import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {colors} from '../../utils/theme/colors';
import {ChipComponent} from '../../components/chip/chip-component';
import {text} from '../../utils/theme/text';

const SearchScreen = () => {
  const [results, setResults] = useState([]);
  const [type, setType] = useState(null);
  const chips = [
    {
      key: '20-3ede3-42r4-2re30',
      name: 'requests',
    },
    {
      key: '20-3ede3-42r4-2re24',
      name: 'users',
    },
  ];

  const handle_type_configuration = () => {
    console.log('hello world');
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput style={styles.search_bar} placeholder="Search Here" />
      </View>
      <View style={styles.main}>
        <View style={styles.chips}>
          <Text style={[text.body, {fontWeight: '500', color: colors.black}]}>
            Search Type
          </Text>
          <ChipComponent config={chips} />
        </View>
        <View style={styles.recents}>
          <Text style={styles.recent_header}>Recent</Text>
        </View>
        {results?.length > 0 ? (
          <View>
            <Text style={[text.body, {fontWeight: '500', color: colors.black}]}>
              Top
            </Text>
          </View>
        ) : (
          <View>
            <Text style={[text.body, {fontWeight: '500', color: colors.black}]}>
              Bottom
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: colors.white,
  },
  main: {
    padding: 20,
    paddingVertical: 35,
    backgroundColor: colors.white,
  },
  search_bar: {
    padding: 20,
    color: colors.black,
    borderBottomColor: colors.primary,
    borderBottomWidth: 0.5,
  },
});

export default SearchScreen;
