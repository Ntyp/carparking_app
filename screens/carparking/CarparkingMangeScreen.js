import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Switch,
} from "react-native";
import { TextInput, Button, Text, DataTable } from "react-native-paper";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../config";
import { Dropdown } from "react-native-element-dropdown";

const CarparkingMangeScreen = ({ navigation }) => {
  const [place, setPlace] = useState("");
  const [lane, setLane] = useState("");
  const [items, setItems] = useState([]);
  const [parkingList, setParkingList] = useState([]);
  const [laneList, setLaneList] = useState([]);
  const [parking, setParking] = useState("");
  const [user, setUser] = useState();
  const [openParking, setOpenParking] = useState(false);
  const [data, setData] = useState([]);

  // const showData = async () => {
  //   const userDataString = await AsyncStorage.getItem("_isAccessUser");
  //   if (userDataString) {
  //     const userData = JSON.parse(userDataString);
  //     console.log(userData);
  //     setUser(userData);

  //     axios
  //       .get(`http://10.0.2.2:6969/api/owner-status-carparking/${userData.id}`)
  //       .then(function (response) {
  //         console.log("result =>", response);
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
      axios
        .get(`${config.mainAPI}/getCarparkingByOwner/${userData.username}`)
        .then(function (response) {
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

  const updateLaneStatus = (id, index, value) => {
    const payload = {
      id: id,
      lane: index,
      value: value,
    };
    axios
      .post(`${config.mainAPI}/updateLaneStatus`, payload)
      .then(function (response) {
        getParkingInfo(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getParkingInfo = async (id) => {
    axios
      .get(`${config.mainAPI}/getParkingInfo/${id}`)
      .then(function (response) {
        console.log("response info", response.data);
        if (response.data && response.data.data) {
          setOpenParking(
            response.data.data[0].carparking_status == "Open" ? true : false
          );
          setItems(response.data.data);
        } else {
          setItems([]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const toggleSwitch = (value) => {
    setOpenParking(value);
    const payload = {
      id: data.carparking_id,
      value: value,
    };
    console.log("payload", payload);
    axios
      .post(`${config.mainAPI}/updateCarparkingStatus`, payload)
      .then(function (response) {
        getParkingInfo(data.carparking_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onChangeCarParking = (value) => {
    setParking(value.carparking_name);
    // getParkingLaneStatus(value.carparking_name);
    console.log("value111", value);
    getParkingInfo(value.carparking_id);
    setData(value);
  };

  useEffect(() => {
    // showData();
    getCarparkingByOwner();
    // getParkingInfo();
  }, []);

  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View>
          <Text style={styles.headingText}>Manage Parking</Text>

          <View style={styles.container}>
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

            {/* เปิดปิดลานจอด */}
            {parking ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  <Text style={styles.labelText}>Status parking:</Text>
                  <Switch
                    style={{ marginLeft: 10 }}
                    thumbColor={openParking ? "white" : ""}
                    onValueChange={toggleSwitch}
                    value={openParking}
                  />
                </View>
                <View style={{ backgroundColor: "#fff", marginBottom: 15 }}>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>เลน</DataTable.Title>
                      <DataTable.Title numeric>สถานะ</DataTable.Title>
                      <DataTable.Title numeric>เปิด/ปิด</DataTable.Title>
                    </DataTable.Header>

                    {items &&
                      items.map((item, index) => (
                        <DataTable.Row key={item.lane_id}>
                          <DataTable.Cell>{index + 1}</DataTable.Cell>
                          <DataTable.Cell numeric>
                            {item.status == 0 ? "ว่าง" : "ไม่ว่าง"}
                          </DataTable.Cell>
                          <DataTable.Cell numeric>
                            <Switch
                              value={item.status_open == 0}
                              onValueChange={(newValue) => {
                                // Toggle the status_open (0 to 1 or 1 to 0) based on newValue
                                const updatedItems = [...items];
                                updatedItems[index].status_open = newValue
                                  ? 0
                                  : 1;
                                console.log("updatedItems", updatedItems);
                                setItems(updatedItems); // Update the state with the new data
                                updateLaneStatus(
                                  item.carparking_id,
                                  index + 1,
                                  newValue
                                );
                              }}
                            />
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
              </>
            ) : null}

            {/* <View>
            <Button style={styles.button}>
              <Text style={styles.labelButton}>Parking</Text>
            </Button>
          </View> */}

            {/* เปิดปิดลานจอด,เปิดปิดเลน */}

            {/* <DataTable>
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
          </DataTable> */}
          </View>
        </View>
      </ScrollView>
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
    padding: 20,
    // backgroundColor: "#fff", // set a semi-transparent background color for the container
  },
  headingText: {
    color: "#2f2f2f",
    fontWeight: "700",
    fontSize: 28,
    marginBottom: 15,
    marginTop: 10,
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
