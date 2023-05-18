import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FabComponent } from '../../../components/fab/fab-component';
import { styles } from './options.styles'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';

export function CategoryScreen({ route }) {

    const { key } = route.params;

    const [selection, setSelection] = useState([])

    function handleCatergoryOptions() {

        switch (key) {
            case 'was':
                setSelection(water)
                break;
            case 'ele':
                setSelection(electricity)
                break;
            case 'tra':
                setSelection(transport)
                break;
            default:
                break;
        }
    }

    const water = [
        {
            categoryId: '2d-0d923e-d932-ed-23r',
            name: 'Blocked Drains',
        },
        {
            categoryId: '3d-0d923e-d932-ed-23r',
            name: 'Water Leakage',
        },
        {
            categoryId: '4e-0d923e-d932-ed-23r',
            name: 'Blocked Toilets',
        }
    ]

    const electricity = [
        {
            categoryId: '2p-0d923e-d932-ed-23r',
            name: 'Power Surges',
        },
        {
            categoryId: '3p-0d923e-d932-ed-23r',
            name: 'Stolen Power Cables',
        },
        {
            categoryId: '4p-0d923e-d932-ed-23r',
            name: 'Loadshedding',
        }
    ];

    const transport = [
        {
            categoryId: '2q-0d923e-d932-ed-23r',
            name: 'Piensalo',
        },
        {
            categoryId: '3q-0d923e-d932-ed-23r',
            name: 'Piensalo',
        },
        {
            categoryId: '4q-0d923e-d932-ed-23r',
            name: 'Piensalo',
        }
    ]

    const navigation = useNavigation();
    const category = useSelector((state) => state.requests);
    console.log(category)
    function nextScreen(selection) {
        try {
            navigation.navigate('upload')
            console.log({ selected: selection })
        } catch (error) {
            console.log({ response: error })
        }
    }

    useEffect(() => {
        handleCatergoryOptions()
    }, [])

    return (
        <ScrollView style={styles.screen}>
            <Text style={styles.title}>Select Category Option</Text>
            <View style={styles.container}>
                {selection.map((category) => {
                    return (
                        <TouchableOpacity style={styles.button} key={category.categoryId} onPress={() => nextScreen(category.name)}>
                            <Text style={styles.button_text}>{category.name}</Text>
                        </TouchableOpacity>
                    );
                })}
                <Text style={styles.alternative}>Can't find category ?</Text>
                <TouchableOpacity style={styles.button_alternative}>
                    <Text style={styles.button_alternative_text}>Add New Category</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
