import { StyleSheet, Text, View, ImageBackground, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import axios from "axios";

const BookingHistoryDetailScreen = ({ navigation, route }) => {
  const [items, setItems] = useState({});
  const { id } = route.params;
  const [lane, setLane] = useState();
  const [user, setUser] = useState();

  const handleBack = () => {
    navigation.navigate("Home");
  };

  const fetchData = async () => {
    await fetch(`http://10.0.2.2:6969/api/booking/${id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log("result =>", result.data[0]);
        setItems(result.data[0]);
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
    const lane = items.booking_lane;
    const timeIn = items.booking_time_in;
    const timeOut = moment().format("HH:mm:ss");

    axios
      .post("http://10.0.2.2:6969/api/booking/goout", {
        id: id, //booking_id
        place: place, //booking_place
        lane: lane,
        timeIn: timeIn,
        timeOut: timeOut,
        cancel: user.is_cancel,
      })
      .then(function (response) {
        alert("Go in Success");
        navigation.navigate("Home");
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
    const user = userData.id;
    axios
      .post("http://10.0.2.2:6969/api/booking/goin", {
        id: id, //booking_id
        place: place, //booking_place
        user: user,
      })
      .then(function (response) {
        alert("Go in Success");
        navigation.navigate("Home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handelCancel = () => {
    const id = items.booking_id;
    axios
      .post("http://10.0.2.2:6969/api/booking/cancel", {
        id: id, //booking_id
      })
      .then(function (response) {
        console.log(response);
        if (response.success) {
          alert("ยกเลิกสำเร็จ");
          navigation.navigate("Home");
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
            <Text style={styles.placeText}>{items.booking_place}</Text>
            <View style={styles.timeBox}>
              <View style={styles.circleBooking}>
                <Icon
                  style={styles.iconBooking}
                  name='alarm-outline'
                  color='#fff'
                  size={22}
                />
              </View>
              <Text style={styles.labelDetail}>
                Date: {moment(items.booking_date).format("YYYY-MM-DD")}
              </Text>
              <Text style={styles.labelDetail}>
                Time: {items.booking_time_in}
              </Text>
            </View>
            <View style={styles.timeBox}>
              <View style={styles.circleOut}>
                <Icon
                  style={styles.iconBooking}
                  name='car-outline'
                  color='#fff'
                  size={22}
                />
              </View>
              <Text style={styles.labelDetail}>
                Date: {moment(items.booking_date).format("YYYY-MM-DD")}
              </Text>
              <Text style={styles.labelDetail}>
                Time: {items.booking_time_out}
              </Text>
            </View>
            <View>
              <Text style={styles.statusText}>
                Status: {items.booking_status}
              </Text>
              <Text style={styles.moneyText}>{items.booking_price} THB</Text>
              {items.booking_status == "รอเข้าจอด" ? (
                <Button style={styles.cancelText} onPress={handelCancel}>
                  ยกเลิก
                </Button>
              ) : null}
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {items.booking_status == "รอเข้าจอด" ? (
            <Button style={styles.button} mode='contained' onPress={handleIn}>
              Parking Now
            </Button>
          ) : null}
          {items.booking_status == "กำลังจอด" ? (
            <Button style={styles.button} mode='contained' onPress={handleOut}>
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
  },
  cancelText: {
    color: "#dc3545",
    alignSelf: "center",
  },
});
