import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { TextInput, Button, Text, DataTable } from "react-native-paper";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookingHistoryOwnerScreen = ({ navigation }) => {
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
        .get(`http://10.0.2.2:6969/api/owner-booking-history/${userData.id}`)
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
      <ScrollView>
        <View>
          <Text style={styles.headingText}>จัดการลานจอด</Text>
          <View style={styles.container}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>วันที่</DataTable.Title>
                <DataTable.Title>เวลา</DataTable.Title>
                <DataTable.Title>ชื่อ</DataTable.Title>
                <DataTable.Title>ป้ายทะเบียน</DataTable.Title>
                <DataTable.Title>ยอดเงิน</DataTable.Title>
              </DataTable.Header>

              {items &&
                items.map((item) => (
                  <DataTable.Row key={item.booking_id}>
                    <DataTable.Cell>{item.booking_date}</DataTable.Cell>
                    <DataTable.Cell>{item.booking_time_in}</DataTable.Cell>
                    <DataTable.Cell>{item.booking_name}</DataTable.Cell>
                    <DataTable.Cell>{item.booking_plate}</DataTable.Cell>
                    <DataTable.Cell>{item.booking_price}</DataTable.Cell>
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
      </ScrollView>
    </ImageBackground>
  );
};

export default BookingHistoryOwnerScreen;

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
