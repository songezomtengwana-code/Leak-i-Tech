import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems:"center",
        gap: 15
    },
    icon: {
        height: 30,
        width: 30
    },
    text:{
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: '#000000'
    },
    out: {
        padding: 10,
        backgroundColor: '#ededed',
        flexDirection: 'row',
        gap: 10,
        borderRadius: 50,
        marginLeft: 'auto'
    },
    out_text: {
        fontSize: 15,
        color: '#ffffff'
    }
})