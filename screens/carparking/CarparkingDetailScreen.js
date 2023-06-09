import { StyleSheet, Text, View, ImageBackground, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";

const CarparkingDetailScreen = ({ navigation, route }) => {
  const image = { uri: "https://picsum.photos/700" };
  const [item, setItem] = useState({});
  const onPressDetail = (id, place, parkid) => {
    navigation.navigate("Booking", {
      id: id,
      carparkingPlace: place,
      carparkingId: parkid,
    });
  };
  useEffect(() => {
    fetch("http://10.0.2.2:6969/api/carparking/" + route.params.id)
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result.data[0]);
        setItem(result.data[0]);
      });
  }, []);

  return (
    <View style={styles.backGround}>
      <ImageBackground
        source={image}
        resizeMode='cover'
        style={styles.headingImg}
      >
        <View style={styles.emptyView}></View>
        <View style={styles.content}>
          <Text style={styles.namePlace}>{item.carparking_name}</Text>
          <View style={styles.boxStyle}>
            <Text style={styles.locationPlace}>{item.carparking_district}</Text>
            <Text
              style={styles.txtMap}
              onPress={() => Linking.openURL(item.carparking_url)}
            >
              Map Direction
            </Text>
          </View>
          <Text style={styles.locationPlace}>
            Status:{item.carparking_status}
          </Text>
          <View style={styles.hrLine}></View>
          <Text style={styles.topicPlace}>Detail</Text>
          <Text style={styles.detailPlace}>{item.carparking_detail}</Text>
          <Text style={styles.topicPlace}>Cost</Text>
          <Text style={styles.spanContent}>{item.carparking_price}฿/hr</Text>
          <Button
            style={styles.btnBook}
            mode='contained'
            onPress={() =>
              onPressDetail(
                item.carparking_id,
                item.carparking_name,
                item.carparking_id
              )
            }
            key={item.carparking_id}
          >
            Book Now
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CarparkingDetailScreen;

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: "#fff",
  },
  headingImg: {
    width: "100%",
    height: 310,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  emptyView: {
    height: 220,
  },
  content: {
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    // height: '80%',
  },
  hrLine: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  txtMap: {
    color: "#3ec97c",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  namePlace: {
    color: "#000",
    fontSize: 30,
    fontWeight: "700",
    paddingTop: 60,
    marginBottom: 10,
    // fontFamily: Fonts.KanitBold,
  },
  topicPlace: {
    color: "#3ec97c",
    fontWeight: "700",
    fontSize: 22,
    textDecorationLine: "underline",
    textDecorationColor: "#3ec97c",
    paddingBottom: 10,
  },
  detailPlace: { color: "#868686", paddingTop: 10, paddingBottom: 10 },
  locationPlace: { color: "#868686", marginBottom: 25, fontWeight: "700" },
  textContent: {
    color: "#3ec97c",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    marginRight: 20,
  },
  textContent1: {
    color: "#000",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    marginRight: 20,
  },
  spanContent: {
    color: "#000",
    fontSize: 20,
    fontWeight: "700",
  },
  btnBook: {
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 5,
    backgroundColor: "#3ec97c",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  boxStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
