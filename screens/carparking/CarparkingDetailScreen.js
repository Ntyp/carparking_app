import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Linking,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import axios from "axios";
import config from "../../config";
const CarparkingDetailScreen = ({ navigation, route }) => {
  const image = { uri: "https://picsum.photos/700" };
  const [item, setItem] = useState({});
  const [data, setData] = useState([]);
  const onPressDetail = () => {
    navigation.navigate("Booking", {
      id: data.carparking_id,
      carparkingId: data.carparking_id,
    });
  };

  const getCarParkingDetail = (id) => {
    axios
      .get(`${config.mainAPI}/getCarParkingList`)
      .then(function (response) {
        setData(response.data.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getCarParkingDetail(route.params.id);
  }, []);

  return (
    // <View style={styles.backGround}>
    //   <ImageBackground
    //     source={image}
    //     resizeMode="cover"
    //     style={styles.headingImg}
    //   >
    //     <View style={styles.emptyView}></View>
    //     <View style={styles.content}>
    //       <Text style={styles.namePlace}>{item.carparking_name}</Text>
    //       <View style={styles.boxStyle}>
    //         <Text style={styles.locationPlace}>{item.carparking_district}</Text>
    //         <Text
    //           style={styles.txtMap}
    //           onPress={() => Linking.openURL(item.carparking_url)}
    //         >
    //           Map Direction
    //         </Text>
    //       </View>
    //       <Text style={styles.locationPlace}>
    //         Status:{item.carparking_status}
    //       </Text>
    //       <View style={styles.hrLine}></View>
    //       <Text style={styles.topicPlace}>Detail</Text>
    //       <Text style={styles.detailPlace}>{item.carparking_detail}</Text>
    //       <Text style={styles.topicPlace}>Cost</Text>
    //       <Text style={styles.spanContent}>{item.carparking_price}฿/hr</Text>
    //       <Button
    //         style={styles.btnBook}
    //         mode="contained"
    //         onPress={() =>
    //           onPressDetail(
    //             item.carparking_id,
    //             item.carparking_name,
    //             item.carparking_id
    //           )
    //         }
    //         key={item.carparking_id}
    //       >
    //         Book Now
    //       </Button>
    //     </View>
    //   </ImageBackground>

    // </View>

    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headingText}>{data.carparking_name}</Text>
          <View style={styles.horizontalLine} />
          {/* <View style={styles.previewImg}></View> */}
          <View style={styles.bgImg}>
            <Image
              style={styles.headingImg}
              source={require("../../components/images/parking.png")}
            />
          </View>

          <View>
            <View>
              <Text style={styles.labelText}>Detail:{data.carparking_detail}</Text>
            </View>
            <View>
              <Text style={styles.labelText}>Map:<Text style={{color: 'blue'}} onPress={() => Linking.openURL(`${data.carparking_url}`)}>Link</Text></Text>
            </View>
            <View>
              <Text style={styles.labelText}>
                Price: {data.carparking_price} ฿/Hr.
              </Text>
            </View>
          </View>

          <View>
            {/* onPress={handleCreate} */}
            <Button style={styles.button} onPress={() => onPressDetail()}>
              <Text style={styles.labelButton}>Booking</Text>
            </Button>
          </View>
        </View>

        {/* {items.map((item) => (
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
                    </Text>
                  </Card.Actions>
                </Card.Content>
              </Card>
            </View>
          </Pressable>
        ))} */}
      </ScrollView>
    </ImageBackground>
  );
};

export default CarparkingDetailScreen;

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#3ec97c", // set a semi-transparent background color for the container
  },
  container: {
    padding: 20,
  },
  headingImg: {
    width: "100%",
    height: 310,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headingText: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 15,
    color: "#2f2f2f",
    alignSelf: "center",
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
  horizontalLine: {
    marginBottom: 15,
    borderBottomColor: "#2f2f2f", // Change the color to your desired color
    borderBottomWidth: 1, // Change the thickness as needed
  },
  previewImg: {
    backgroundColor: "#fff",
    height: 300,
    borderRadius: 20,
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
  labelText: {
    marginBottom: 10,
  },
  headingImg: {
    width: "100%",
    height: 300,
    marginBottom: 10,
  },
  bgImg: {
    // backgroundColor: "#fff",
  },
});
