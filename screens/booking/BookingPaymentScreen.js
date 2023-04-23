import { StyleSheet, View, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";

const BookingPaymentScreen = ({ navigation, route }) => {
  const [item, setItem] = useState("");
  const handleBack = async () => {
    navigation.navigate("Home");
  };
  const handlePayment = async () => {
    navigation.navigate("BookingPaymentDetail");
  };

  return (
    <View style={styles.backGround}>
      <Image
        style={styles.image}
        source={require("../../components/images/4142132.png")}
      />
      <Text style={styles.labelTopic}>Payment</Text>
      <Text style={styles.label}>778-8-4446-78 (Kasikorn)</Text>
      <Text style={styles.label}>Nuttunyapong Lahungpech</Text>
      <Text style={styles.label}>Money: 30 THB</Text>
      <Text style={styles.labelWarning}>
        *If payment is made, press the payment notification button.
      </Text>
      <Button style={styles.buttonPayment} onPress={handlePayment}>
        <Text style={styles.labelPayment}>Complete payment</Text>
      </Button>
      <Button style={styles.buttonCancel} onPress={handleBack}>
        <Text style={styles.labelPayment}>Back to home</Text>
      </Button>
    </View>
  );
};

export default BookingPaymentScreen;

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: "#3ec97c",
    height: "100%",
  },
  labelTopic: {
    fontWeight: "700",
    fontSize: 30,
    color: "#fff",
    alignSelf: "center",
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 20,
  },
  label: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "center",
    marginTop: 10,
  },
  labelCheck: {
    alignSelf: "center",
  },
  labelWarning: {
    color: "#dc3545",
    fontWeight: "700",
    marginTop: 15,
    alignSelf: "center",
  },
  labelBack: {
    marginTop: 15,
    alignSelf: "center",
  },
  labelPayment: {
    color: "#fff",
    fontSize: 16,
  },
  buttonPayment: {
    width: 200,
    marginTop: 20,
    alignSelf: "center",
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 5,
    backgroundColor: "#2f2f2f",
  },
  buttonCancel: {
    width: 200,
    marginTop: 10,
    alignSelf: "center",
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 5,
    backgroundColor: "#dc3545",
  },
});
