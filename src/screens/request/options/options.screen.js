import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { styles } from './options.styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../../../redux/slices/request.slice';
import { addCategory } from '../../../redux/slices/category.slice';
import { set_category } from '../../../redux/actions/category_actions';
import { Button } from 'react-native-paper';

export function OptionsScreen() {
    const categories = [
        {
            categoryId: '2e-0d923e-d932-ed-23r',
            name: 'Water and Sanitation',
            key: 'was'
        },
        {
            categoryId: '3e-0d923e-d932-ed-23r',
            name: 'Electricity',
            key: 'ele'
        },
        {
            categoryId: '4e-0d923e-d932-ed-23r',
            name: 'Transport',
            key: 'tra'
        }
    ]

    const [category, setCategory] = useState(null);
    const dispatch = useDispatch();
    const option = useSelector(state=>state.category)

    const navigation = useNavigation();

    function nextScreen(selection, name) {
        try {
            setCategory(selection)
            navigation.navigate('category', { key: selection, name: name })
            console.log({ selected: selection })
        } catch (e) {
            console.log(e);
            Alert.alert('Sorry, there was an error encountered');
        }
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Select Category</Text>
            <View style={styles.container}>
                {categories.map((category) => {
                    return (
                        <TouchableOpacity style={styles.button} key={category.categoryId} onPress={() => { nextScreen(category.key, category.name) }}>
                            <Text style={styles.button_text}>{category.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
