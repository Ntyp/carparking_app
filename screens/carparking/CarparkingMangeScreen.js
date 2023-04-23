import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { TextInput, Button, Text, DataTable } from "react-native-paper";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CarparkingMangeScreen = ({ navigation }) => {
  const [place, setPlace] = useState("");
  const [lane, setLane] = useState("");
  const [items, setItems] = useState([]);
  const [user, setUser] = useState();

  const showData = async () => {
    const userDataString = await AsyncStorage.getItem("_isAccessUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log(userData);
      setUser(userData);
      axios
        .get(`http://10.0.2.2:6969/api/owner-status-carparking/${userData.id}`)
        .then(function (response) {
          console.log("result =>", response.data.data);
          setItems(response.data.data);
          // console.log(items);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    showData();
  }, []);

  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <View>
        <Text style={styles.headingText}>จัดการลานจอด</Text>
        <View style={styles.container}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>เลน</DataTable.Title>
              <DataTable.Title numeric>สถานะ</DataTable.Title>
            </DataTable.Header>

            {items &&
              items.map((item) => (
                <DataTable.Row key={item.lane_id}>
                  <DataTable.Cell>{item.lane_id}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {item.status == 0 ? "ว่าง" : "ไม่ว่าง"}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}

            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={(page) => {
                console.log(page);
              }}
            />
          </DataTable>
        </View>
      </View>
    </ImageBackground>
  );
};

export default CarparkingMangeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#3ec97c", // set a semi-transparent background color for the container
  },
  container: {
    // padding: 20,
    backgroundColor: "#fff", // set a semi-transparent background color for the container
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
});
