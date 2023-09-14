import { StyleSheet } from "react-native";
import { colors } from "../../utils/theme/colors";

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
        fontSize: 20,
        fontWeight: "bold",
        color: colors.black
    },
    out: {
        padding: 10,
        backgroundColor: colors.soft_grey,
        flexDirection: 'row',
        gap: 10,
        alignItems:"center",
        justifyContent: "center",
        borderRadius: 50,
        height: 45,
        width: 45
    },
    out_text: {
        fontSize: 15,
        color: colors.white
    },
    options: {
        flexDirection: "row",
        gap: 15,
        marginLeft: 'auto'
    }
})