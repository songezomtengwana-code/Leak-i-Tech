import { GoogleSignin } from '@react-native-google-signin/google-signin'

const google_sigin = async () => {
    GoogleSignin.configure({
        webClientId: '',
      });
};

export {google_sigin};
