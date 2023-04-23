import { StyleSheet, View, ImageBackground } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  BottomNavigation,
  TextInput,
  Button,
  Text,
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

const BookingScreen = ({ navigation, route }) => {
  const [open, setOpen] = useState(false);
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
  const [selectedTime, setSelectedTime] = useState("");

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
    axios
      .post("http://10.0.2.2:6969/api/booking", {
        id: carparkingId,
        place: carparkingPlace,
        name: name,
        tel: tel,
        plate: plate,
        type: type,
        timeIn: selectedTime,
        date: moment(timeBooking).format("YYYY-MM-DD"),
        user: user.id,
      })
      .then(function (response) {
        alert("Booking Success");
        navigation.navigate("Home");
        axios
          .post("http://10.0.2.2:6969/api/booking/cronjob", {
            id: carparkingId, //booking_id
            timeIn: selectedTime,
          })
          .then(function (response) {})
          .catch(function (error) {
            console.log(error);
          });
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
            label='Name'
            value={name}
            mode='flat'
            onChangeText={(text) => setName(text)}
          />

          <TextInput
            style={styles.inputText}
            label='Tel'
            value={tel}
            mode='flat'
            onChangeText={(text) => setTel(text)}
          />

          <TextInput
            style={styles.inputText}
            label='Plate'
            value={plate}
            mode='flat'
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
          labelField='label'
          valueField='value'
          placeholder='Type Car'
          searchPlaceholder='Search...'
          value={type}
          onChange={(item) => {
            setType(item.value);
          }}
        />
        <Button onPress={() => setOpen(true)}>
          <Icon name='alarm-outline' color='#fff' size={22} />
          <Text style={{ color: "#fff" }}> Select Time Booking</Text>
        </Button>

        <DatePicker
          modal
          open={open}
          date={timeBooking}
          mode='time'
          onConfirm={(date) => {
            setOpen(false);
            setTimeBooking(date);
            setSelectedTime(moment(date).format("HH:mm:ss")); // Update selected time
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        {selectedTime ? ( // Show selected time if it's not empty
          <Text style={styles.selectedTimeText}>
            Selected Time: {selectedTime}
          </Text>
        ) : null}
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
    justifyContent: "center",
    alignItems: "center",
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
    color: "#fff",
    fontWeight: "700",
    marginBottom: 10,
  },
  dropdown: {
    height: 62,
    width: "100%",
    borderBottomColor: "#333335",
    borderBottomWidth: 0.5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
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
});
