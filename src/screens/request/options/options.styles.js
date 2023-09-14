import { StyleSheet } from 'react-native';
import { colors } from '../../../utils/theme/colors';
import { windowHeight, windowWidth } from '../../../utils/theme/dimensions';

export const styles = StyleSheet.create({
    screen: {
        padding: 20,
        paddingVertical: 40,
        backgroundColor: "white",
        marginBottomBottom: 250
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#004AAD',
        marginBottom: 20
    },
    caution: {
        marginBottom: 20,
        color: '#ff5e00',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    container: {
        marginVertical: 20
    },
    button: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#004AAD',
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 'auto'
    },
    button_text: {
        color: '#000000',
        fontSize: 15
    },
    selected: {

    },
    alternative: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    },
    button_alternative: {
        backgroundColor: '#004AAD',
        borderRadius: 10,
        padding: 15,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20    
    },
    button_alternative_text: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    button_disabled: {
        backgroundColor: '#ADADAD',
        borderRadius: 10,
        padding: 15,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        marginVertical: 24,
        alignItems: 'center',
    },
    multiline: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#004AAD',
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'black'
    },
    icon: {
        height: 20,
        width: 20
    }
})

export const overlay = StyleSheet.create({
    top: {
        flex: 1,
        zIndex: 100,
        backgroundColor: colors.primary_transparent,
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
        height: windowHeight,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        paddingHorizontal: 25
    },
    top_container: {
        backgroundColor: colors.white,
        padding: 25,
        borderRadius: 10,
    },
    top_container_title: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold'
    },
    top_container_context: {
        color: colors.black,
        marginVertical: 15,
        fontSize: 16
    }, 
    top_container_buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15
    }
})