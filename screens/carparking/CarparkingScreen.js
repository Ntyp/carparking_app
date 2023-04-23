import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import { Card, Searchbar, Title, Paragraph } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const CarparkingScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  // Ref by: https://en.wikipedia.org/wiki/List_of_districts_of_Bangkok
  const districts = [
    { value: "0", nameTh: "พระนคร", nameEn: "Phra Nakhon" },
    { value: "1", nameTh: "ดุสิต", nameEn: "Dusit" },
    { value: "2", nameTh: "หนองจอก", nameEn: "Nong Chok" },
    { value: "3", nameTh: "บางรัก", nameEn: "Bang Rak" },
    { value: "4", nameTh: "บางเขน", nameEn: "Bang Khen" },
    { value: "5", nameTh: "บางกะปิ", nameEn: "Bang Kapi" },
    { value: "6", nameTh: "ปทุมวัน", nameEn: "Pathum Wan" },
    { value: "7", nameTh: "ป้อมปราบศัตรูพ่าย", nameEn: "Pom Prap Sattru Phai" },
    { value: "8", nameTh: "พระโขนง", nameEn: "Phra Khanong" },
    { value: "9", nameTh: "มีนบุรี", nameEn: "Min Buri" },
    { value: "10", nameTh: "ลาดกระบัง", nameEn: "Lat Krabang" },
    { value: "11", nameTh: "ยานนาวา", nameEn: "Yan Nawa" },
    { value: "12", nameTh: "สัมพันธวงศ์", nameEn: "Samphanthawong" },
    { value: "13", nameTh: "พญาไท", nameEn: "Phaya Thai" },
    { value: "14", nameTh: "ธนบุรี", nameEn: "Thon Buri" },
    { value: "15", nameTh: "บางกอกใหญ่", nameEn: "Bangkok Yai" },
    { value: "16", nameTh: "ห้วยขวาง", nameEn: "Huai Khwang" },
    { value: "17", nameTh: "คลองสาน", nameEn: "Khlong San" },
    { value: "18", nameTh: "ตลิ่งชัน", nameEn: "Taling Chan" },
    { value: "19", nameTh: "บางกอกน้อย", nameEn: "Bangkok Noi" },
    { value: "20", nameTh: "บางขุนเทียน", nameEn: "Bang Khun Thian" },
    { value: "21", nameTh: "ภาษีเจริญ", nameEn: "Phasi Charoen" },
    { value: "22", nameTh: "หนองแขม", nameEn: "Nong Khaem" },
    { value: "23", nameTh: "ราษฏร์บูรณะ", nameEn: "Rat Burana" },
    { value: "24", nameTh: "บางพลัด", nameEn: "Bang Phlat" },
    { value: "25", nameTh: "ดินแดง", nameEn: "Din Daeng" },
    { value: "26", nameTh: "บึงกุ่ม", nameEn: "Bueng Kum" },
    { value: "27", nameTh: "สาทร", nameEn: "Sathon" },
    { value: "28", nameTh: "บางซื่อ", nameEn: "Bang Sue" },
    { value: "29", nameTh: "จตุจักร", nameEn: "Chatuchak" },
    { value: "30", nameTh: "บางคอแหลม", nameEn: "Bang Kho Laem" },
    { value: "31", nameTh: "ประเวศ", nameEn: "Prawet" },
    { value: "32", nameTh: "คลองเตย", nameEn: "Khlong Toei" },
    { value: "33", nameTh: "สวนหลวง", nameEn: "Suan Luang" },
    { value: "34", nameTh: "จอมทอง", nameEn: "Chom Thong" },
    { value: "35", nameTh: "ดอนเมือง", nameEn: "Don Mueang" },
    { value: "36", nameTh: "ราชเทวี", nameEn: "Ratchathewi" },
    { value: "37", nameTh: "ลาดพร้าว", nameEn: "Lat Phrao" },
    { value: "38", nameTh: "วัฒนา", nameEn: "Watthana" },
    { value: "39", nameTh: "บางแค", nameEn: "Bang Khae" },
    { value: "40", nameTh: "หลักสี่", nameEn: "Lak Si" },
    { value: "41", nameTh: "สายไหม", nameEn: "Sai Mai" },
    { value: "42", nameTh: "คันนายาว", nameEn: "Khan Na Yao" },
    { value: "43", nameTh: "สะพานสูง", nameEn: "Saphan Sung" },
    { value: "44", nameTh: "วังทองหลาง", nameEn: "Wang Thonglang" },
    { value: "45", nameTh: "คลองสามวา", nameEn: "Khlong Sam Wa" },
    { value: "46", nameTh: "บางนา", nameEn: "Bang Na" },
    { value: "47", nameTh: "ทวีวัฒนา", nameEn: "Thawi Watthana" },
    { value: "48", nameTh: "ทุ่งครุ", nameEn: "Thung Khru" },
    { value: "49", nameTh: "บางบอน", nameEn: "Bang Bon" },
  ];
  const onChangeSearch = (query) => setSearchQuery(query);
  const onPressDetail = (id, place) => {
    console.log("Change Screen");
    navigation.navigate("CarparkingDetail", { id: id, place: place });
  };
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://10.0.2.2:6969/api/carparking")
      .then((res) => res.json())
      .then((result) => {
        console.log("result =>", result.data);
        setItems(result?.data);
      });
  }, []);
  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headingText}>Carparking</Text>
          {items && items.length > 0 ? (
            <>
              {items.map((item) => (
                <Pressable
                  onPress={() =>
                    onPressDetail(item?.carparking_id, item?.carparking_name)
                  }
                  key={item?.carparking_id}
                >
                  <View style={styles.showCard}>
                    <Card>
                      <Card.Content>
                        <Title style={styles.titlePlace}>
                          {item?.carparking_name}
                        </Title>
                        <Paragraph>{item?.carparking_name_th}</Paragraph>
                      </Card.Content>
                    </Card>
                  </View>
                </Pressable>
              ))}
            </>
          ) : (
            <Text>No items to show</Text>
          )}

          {/* {items.map((item) => (
            <Pressable
              onPress={() =>
                onPressDetail(item?.carparking_id, item?.carparking_name)
              }
              key={item?.carparking_id}
            >
              <View style={styles.showCard}>
                <Card>
                  <Card.Content>
                    <Title style={styles.titlePlace}>
                      {item?.carparking_name}
                    </Title>
                    <Paragraph>{item?.carparking_name_th}</Paragraph>
                  </Card.Content>
                </Card>
              </View>
            </Pressable>
          ))} */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default CarparkingScreen;

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
    fontSize: 25,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 15,
    color: "#fff",
    alignSelf: "center",
    // fontFamily: Fonts.PromptRegular,
  },
  headingTopic: {
    fontSize: 25,
    fontWeight: "700",
    color: "#2f2f2f",
    marginBottom: 10,
    marginTop: 10,
  },
  content: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  titlePlace: {
    // fontFamily: Fonts.PromptBold,
    fontWeight: "700",
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
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#fff",
    marginTop: 20,
  },
  frame: {
    height: "100%",
    marginTop: 20,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  showCard: {
    width: "100%",
    padding: 20,
  },
  card: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: "#fff",
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
  placeName: {
    fontWeight: "bold",
  },
});
