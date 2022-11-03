import React from 'react';
import { styles } from './TabOneScreen.style'
import EditScreenInfo from '../../components/EditScreenInfoPage/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../../environments';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATTITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude : 43.57455,
  longitude : 3.83567,
  latitudeDelta: LATTITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      
      <View style={styles.container}>      
        <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_POSITION}/>
        <View style={styles.searchContainer}>
          <Text style={styles.title}>Entrez une destination</Text>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input }}
            placeholder='Search'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: GOOGLE_API_KEY ,
              language: 'en',
            }}
          />
        </View>
      </View>

      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
    
  );
}


