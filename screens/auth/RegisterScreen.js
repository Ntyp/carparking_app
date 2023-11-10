import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import config from "../../config";
const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const response = await fetch(`${config.mainAPI}/register`, {
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
    if (data.status) {
      alert("Successfully Register");
      navigation.navigate("Login");
    } else {
      alert("Register Failed");
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.headingImg}
        source={require("../../components/images/register.png")}
      />
      <Text style={styles.headingText}>Register</Text>
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

      <Button style={styles.btnLogin} mode='contained' onPress={handleRegister}>
        Sign Up
      </Button>

      <Text style={styles.bottomText}>
        Have an account?
        <Text
          onPress={() => navigation.navigate("Login")}
          style={styles.bottomSpan}
        >
          Login Now
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#3ec97c",
  },
  headingImg: {
    width: "100%",
    height: 280,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 15,
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
