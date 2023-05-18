import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FabComponent } from '../../../components/fab/fab-component';
import { styles } from './options.styles';
import { useNavigation } from '@react-navigation/native';
import { catergory, setCategory } from '../../../utils/database/server';
import { useDispatch } from 'react-redux';
import { addRequest } from '../../../redux/slices/request.slice';
import { addCategory } from '../../../redux/slices/category.slice';

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

    const navigation = useNavigation();

    function nextScreen(selection) {
        try {
            setCategory(selection)
            dispatch(addCategory(category));
            setCategory('');
            navigation.navigate('category', { key: selection })
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
                        <TouchableOpacity style={styles.button} key={category.categoryId} onPress={() => { nextScreen(category.key) }}>
                            <Text style={styles.button_text}>{category.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
