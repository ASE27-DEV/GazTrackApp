import React, { useRef, useState } from "react";
import { styles } from "./TabOneScreen.style";
import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions, TouchableOpacity } from "react-native";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../environments";
import InputAutoComplete from "../../components/InputAutoComplete/InputAutoComplete";
import MapViewDirections from "react-native-maps-directions";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATTITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 43.57455,
  longitude: 3.83567,
  latitudeDelta: LATTITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [origin, setOrigin] = useState<LatLng | null>();
  const [destination, setDestination] = useState<LatLng | null>();
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const mapRef = useRef<MapView>(null);

  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const edgePaddingValue = 100;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (args: any) => {
    if (args) {
      setDistance(args.distance)
      setDuration(args.duration)
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true)
      mapRef.current?.fitToCoordinates([origin, destination], {edgePadding})
    }
  };

  const onPlaceSelected = (
    details: GooglePlaceDetail | null,
    flag: "origin" | "destination"
  ) => {
    const set = flag === "origin" ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_POSITION}
        >
          {/* I check if origin and destination exist and if they do i use it as coordinate */}
          {origin && <Marker coordinate={origin} />}
          {destination && <Marker coordinate={destination} />}
          {showDirections && origin && destination && (
            <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
            />
          )}
        </MapView>

        <View style={styles.searchContainer}>
          <InputAutoComplete
            label="Origin"
            placeholder=""
            onPlaceSelected={(details) => {
              onPlaceSelected(details, "origin");
            }}
          />
          <InputAutoComplete
            label="Destination"
            placeholder=""
            onPlaceSelected={(details) => {
              onPlaceSelected(details, "destination");
            }}
          />
          <TouchableOpacity style={styles.button} onPress={traceRoute}>
            <Text style={styles.buttonText}>Trace the road</Text>
          </TouchableOpacity>

          {distance && duration ? (
          <View>
            <Text>Distance : {distance.toFixed(2)} km</Text>
            <Text>Duration : {Math.ceil(duration)} min</Text>
          </View>) : null}

        </View>
      </View>
    </View>
  );
}
