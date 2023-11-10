import { StyleSheet, Text, View, ImageBackground, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import axios from "axios";
import config from "../../config";

const BookingHistoryDetailScreen = ({ navigation, route }) => {
  const [items, setItems] = useState({});
  const { id } = route.params;
  const [lane, setLane] = useState();
  const [user, setUser] = useState();

  const handleBack = () => {
    navigation.navigate("Home");
  };

  // const fetchData = async () => {
  //   await fetch(`${config.mainAPI}/booking/${id}`)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log("result =>", result.data[0]);
  //       setItems(result.data[0]);
  //     });
  // };

  const fetchData = () => {
    axios
      .get(`${config.mainAPI}/booking/${id}`)
      .then(function (response) {
        console.log("response", response.data.data[0]);
        setItems(response.data.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchUser = async () => {
    const userDataString = await AsyncStorage.getItem("_isAccessUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log(userData);
      setUser(userData);
    }
  };

  const handleOut = async () => {
    const userDataString = await AsyncStorage.getItem("_isAccessUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log(userData);
      setUser(userData);
    }
    // navigation.navigate("Home");
    const id = items.booking_id;
    const place = items.booking_place_id;
    const user = JSON.parse(userDataString);
    axios
      .post(`${config.mainAPI}/updateStatusGoOutCarparking`, {
        id: id, //booking_id
        place: place,
        user:user
      })
      .then(function (response) {
        if (response.data.success) {
          alert("ออกจากที่จอดสำเร็จ");
          navigation.navigate("Home");
        } else {
          alert(
            `ไม่สามารถนำรถออกจากที่จอดกรุณาลองใหม่อีกครั้ง`
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleIn = async () => {
    const userDataString = await AsyncStorage.getItem("_isAccessUser");
    const userData = JSON.parse(userDataString);
    setUser(userData);
    const id = items.booking_id;
    const place = items.booking_place_id;
    const lane = items.booking_lane;
    const user = userData.id;
    axios
      .post(`${config.mainAPI}/updateStatusGoInCarparking`, {
        id: id,
        place: place,
        user: user,
        lane: lane,
      })
      .then(function (response) {
        if (response.data.success) {
          alert("นำรถเข้าจอดสำเร็จ");
          navigation.navigate("Home");
        } else {
          alert(
            `ไม่สามารถนำรถเข้าจอดได้กรุณาลองใหม่อีกครั้ง`
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handelCancel = () => {
    const id = items.booking_id;
    axios
      .post(`${config.mainAPI}/updateCancelBooking`, {
        id: id,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.success) {
          alert("ยกเลิกสำเร็จ");
          navigation.navigate("Home");
        } else {
          alert(`ไม่สามารถยกเลิกได้ (${response.message})`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
    fetchData();
  }, []);

  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.backGround}>
        <Text style={styles.headingText}>Booking History</Text>
      </View>
      <View>
        <View style={styles.cardBottom}>
          <View style={styles.frameCardBottom}>
            <Text style={styles.placeText}>{items.carparking_name}</Text>
            <Text style={styles.statusText}>
              Status: {items.booking_status}
            </Text>
            <View style={styles.timeBox}>
              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <View style={styles.circleBooking}>
                    <Icon
                      style={styles.iconBooking}
                      name="alarm-outline"
                      color="#fff"
                      size={22}
                    />
                  </View>
                  <Text style={styles.labelDetail}>
                    Date: {moment(items.booking_date).format("DD/MM/YYYY")}
                  </Text>
                  <Text style={styles.labelDetail}>
                    Time: {items.booking_time_in}
                  </Text>
                </View>
                {items.booking_goin ? (
                  <View style={styles.row}>
                    <Text style={styles.timeInOut}>
                      เวลาเข้าจอด:{items.booking_goin}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
            <View style={styles.timeBox}>
              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <View style={styles.circleOut}>
                    <Icon
                      style={styles.iconBooking}
                      name="car-outline"
                      color="#fff"
                      size={22}
                    />
                  </View>
                  <Text style={styles.labelDetail}>
                    Date: {moment(items.booking_date).format("DD/MM/YYYY")}
                  </Text>
                  <Text style={styles.labelDetail}>
                    Time: {items.booking_time_out}
                  </Text>
                </View>
                {items.booking_goout ? (
                  <View style={styles.row}>
                    <Text style={styles.timeInOut}>
                      เวลาออก:{items.booking_goout}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
            <View>
              {items.booking_price ? (
                <Text style={styles.moneyText}>{items.booking_price} THB</Text>
              ) : null}

              {items.booking_status == "รอเข้าจอด" ? (
                // <Button style={styles.cancelText} onPress={handelCancel}>
                //   ยกเลิก
                // </Button>

                <Text style={styles.cancelText} onPress={handelCancel}>
                  ยกเลิกการจอง
                </Text>
              ) : null}
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {items.booking_status == "รอเข้าจอด" ? (
            <Button style={styles.button} mode="contained" onPress={handleIn}>
              Parking Now
            </Button>
          ) : null}
          {items.booking_status == "กำลังจอด" ? (
            <Button style={styles.button} mode="contained" onPress={handleOut}>
              Parking Finish
            </Button>
          ) : null}
          <Button style={styles.button} onPress={handleBack}>
            <Text style={styles.labelButton}>Back to home</Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default BookingHistoryDetailScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#3ec97c", // set a semi-transparent background color for the container
  },
  buttonContainer: {
    width: "90%",
    alignSelf: "center",
  },

  headingText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    alignSelf: "center",
    marginTop: 10,
  },
  cardBottom: {
    width: "90%",
    height: "70%",
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  frameCardBottom: {
    padding: 20,
  },
  circleBooking: {
    width: 35,
    height: 35,
    justifyContent: "center",
    borderRadius: 60 / 2,
    backgroundColor: "#3ec97c",
  },
  circleOut: {
    width: 35,
    height: 35,
    justifyContent: "center",
    borderRadius: 60 / 2,
    backgroundColor: "#dc3545",
  },
  iconBooking: {
    alignSelf: "center",
  },
  labelStatusBooking: {
    fontSize: 20,
    fontWeight: "700",
  },
  labelStatusOut: {
    fontSize: 20,
    fontWeight: "700",
  },
  labelDetail: {
    marginTop: 5,
    color: "#9ca4a4",
  },
  textRight: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    alignContent: "flex-end",
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
  placeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2f2f2f",
    alignSelf: "center",
    marginTop: 20,
  },
  timeBox: {
    marginTop: 20,
  },
  moneyText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2f2f2f",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2f2f2f",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  cancelText: {
    marginTop: 30,
    color: "#dc3545",
    alignSelf: "center",
  },
  rowContainer: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeInOut: {
    marginTop: 20,
    alignSelf: "center",
  },
});
