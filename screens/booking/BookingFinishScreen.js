import { StyleSheet, View, ImageBackground } from "react-native";
import { Button, Text } from "react-native-paper";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";

const BookingFinishScreen = ({ navigation, route }) => {
  const [item, setItem] = useState("");
  const handleBack = async () => {
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Icon
          name='checkmark-circle-outline'
          color='#fff'
          size={300}
          style={styles.checkIcon}
        />
        <Text style={styles.labelThank}>Thanks you!</Text>
        <Text style={styles.labelText}>
          You can check booking status from your history booking
        </Text>
        <Button style={styles.button} onPress={handleBack}>
          <Text style={styles.labelButton}>Back to home</Text>
        </Button>
      </View>
    </ImageBackground>
  );
};

export default BookingFinishScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#3ec97c", // set a semi-transparent background color for the container
  },
  container: {
    flex: 1,
    padding: 30,
    alignSelf: "center",
    justifyContent: "center",
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  headingText: {
    alignSelf: "center",
    color: "#333335",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
  },
  bottomText: {
    fontSize: 16,
    fontWeight: "400",
    alignSelf: "center",
    marginTop: 16,
  },
  bottomSpan: {
    fontWeight: "700",
    color: "#80247e",
  },
  inputText: {
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  btnBooking: {
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 20,
    backgroundColor: "#2f2f2f",
  },
  namePlace: { marginBottom: 10 },
  textwarning: {
    alignSelf: "center",
    color: "#dc3545",
    fontWeight: "700",
    marginBottom: 10,
  },
  dropdown: {
    height: 62,
    borderBottomColor: "#333335",
    borderBottomWidth: 0.5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    marginLeft: 10,
    fontSize: 16,
  },
  selectedTextStyle: {
    marginLeft: 10,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  hrLine: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  labelThank: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 30,
    alignSelf: "center",
  },
  labelText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    alignSelf: "center",
    marginTop: 10,
  },
  checkIcon: {
    alignSelf: "center",
  },
  button: {
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 5,
    backgroundColor: "#2f2f2f",
    marginTop: 20,
  },
  labelButton: {
    color: "#fff",
  },
});
