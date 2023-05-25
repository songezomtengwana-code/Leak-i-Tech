import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FabComponent } from '../../../components/fab/fab-component';
import { styles } from './options.styles'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { Keyframe } from 'react-native-reanimated';

export function CategoryScreen({ route }) {

    const { key, name } = route.params;

    const requestPath = {
        key: key,
        category: name,
    }

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
            name: 'Potholes',
        },
        {
            categoryId: '3q-0d923e-d932-ed-23r',
            name: 'Traffic',
        },
        {
            categoryId: '4q-0d923e-d932-ed-23r',
            name: 'Accidents',
        }
    ]

    const navigation = useNavigation();

    function nextScreen(selection) {
        try {
            navigation.navigate('upload', { key: key, name: name, type: selection })
            console.log({ selected: selection })
        } catch (error) {
            console.log({ response: error })
        }
    }

    useEffect(() => {
        handleCatergoryOptions()
        console.log(requestPath)
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
