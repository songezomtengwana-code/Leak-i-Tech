import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    displayer: {
      flexDirection: 'column',
      gap: 20,
      paddingHorizontal: 15,
    },
    card: {
      marginVertical: 10,
      shadowColor: '#171717',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#004AAD'
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 12.5,
      color: '#004AAD'
    },
    image: {},
    content: {},
    description: {
      marginBottom: 10,
      fontSize: 18,
      color: '#171717',
    },
    location: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      fontWeight: 'bold',
      color: 'grey'
    },
    avatar: {
      height: 20, width: 20
    },
    username: {
      color: 'black'
    }
  })