import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  BottomNavigation,
  TextInput,
  Button,
  Text,
  Modal,
} from "react-native-paper";
import React, { useState, useEffect } from "react";
import DatePicker from "react-native-date-picker";
import { Dropdown } from "react-native-element-dropdown";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";

const BookingPaymentDetailScreen = ({ navigation, route }) => {
  // Get Carparking
  const [open, setOpen] = useState(false);
  const [tel, setTel] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState(new Date());
  const [image, setImage] = useState("");
  const [bank, setBank] = useState(null);
  const typeBank = [
    { label: "BANGKOK BANK", value: "BANGKOK BANK" },
    { label: "BANK OF AYUDHYA", value: "BANK OF AYUDHYA" },
    { label: "KASIKORNBANK", value: "KASIKORNBANK" },
    { label: "KRUNG THAI BANK", value: "KRUNG THAI BANK" },
    { label: "SIAM COMMERCIAL BANK", value: "SIAM COMMERCIAL BANK" },
    { label: "TMB BANK", value: "TMB BANK" },
    { label: "GOVERNMENT SAVINGS BANK", value: "GOVERNMENT SAVINGS BANK" },
    { label: "STANDARD CHARTERED BANK", value: "STANDARD CHARTERED BANK" },
    { label: "UNION OVERSEAS BANK", value: "UNION OVERSEAS BANK" },
    { label: "THANACHART BANK", value: "THANACHART BANK" },
    { label: "CIMB THAI BANK", value: "CIMB THAI BANK" },
    { label: "CITIBANK", value: "CITIBANK" },
    { label: "KIATNAKIN BANK", value: "KIATNAKIN BANK" },
  ];
  //   name,tel,time,img,bank
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const handlePayment = async () => {
    navigation.navigate("Home");
  };

  //   const handlePayment = async () => {
  //     const userId = await AsyncStorage.getItem("userid");
  //     const responses = await fetch(
  //       "http://10.0.2.2:6969/api/bookingcarparking",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           parking_id: carparkingId,
  //           booking_place: carparkingPlace,
  //           booking_name: name,
  //           booking_tel: tel,
  //           booking_plate: plate,
  //           booking_type: type,
  //           booking_date: moment().format("YYYY-MM-DD"),
  //           booking_time: timeBooking,
  //           user: userId,
  //         }),
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((response) => {
  //         if (response.success == true) {
  //           alert("Booking Successfully");
  //           navigation.navigate("Home");
  //           // Move to Payment Screen
  //         } else {
  //           alert("Booking Failed");
  //           navigation.navigate("Home");
  //         }
  //       });
  //   };

  return (
    <View style={styles.backGround}>
      <View style={styles.container}>
        <Text style={styles.headingText}>Payment Detail</Text>
        <View style={styles.hrLine}></View>
        <Text style={styles.headingText}>
          {/* Place:{route.params.carparkingPlace} */}
        </Text>
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
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={typeBank}
          search
          maxHeight={300}
          labelField='label'
          valueField='value'
          placeholder='Bank'
          searchPlaceholder='Search...'
          value={bank}
          onChange={(item) => {
            setBank(item.value);
          }}
        />
        <Button onPress={() => setOpen(true)}>
          <Icon name='alarm-outline' color='#000' size={18} />
          <Text>Specify payment time</Text>
        </Button>
        <DatePicker
          modal
          open={open}
          date={time}
          mode='time'
          onConfirm={(date) => {
            setOpen(false);
            setTime(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Text style={styles.textwarning}>
          ** Please pay within 15 minutes after the transaction. **
        </Text>
        <Button style={styles.btnBooking} mode='contained' onPress={showModal}>
          Payment Confirmation
        </Button>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text style={styles.modalTopic}>Message</Text>
          <Text>
            The system is checking, please wait for 5-10 minutes. After that,
            please check your status in the booking history.
          </Text>
          <Button style={styles.modalButton} onPress={handlePayment}>
            <Text style={styles.modalTextButton}>Back to home</Text>
          </Button>
        </Modal>
      </View>
    </View>
  );
};

export default BookingPaymentDetailScreen;

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: "#3ec97c",
    height: "100%",
  },
  container: {
    backgroundColor: "#fff",
    marginTop: 15,
    padding: 20,
    alignSelf: "center",
    justifyContent: "center",
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
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
    marginTop: 10,
  },
  namePlace: { marginBottom: 10 },
  textwarning: {
    alignSelf: "center",
    color: "#dc3545",
    fontWeight: "700",
    marginBottom: 10,
  },
  dropdown: {
    height: 62,
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
  modalTopic: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalButton: {
    width: 150,
    marginTop: 20,
    alignSelf: "center",
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 5,
    backgroundColor: "#2f2f2f",
  },
  modalTextButton: {
    color: "#fff",
    fontSize: 16,
  },
});
