import { v4 as uuid } from 'uuid';
import storage from '@react-native-firebase/storage';

const reference = storage().ref(`requests/request-${uuid}.png`);