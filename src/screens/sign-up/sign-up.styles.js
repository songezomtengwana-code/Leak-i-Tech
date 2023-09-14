import React from 'react'
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    cover: {
        backgroundColor: '#ffffff'
    },
    container: {
        padding: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '100%'
    },
    header: {
        fontSize: 30,
        fontWeight: '600',
        color: '#000000',
        marginTop: 30,
        marginBottom: 50
    },
    icon: {
        borderRadius: 0,
        backgroundColor: 'transparent',
        width: 100,
        height: 100
    },
    button: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 10,
        width: 325,
        borderColor: '#c1c1c1',
        marginBottom: 20
    },
    button_text: {
        fontSize: 15,
        color: 'black',
        marginHorizontal: 10,
        color: '#010101'
    },
    button_image: {
        backgroundColor: 'transparent'
    },
    split: {
        marginVertical: 25,
        minWidth: 325,
    },
    split_thread: {
        width: 325,
        alignItems: 'center',
        justifyContent: 'center',
        height: 1,
        borderColor: '#D9D9D9',
        borderBottomWidth: 1
    },
    split_thread_text: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        color: '#D9D9D9',
        fontSize: 18
    },
    form: {
        minWidth: 325,
        flexDirection: 'column',
        marginVertical: 20,
    },
    form_area: {
        flexDirection: 'column',
        gap: 10,
        marginBottom: 10
    },
    form_area_label: {
        color: '#000000',
        fontWeight: '300',
        fontSize: 18,
    },
    form_area_input: {
        padding: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#D9D9D9",
        color: '#000000'
    },
    primary_button: {
        marginTop: 20,
        backgroundColor: '#004AAD',
        
    },
    primary_button_text: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    redirect: {
        textAlign:'center',
        marginTop: 20,
        color: '#010101',
        fontSize: 15
    },
    redirect_prompt: {
        fontWeight: 'bold'
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    }
});