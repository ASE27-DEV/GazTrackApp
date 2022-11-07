import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window');

export const styles = StyleSheet.create({
    button: {
      backgroundColor: "#bbb",
      paddingVertical: 12,
      marginTop: 16,
      borderRadius: 4,

    },
    buttonText: {
      textAlign: "center",
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    searchContainer: {
      position: "absolute",
      width: "90%",
      backgroundColor: "white",
      shadowColor: "black",
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 4,
      padding: 8,
      borderRadius: 8,
      top: 5,
    },
    input: {
      borderColor: "#888",
      borderWidth: 1,
    }
  });