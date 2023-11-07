import { StyleSheet, View, ImageBackground } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  BottomNavigation,
  TextInput,
  Button,
  Text,
  ScrollView,
} from "react-native-paper";
import React, { useState, useEffect } from "react";
import DatePicker from "react-native-date-picker";
import { Dropdown } from "react-native-element-dropdown";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

import config from "../../config";

const BookingScreen = ({ navigation, route }) => {
  const typeData = [
    { label: "Toyota", value: "Toyota" },
    { label: "Honda", value: "Honda" },
    { label: "Isuzu", value: "Isuzu" },
    { label: "Mitsubishi", value: "Mitsubishi" },
    { label: "Ford", value: "Ford" },
    { label: "Nissan", value: "Nissan" },
    { label: "MG", value: "MG" },
    { label: "Mazda", value: "Mazda" },
    { label: "Suzuki", value: "Suzuki" },
    { label: "Mercedes-Benz", value: "Mercedes-Benz" },
    { label: "BMW", value: "BMW" },
  ];

  // Get Carparking
  const [item, setItem] = useState([]);
  const { carparkingPlace } = route.params;
  const { carparkingId } = route.params;
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [plate, setPlate] = useState("");
  const [type, setType] = useState(null);
  const [timeBooking, setTimeBooking] = useState(new Date());
  const [timeBookingOut, setTimeBookingOut] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTimeOut, setSelectedTimeOut] = useState("");
  const [open, setOpen] = useState(false);
  const [openTimeOut, setOpenTimeOut] = useState(false);

  // const handleTimeInPress = () => {
  //   setTimePickerVisible(true);
  // };

  // const handleTimeOutPress = () => {
  //   setTimePickerVisible(true);
  // };

  // const handleTimePickerChange = (newTime) => {
  //   if (isTimePickerVisible) {
  //     if (newTime >= selectedTime) {
  //       setSelectedTime(newTime);
  //     }
  //     setTimePickerVisible(false);
  //   } else {
  //     if (newTime > selectedTime) {
  //       setSelectedTimeOut(newTime);
  //     }
  //   }
  // };

  const getCarParkingDetail = (id) => {
    // axios
    //   .get(`${config.mainAPI}/getCarParkingList`)
    //   .then(function (response) {
    //     setData(response.data.data[0]);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  const handleTimeIn = () => {
    setOpen(true);
  };

  const handleTimeOut = () => {};


  // เปลี่ยนใหม่ให้จองได้ทุกครึ่งชั่วโมง
  // ต้องมาก่อนเวลา 15นาที


  const setTimeIn = (time) => {
    const momentTimeIn = moment(time, "HH:mm");
    const momentSelectedTimeOut = moment(selectedTimeOut, "HH:mm");
    const timeStartParking = "06:00"; // Replace with your actual time
    const timeEndParking = "19:00"; // Replace with your actual time

    const momentTimeNowParking = moment();
    // เช็คว่าย้อนหลังไหม
    // if (momentTimeNowParking.isValid() && momentTimeIn.isValid()) {
    //   const timeDiffMinutesParking = momentTimeNowParking.diff(
    //     momentTimeIn,
    //     "minutes"
    //   );
    //   console.log("timeDiffMinutesParking", timeDiffMinutesParking);
    //   if (timeDiffMinutesParking > 0) {
    //     setOpen(false);
    //     alert(`Unable to reserve time later.`);
    //     return;
    //   }
    // }

    // Parse the times using moment
    const momentTimeStartParking = moment(timeStartParking, "HH:mm");

    // เช็คเวลาเปิดมากกว่า 6 โมง
    if (momentTimeStartParking.isValid() && momentTimeIn.isValid()) {
      // Calculate the time difference in minutes
      const timeDiffMinutesParking = momentTimeIn.diff(
        momentTimeStartParking,
        "minutes"
      );
      if (timeDiffMinutesParking < 0) {
        setOpen(false);
        alert("Time Difference Must More Than 06:00");
        return;
      }
    }

    // เช็คว่าจองต้องก่อน 19.00 เพราะว่าต้องก่อนเวลาปิด
    const momentSelectedTimeEndParking = moment(timeEndParking, "HH:mm");
    if (momentSelectedTimeEndParking.isValid() && momentTimeIn.isValid()) {
      // Calculate the time difference in minutes
      const timeDiffMinutesParking = momentTimeIn.diff(
        momentSelectedTimeEndParking,
        "minutes"
      );
      console.log("timeDiffMinutesParking", timeDiffMinutesParking);
      if (timeDiffMinutesParking > 0) {
        console.log("Time Difference Must Less Than 19:00");
        setOpen(false);
        alert("Time Difference Must Less Than 19:00");
        return;
      }
    }

    // Validate

    if (momentTimeIn.isValid() && momentSelectedTimeOut.isValid()) {
      // Calculate the time difference in minutes
      const timeDiffMinutes = momentTimeIn.diff(
        momentSelectedTimeOut,
        "minutes"
      );
      // Convert the time difference to hours and minutes
      const minutes = timeDiffMinutes % 60;

      // เวลาออกน้อยกว่าเวลาเข้า
      if (minutes < 0) {
        alert(`Time must more than ${momentSelectedTimeOut}`);
        setOpen(false);
        return;
      }
    }
    setOpen(false);
    setTimeBooking(time);
    setSelectedTime(moment(time).format("HH:mm"));
  };

  const setTimeOut = (time) => {
    console.log("timeout", moment(time).format("HH:mm"));

    // setOpenTimeOut(false);
    // setTimeBookingOut(time);
    // setSelectedTimeOut(moment(time).format("HH:mm")); // Update selected time

    const momentTimeOut = moment(time, "HH:mm");
    const momentSelectedTime = moment(selectedTime, "HH:mm");

    const timeStartParking = "06:00"; // Replace with your actual time
    const timeEndParking = "20:00"; // Replace with your actual time

    const momentTimeNowParking = moment();

    // เช็คเวลาย้อนหลัง
    if (momentTimeNowParking.isValid() && momentTimeOut.isValid()) {
      const timeDiffMinutesParking = momentTimeNowParking.diff(
        momentTimeOut,
        "minutes"
      );
      if (timeDiffMinutesParking < 0) {
        setOpenTimeOut(false);
        alert(`Unable to reserve time later.`);
        return;
      }
    }

    // Parse the times using moment
    const momentTimeStartParking = moment(timeStartParking, "HH:mm");

    if (momentTimeStartParking.isValid() && momentTimeOut.isValid()) {
      // Calculate the time difference in minutes
      const timeDiffMinutesParking = momentTimeOut.diff(
        momentTimeStartParking,
        "minutes"
      );
      if (timeDiffMinutesParking < 0) {
        setOpenTimeOut(false);
        console.log("Time Difference Must More Than 06:00");
        alert("Time Difference Must More Than 06:00");
        return;
      }
    }

    const momentSelectedTimeEndParking = moment(timeEndParking, "HH:mm");

    if (momentSelectedTimeEndParking.isValid() && momentTimeOut.isValid()) {
      const timeDiffMinutesParking = momentTimeOut.diff(
        momentSelectedTimeEndParking,
        "minutes"
      );
      if (timeDiffMinutesParking > 0) {
        console.log("Time Difference Must Less Than 20:00");
        setOpenTimeOut(false);
        alert("Time Difference Must Less Than 20:00");
        return;
      }
    }

    // ห้ามน้อยกว่าเวลาปัจจุบัน

    if (momentTimeOut.isValid() && momentSelectedTime.isValid()) {
      const timeDiffMinutes = momentTimeOut.diff(momentSelectedTime, "minutes");
      const minutes = timeDiffMinutes % 60;

      // เวลาออกน้อยกว่าเวลาเข้า
      if (minutes < 0) {
        alert(`Time must more than ${momentSelectedTime}`);
        setOpenTimeOut(false);
        return;
      }
    }

    setOpenTimeOut(false);
    setTimeBookingOut(time);
    setSelectedTimeOut(moment(time).format("HH:mm")); // Update selected time
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userDataString = await AsyncStorage.getItem("_isAccessUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log(userData);
      setUser(userData);
    }
  };

  const handleBooking = () => {
    // const payload = {
    //   id: data.carparking_id,
    //   place: data.carparking_name,
    //   name: name,
    //   tel: tel,
    //   plate: plate,
    //   type: type,
    //   timeIn: selectedTime,
    //   timeOut: selectedTimeOut,
    //   date: moment().format("YYYY-MM-DD"),
    //   user: user.id,
    // };
    const payload = {
      id: carparkingId,
      name: name,
      tel: tel,
      plate: plate,
      type: type,
      timeIn: selectedTime,
      timeOut: selectedTimeOut,
      date: moment().format("YYYY-MM-DD"),
      user: user.id,
    };
    console.log("payload", payload);
    axios
      .post(`${config.mainAPI}/booking`, ...payload)
      .then(function (response) {
        alert("Booking Success");
        navigation.navigate("Home");
        // axios
        //   .post(`${config.mainAPI}/booking/cronjob`, {
        //     id: carparkingId, //booking_id
        //     timeIn: selectedTime,
        //   })
        //   .then(function (response) {})
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const checkCronJob = () => {
  //   axios
  //     .post("http://10.0.2.2:6969/api/booking/cronjob", {
  //       id: carparkingId, //booking_id
  //       timeIn: selectedTime,
  //     })
  //     .then(function (response) {
  //       navigation.navigate("Home");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const handleOpenTimeOut = () => {
    // setOpenTimeOut(true);
    console.log("555");
    if (selectedTime) {
      setOpenTimeOut(true);
    } else {
      alert("Please specify your booking time first.");
    }
  };

  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.headingText}>Booking</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            label="Name"
            value={name}
            mode="flat"
            onChangeText={(text) => setName(text)}
          />

          <TextInput
            style={styles.inputText}
            label="Tel"
            value={tel}
            mode="flat"
            maxLength={10}
            onChangeText={(text) => setTel(text)}
          />

          <TextInput
            style={styles.inputText}
            label="Plate"
            value={plate}
            mode="flat"
            maxLength={8}
            onChangeText={(text) => setPlate(text)}
          />
        </View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={typeData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Type Car"
          searchPlaceholder="Search..."
          value={type}
          onChange={(item) => {
            setType(item.value);
          }}
        />

        {/* <View>
          <Button onPress={() => setOpen(true)}>
            <Icon name="alarm-outline" color="#fff" size={22} />
            <Text style={{ color: "#fff" }}>Time In</Text>
          </Button>
        </View>

        <View>
          <Button style={{alignItems:'flex-start'}} onPress={() => setOpen(true)}>
            <Icon name="alarm-outline" color="#fff" size={22} />
            <Text style={{ color: "#fff" }}>Time Out</Text>
          </Button>
        </View> */}

        <View style={styles.inputContainer1}>
          <View style={styles.inputWrapper1}>
            <Button
              style={{ alignItems: "flex-start" }}
              onPress={() => setOpen(true)}
            >
              <Icon name="alarm-outline" color="#fff" size={22} />
              <Text style={{ color: "#fff" }}>
                Time In {selectedTime ? selectedTime : null}
              </Text>
            </Button>
          </View>

          <View style={styles.inputWrapper1}>
            <Button
              style={{ alignItems: "flex-start" }}
              onPress={() => handleOpenTimeOut()}
              // disabled={!selectedTime}
            >
              <Icon name="alarm-outline" color="#fff" size={22} />
              <Text style={{ color: "#fff" }}>
                Time Out:{selectedTimeOut ? selectedTimeOut : null}
              </Text>
            </Button>
          </View>
        </View>

        <View>
          <Text style={styles.textwarning}>
            Please arrive 30 minutes earlier or the queue will be cancelled.
          </Text>
        </View>

        <DatePicker
          modal
          open={open}
          date={timeBooking}
          mode="time"
          minuteInterval={60} // Set the minute increment to 15 minutes
          onConfirm={(date) => {
            setTimeIn(date); // Update selected time
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <DatePicker
          modal
          open={openTimeOut}
          date={timeBookingOut}
          minuteInterval={60} // Set the minute increment to 15 minutes
          mode="time"
          onConfirm={(date) => {
            setTimeOut(date); // Update selected time
          }}
          onCancel={() => {
            setOpenTimeOut(false);
          }}
        />
        <Button style={styles.button} onPress={handleBooking}>
          <Text style={styles.labelButton}>Booking</Text>
        </Button>
      </View>
    </ImageBackground>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#3ec97c",
  },
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: "center",
    // alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputText: {
    width: "100%",
  },
  headingText: {
    alignSelf: "center",
    color: "#333335",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
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
    backgroundColor: "#fff",
  },
  btnBooking: {
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 5,
    backgroundColor: "#2f2f2f",
  },
  namePlace: { marginBottom: 10 },
  textwarning: {
    alignSelf: "center",
    color: "#dc3545",
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  // dropdown: {
  //   height: 62,
  //   width: "100%",
  //   borderBottomColor: "#333335",
  //   borderBottomWidth: 0.5,
  //   backgroundColor: "#fff",
  //   borderTopLeftRadius: 4,
  //   borderTopRightRadius: 4,
  // },
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
  hrLine: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selectedTimeText: {
    color: "#fff",
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
  inputContainer1: {
    flexDirection: "row",
    justifyContent: "space-between", // Space between the two items
    marginBottom: 15,
  },
  inputWrapper1: {
    flex: 1,
    marginRight: 10,
  },
});
