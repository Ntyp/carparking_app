import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import config from "../../config";

const AdminMangeUserScreen = ({ navigation }) => {
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [nameTh, setNameTh] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [userList, setUserList] = useState([]);

  const fetchUser = async () => {
    const userDataString = await AsyncStorage.getItem("_isAccessUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log(userData);
      setUser(userData);
    }
  };

  const roleList = [
    { label: "User", value: "user" },
    { label: "Owner", value: "owner" },
    { label: "Admin", value: "admin" },
  ];

  const handleUpdate = () => {
    axios
      .post(`${config.mainAPI}/edituser`, {
        username: selectedUser,
        role: role,
      })
      .then(function (response) {
        alert("Update Success");
        navigation.navigate("Home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getUserOnly = () => {
    axios
      .get(`${config.mainAPI}/listUserOnly`)
      .then(function (response) {
        const value = response.data.data;
        console.log('value111',value);
        setUserList(value);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
    getUserOnly();
  }, []);

  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headingText}>UPDATE ROLE</Text>
          <View style={styles.horizontalLine} />

          <View>
            <Text style={styles.labelText}>User:</Text>
            {/* <TextInput
              style={styles.inputText}
              label="Username"
              value={id}
              mode="flat"
              onChangeText={(text) => setId(text)}
            ></TextInput> */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={userList}
              maxHeight={300}
              labelField="user_username"
              valueField="user_username"
              value={selectedUser}
               onChange={(item) => {
                setSelectedUser(item.user_username);
              }}
            />
          </View>
          <View>
            <Text style={styles.labelText}>Role:</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={roleList}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={role}
              onChange={(item) => {
                setRole(item.value);
              }}
            />
          </View>

          <Button style={styles.button} onPress={handleUpdate}>
            <Text style={styles.labelButton}>Update</Text>
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AdminMangeUserScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#3ec97c", // set a semi-transparent background color for the container
  },
  container: {
    padding: 20,
  },
  headingText: {
    color: "#2f2f2f",
    fontWeight: "700",
    fontSize: 28,
    marginBottom: 15,
    alignSelf: "center",
  },
  inputText: {
    marginBottom: 15,
  },
  button: {
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 5,
    backgroundColor: "#2f2f2f",
    marginTop: 20,
    width: "100%",
  },
  labelButton: {
    color: "#fff",
  },
  dropdown: {
    height: 62,
    width: "100%",
    borderBottomColor: "#333335",
    borderBottomWidth: 0.5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: 15,
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
  horizontalLine: {
    marginBottom: 15,
    borderBottomColor: "#2f2f2f", // Change the color to your desired color
    borderBottomWidth: 1, // Change the thickness as needed
  },
  labelText: {
    marginBottom: 10,
  },
});
