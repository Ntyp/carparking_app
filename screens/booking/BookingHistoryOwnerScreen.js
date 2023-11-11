import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { TextInput, Button, Text, DataTable } from "react-native-paper";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../config";
import { Dropdown } from "react-native-element-dropdown";
import moment from "moment";

const BookingHistoryOwnerScreen = ({ navigation }) => {
  const [place, setPlace] = useState("");
  const [lane, setLane] = useState("");
  const [items, setItems] = useState([]);
  const [user, setUser] = useState();
  const [parkingList, setParkingList] = useState([]);
  const [parking, setParking] = useState("");

  // const showData = async () => {
  //   const userDataString = await AsyncStorage.getItem("_isAccessUser");
  //   if (userDataString) {
  //     const userData = JSON.parse(userDataString);
  //     console.log(userData);
  //     setUser(userData);
  //     axios
  //       .get(`${config.mainAPI}/owner-booking-history/${userData.id}`)
  //       .then(function (response) {
  //         console.log("result =>", response.data.data);
  //         setItems(response.data.data);
  //         // console.log(items);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // };

  const getCarparkingByOwner = async () => {
    const userDataString = await AsyncStorage.getItem("_isAccessUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log('userData',userData);
      axios
        .get(`${config.mainAPI}/getCarparkingByOwner/${userData.username}`)
        .then(function (response) {
          console.log("response", response.data);
          if (response.data && response.data.data) {
            setParkingList(response.data.data);
          } else {
            setParkingList([]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const getParkingHistory = (id) => {
    axios
      .get(`${config.mainAPI}/getParkingHistoryByPlace/${id}`)
      .then(function (response) {
        console.log("response", response.data);
        if (response.data && response.data.data) {
          setItems(response.data.data);
        } else {
          setItems([]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onChangeCarParking = (value) => {
    console.log("value", value);
    setParking(value.carparking_name);
    getParkingHistory(value.carparking_id);
  };

  useEffect(() => {
    // showData();
    getCarparkingByOwner();
  }, []);

  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View>
          <View style={styles.container}>
            <Text style={styles.headingText}>PARKING HISTORY</Text>
            <View style={styles.horizontalLine} />

            <View>
              <Text style={styles.labelText}>Choose a parking lot:</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={parkingList}
                maxHeight={300}
                labelField="carparking_name"
                valueField="carparking_name"
                value={parking}
                onChange={(item) => {
                  onChangeCarParking(item);
                }}
              />
            </View>

            {parking ? (
              <>
                <DataTable style={{ backgroundColor: "#fff" }}>
                  <DataTable.Header>
                    <DataTable.Title>ลำดับ</DataTable.Title>
                    <DataTable.Title>วันที่</DataTable.Title>
                    <DataTable.Title>เวลา</DataTable.Title>
                    <DataTable.Title>ชื่อ</DataTable.Title>
                    <DataTable.Title>ป้ายทะเบียน</DataTable.Title>
                    <DataTable.Title>ยอดเงิน</DataTable.Title>
                  </DataTable.Header>

                  {items &&
                    items.map((item, index) => (
                      <DataTable.Row key={item.booking_id}>
                        <DataTable.Cell>{index + 1}</DataTable.Cell>
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
              </>
            ) : null}
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
  horizontalLine: {
    marginBottom: 15,
    borderBottomColor: "#2f2f2f", // Change the color to your desired color
    borderBottomWidth: 1, // Change the thickness as needed
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
  labelText: {
    marginBottom: 10,
  },
});
