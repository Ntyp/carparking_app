import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import moment from "moment";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-date-picker";
import Icon from "react-native-vector-icons/Ionicons";

const DasboardOwner = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(moment().format("DD-MM-YYYY"));
  const [money, setMoney] = useState();
  const [count, setCount] = useState(0);
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const [timeShow, setTimeShow] = useState(new Date());

  const showData = async (date1) => {
    const userDataString = await AsyncStorage.getItem("_isAccessUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log(userData);
      setUser(userData);
      axios
        .get(`http://10.0.2.2:6969/api/owner-count/${userData.id}/${date1}`)
        .then(function (response) {
          console.log("result =>", response.data.data[0].count);
          setCount(response.data.data[0].count);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get(`http://10.0.2.2:6969/api/owner-money/${userData.id}/${date1}`)
        .then(function (response) {
          console.log("result =>", response.data.data[0]);
          setMoney(response.data.data[0].money);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const updateStatusCarparkingOpen = async () => {
    const userDataString = await AsyncStorage.getItem("_isAccessUser");
    const userData = JSON.parse(userDataString);
    const status = "Open";
    axios
      .post("http://10.0.2.2:6969/api/owner-update-status-carparking", {
        id: userData.id,
        status: status,
      })
      .then(function (response) {
        alert("Update Success");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateStatusCarparkingClose = async () => {
    const userDataString = await AsyncStorage.getItem("_isAccessUser");
    const userData = JSON.parse(userDataString);
    const status = "Close";
    axios
      .post("http://10.0.2.2:6969/api/owner-update-status-carparking", {
        id: userData.id,
        status: status,
      })
      .then(function (response) {
        alert("Update Success");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const date1 = moment().format("YYYY-MM-DD");
    showData(date1);
  }, []);

  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <View>
        <Text style={styles.headingText}>Dashboard</Text>
        <View style={styles.container}>
          <Button onPress={() => setOpen(true)}>
            <Icon name='alarm-outline' color='#fff' size={22} />
            <Text style={{ color: "#fff" }}> Select Date</Text>
          </Button>

          <DatePicker
            modal
            open={open}
            date={timeShow}
            mode='date'
            onConfirm={(date) => {
              setOpen(false);
              setTimeShow(date);
              showData(moment(date).format("YYYY-MM-DD"));
              setDate(moment(date).format("DD-MM-YYYY"));
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Text style={styles.labelTextDate}>วันที่:{date}</Text>
          <View style={styles.box}>
            <Text style={styles.labelBox}>ยอดจองทั้งหมด</Text>
            <Text style={styles.labelBoxNumber}>
              {count == 0 ? "0" : count}
            </Text>
          </View>
          <View style={styles.box2}>
            <Text style={styles.labelBox}>ยอดเงินรับ</Text>
            <Text style={styles.labelBoxNumber}>
              ฿ {money == null ? "0" : money} บาท
            </Text>
          </View>
          <Button style={styles.button} onPress={updateStatusCarparkingOpen}>
            <Text style={styles.buttonText}>เปิดลานจอด</Text>
          </Button>
          <Button style={styles.button} onPress={updateStatusCarparkingClose}>
            <Text style={styles.buttonText}>ปิดลานจอด</Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default DasboardOwner;

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
  labelTextDate: { textAlign: "center", fontSize: 20 },
  box: {
    backgroundColor: "#FD3A66",
    height: 160,
    width: "100%",
    borderRadius: 20,
    marginBottom: 15,
    marginTop: 15,
  },
  box2: {
    backgroundColor: "#5E5DDC",
    height: 160,
    width: "100%",
    borderRadius: 20,
    marginBottom: 15,
  },
  labelBox: {
    color: "#fff",
    textAlign: "left",
    marginStart: 20,
    marginTop: 5,
    fontSize: 20,
  },
  labelBoxNumber: {
    color: "#fff",
    textAlign: "left",
    marginStart: 25,
    marginTop: 5,
    fontSize: 30,
  },
  col: {
    display: "flex",
  },
  buttonText: {
    marginTop: 10,
    color: "#fff",
    alignSelf: "center",
  },
});
