import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";

const BookingHistoryScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState();

  function formatDate(value) {
    return moment(value).format("YYYY-MM-DD");
  }

  const fetchData = async () => {
    const userDataString = await AsyncStorage.getItem("_isAccessUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser(userData);
      fetch(`http://10.0.2.2:6969/api/booking-user/${userData.id}`)
        .then((res) => res.json())
        .then((result) => {
          console.log("result =>", result.data);
          setItems(result.data);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <Text style={styles.headingText}>History</Text>
        {items.map((item) => (
          <Pressable
            onPress={() =>
              navigation.navigate("HistoryBooking", { id: item.booking_id })
            }
            key={item.booking_id}
          >
            <View style={styles.showCard}>
              <Card>
                <Card.Content style={styles.card}>
                  <Title style={styles.titlePlace}>{item.booking_place}</Title>
                  <Card.Actions>
                    <Text>เวลาจอง: {item.booking_time_in} น.</Text>
                    <Text>
                      วันที่: {formatDate(item.booking_date)}
                      {/* {item.booking_price > 0 ? item.booking_price : 0} THB. */}
                    </Text>
                  </Card.Actions>
                </Card.Content>
              </Card>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default BookingHistoryScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#3ec97c", // set a semi-transparent background color for the container
  },
  background: {
    backgroundColor: "#3ec97c",
    height: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    padding: 15,
  },
  headingText: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 15,
    color: "#2f2f2f",
    alignSelf: "center",
  },
  headingTopic: {
    fontSize: 25,
    fontWeight: "700",
    color: "#2f2f2f",
    marginBottom: 10,
    marginTop: 10,
  },
  headingCard: {},
  content: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  titlePlace: {
    // fontFamily: Fonts.PromptBold,
    fontWeight: "700",
  },
  placeTh: {
    // fontFamily: Fonts.PromptRegular,
  },
  dropdown2BtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#444",
    borderRadius: 8,
    marginTop: 20,
  },
  dropdown2BtnTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2DropdownStyle: {
    backgroundColor: "#444",
    borderRadius: 12,
  },
  dropdown2RowStyle: { backgroundColor: "#444", borderBottomColor: "#C5C5C5" },
  dropdown2RowTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2SelectedRowStyle: { backgroundColor: "rgba(255,255,255,0.2)" },
  dropdown2searchInputStyleStyle: {
    backgroundColor: "#444",
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
  },
  searchBar: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  frame: {
    height: "100%",
    marginTop: 20,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  showCard: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  address: {
    color: "#c4c4c4",
  },
  iconCar: {
    marginRight: 10,
  },
  iconMoney: {
    marginRight: 10,
  },
  money: {
    alignSelf: "center",
  },
});
