import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import { firebaseConfig } from './firebase';

let _address;

export function getLocationPrompt() {
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60000,
  })
    .then(location => {
      src = location;
      console.log({src: src});
    })
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    });
}

const reverse_geocoder = src => {
  Geocoder.init(firebaseConfig.apiKey, {language: 'en'});

  if (src !== null || undefined) {
    console.log('reverse geocoding has started');
    Geocoder.from(src.latitude, src.longitude)
      .then(json => {
        var addressComponent = json.results[0].address_components[0];
        console.log(addressComponent);
        _address = addressComponent;
      })
      .catch(error => console.warn(error));
    console.log('reverse geocoding has ended');
  } else {
    console.log('error was recorded');
  }
};

export { reverse_geocoder }