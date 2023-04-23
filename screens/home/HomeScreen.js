import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import Fonts from "../../fonts";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const fetchUser = async () => {
    const accessToken = await AsyncStorage.getItem("_accessToken");
    const response = await fetch("http://10.0.2.2:6969/api/authen", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    const data = await response.json();
    const userData = data.decoded;
    console.log(userData);
    await AsyncStorage.setItem("_isAccessUser", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = async () => {
    const accessToken = await AsyncStorage.getItem("@accessToken");
    AsyncStorage.removeItem("userid");
    setUser({});
    const responses = await fetch("http://10.0.2.2:6969/api/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    setVisible(false);
    navigation.navigate("Login");
  };

  useEffect(() => {
    fetchUser();
  }, [isLoading]);

  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
          style={styles.headingImg}
          source={require("../../components/images/homescreen.png")}
        />
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text style={styles.logoutTopic}>Log Out?</Text>
          <Text style={styles.logoutDetail}>
            When you log out, you cannot continue the transaction. Are you sure
            you want to log out?.
          </Text>
          <Button style={styles.cancelText} onPress={hideModal}>
            Cancel
          </Button>
          <Button style={styles.logoutBtn} onPress={handleLogout}>
            Logout
          </Button>
        </Modal>

        {user.status == "user" ? (
          <>
            <Button
              style={styles.btnStarted}
              mode='contained'
              onPress={() => navigation.navigate("Carparking")}
            >
              Get Started
            </Button>
            <Button
              style={styles.button}
              mode='contained'
              onPress={() => navigation.navigate("History")}
            >
              History Booking
            </Button>
          </>
        ) : null}

        {user.status == "owner" ? (
          <>
            <Button
              style={styles.button}
              mode='contained'
              onPress={() => navigation.navigate("DasboardOwner")}
            >
              Dashboard
            </Button>
            <Button
              style={styles.button}
              mode='contained'
              onPress={() => navigation.navigate("CarparkingMange")}
            >
              Mange Carparking
            </Button>
          </>
        ) : null}

        {user.status == "admin" ? (
          <>
            <Button
              style={styles.button}
              mode='contained'
              onPress={() => navigation.navigate("CarparkingCreate")}
            >
              Create Carparking
            </Button>
            <Button
              style={styles.button}
              mode='contained'
              onPress={() => navigation.navigate("AdminMangeUser")}
            >
              Manage User
            </Button>
          </>
        ) : null}
        <Text style={styles.logoutText} onPress={showModal}>
          Logout
        </Text>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#3ec97c", // set a semi-transparent background color for the container
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    padding: 20,
  },
  headingImg: {
    width: "100%",
    height: 333,
    marginBottom: 30,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 15,
    color: "#2f2f2f",
    textAlign: "center",
  },
  subText: {
    color: "#f0f0f0",
    textAlign: "center",
    marginBottom: 20,
  },
  btnStarted: {
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 5,
    backgroundColor: "#2f2f2f",
    justifyContent: "flex-end",
  },
  button: {
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 5,
    backgroundColor: "#2f2f2f",
    marginTop: 15,
  },
  logoutText: {
    marginTop: 10,
    color: "#fff",
    fontWeight: "700",
    alignSelf: "center",
  },
  cancelText: {
    alignSelf: "center",
    marginTop: 10,
    // color: "#a4a4a4",
    fontWeight: "700",
    backgroundColor: "#a4a4a4",
  },
  logoutBtn: {
    marginTop: 10,
    color: "#fff",
    fontWeight: "700",
    backgroundColor: "#dc3545",
    width: 100,
    height: 40,
    alignSelf: "center",
    alignItems: "center",
  },
  logoutTopic: {
    fontSize: 25,
    fontWeight: "700",
  },
  logoutDetail: {},
});
