import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  button: {
    width: '50%',
    padding: 12.5,
    flex: 1,
    alignItems: 'center',
    justfyContent: 'center',
  },
  active: {
    backgroundColor: 'blue',
    color: '#ffffff',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    width: '100%'
  },
  active_text: {
    color: 'white'
  }
});
