import React, { useState } from "react";
import { StyleSheet, View, Image, Alert, ImageBackground } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const response = await fetch("http://10.0.2.2:6969/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.success) {
      await AsyncStorage.setItem("_accessToken", data.token);
      navigation.navigate("Home");
    } else {
      alert("Login Failed");
    }
  };

  // const value = response.data;
  // if (value.status == "ok") {
  //   localStorage.setItem("user_data", JSON.stringify(value.data[0]));
  //   console.log(value.data[0]);
  //   navigate("/");
  // }
  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
          style={styles.headingImg}
          source={require("../../components/images/3094352.png")}
        />
        <Text style={styles.headingText}>Login</Text>
        <TextInput
          style={styles.inputText}
          label='Username'
          value={username}
          mode='flat'
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.inputText}
          label='Password'
          value={password}
          mode='flat'
          secureTextEntry
          right={<TextInput.Icon icon='eye' />}
          onChangeText={(text) => setPassword(text)}
        />

        <Button style={styles.btnLogin} mode='contained' onPress={handleLogin}>
          Login
        </Button>
        <Text style={styles.bottomText}>
          Don't have an account?
          <Text
            onPress={() => navigation.navigate("Register")}
            style={styles.bottomSpan}
          >
            Create an account
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

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
    marginBottom: 10,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 15,
    fontFamily: "Prompt-Bold",
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
  },
  btnLogin: {
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 20,
    backgroundColor: "#2f2f2f",
  },
});

export default LoginScreen;
