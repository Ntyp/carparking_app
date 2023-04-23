import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";

const CarparkingCreateScreen = ({ navigation }) => {
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [nameTh, setNameTh] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [district, setDistrict] = useState("");
  const [detail, setDetail] = useState("");
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [owner, setOwner] = useState("");

  // const districts = [
  //   { value: "0", nameTh: "พระนคร", nameEn: "Phra Nakhon" },
  //   { value: "1", nameTh: "ดุสิต", nameEn: "Dusit" },
  //   { value: "2", nameTh: "หนองจอก", nameEn: "Nong Chok" },
  //   { value: "3", nameTh: "บางรัก", nameEn: "Bang Rak" },
  //   { value: "4", nameTh: "บางเขน", nameEn: "Bang Khen" },
  //   { value: "5", nameTh: "บางกะปิ", nameEn: "Bang Kapi" },
  //   { value: "6", nameTh: "ปทุมวัน", nameEn: "Pathum Wan" },
  //   { value: "7", nameTh: "ป้อมปราบศัตรูพ่าย", nameEn: "Pom Prap Sattru Phai" },
  //   { value: "8", nameTh: "พระโขนง", nameEn: "Phra Khanong" },
  //   { value: "9", nameTh: "มีนบุรี", nameEn: "Min Buri" },
  //   { value: "10", nameTh: "ลาดกระบัง", nameEn: "Lat Krabang" },
  //   { value: "11", nameTh: "ยานนาวา", nameEn: "Yan Nawa" },
  //   { value: "12", nameTh: "สัมพันธวงศ์", nameEn: "Samphanthawong" },
  //   { value: "13", nameTh: "พญาไท", nameEn: "Phaya Thai" },
  //   { value: "14", nameTh: "ธนบุรี", nameEn: "Thon Buri" },
  //   { value: "15", nameTh: "บางกอกใหญ่", nameEn: "Bangkok Yai" },
  //   { value: "16", nameTh: "ห้วยขวาง", nameEn: "Huai Khwang" },
  //   { value: "17", nameTh: "คลองสาน", nameEn: "Khlong San" },
  //   { value: "18", nameTh: "ตลิ่งชัน", nameEn: "Taling Chan" },
  //   { value: "19", nameTh: "บางกอกน้อย", nameEn: "Bangkok Noi" },
  //   { value: "20", nameTh: "บางขุนเทียน", nameEn: "Bang Khun Thian" },
  //   { value: "21", nameTh: "ภาษีเจริญ", nameEn: "Phasi Charoen" },
  //   { value: "22", nameTh: "หนองแขม", nameEn: "Nong Khaem" },
  //   { value: "23", nameTh: "ราษฏร์บูรณะ", nameEn: "Rat Burana" },
  //   { value: "24", nameTh: "บางพลัด", nameEn: "Bang Phlat" },
  //   { value: "25", nameTh: "ดินแดง", nameEn: "Din Daeng" },
  //   { value: "26", nameTh: "บึงกุ่ม", nameEn: "Bueng Kum" },
  //   { value: "27", nameTh: "สาทร", nameEn: "Sathon" },
  //   { value: "28", nameTh: "บางซื่อ", nameEn: "Bang Sue" },
  //   { value: "29", nameTh: "จตุจักร", nameEn: "Chatuchak" },
  //   { value: "30", nameTh: "บางคอแหลม", nameEn: "Bang Kho Laem" },
  //   { value: "31", nameTh: "ประเวศ", nameEn: "Prawet" },
  //   { value: "32", nameTh: "คลองเตย", nameEn: "Khlong Toei" },
  //   { value: "33", nameTh: "สวนหลวง", nameEn: "Suan Luang" },
  //   { value: "34", nameTh: "จอมทอง", nameEn: "Chom Thong" },
  //   { value: "35", nameTh: "ดอนเมือง", nameEn: "Don Mueang" },
  //   { value: "36", nameTh: "ราชเทวี", nameEn: "Ratchathewi" },
  //   { value: "37", nameTh: "ลาดพร้าว", nameEn: "Lat Phrao" },
  //   { value: "38", nameTh: "วัฒนา", nameEn: "Watthana" },
  //   { value: "39", nameTh: "บางแค", nameEn: "Bang Khae" },
  //   { value: "40", nameTh: "หลักสี่", nameEn: "Lak Si" },
  //   { value: "41", nameTh: "สายไหม", nameEn: "Sai Mai" },
  //   { value: "42", nameTh: "คันนายาว", nameEn: "Khan Na Yao" },
  //   { value: "43", nameTh: "สะพานสูง", nameEn: "Saphan Sung" },
  //   { value: "44", nameTh: "วังทองหลาง", nameEn: "Wang Thonglang" },
  //   { value: "45", nameTh: "คลองสามวา", nameEn: "Khlong Sam Wa" },
  //   { value: "46", nameTh: "บางนา", nameEn: "Bang Na" },
  //   { value: "47", nameTh: "ทวีวัฒนา", nameEn: "Thawi Watthana" },
  //   { value: "48", nameTh: "ทุ่งครุ", nameEn: "Thung Khru" },
  //   { value: "49", nameTh: "บางบอน", nameEn: "Bang Bon" },
  // ];

  const fetchUser = async () => {
    const userDataString = await AsyncStorage.getItem("_isAccessUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log(userData);
      setUser(userData);
    }
  };

  const handleCreate = () => {
    axios
      .post("http://10.0.2.2:6969/api/carparking", {
        name: name,
        nameTh: nameTh,
        nameEn: nameEn,
        quantity: quantity,
        price: price,
        district: district,
        detail: detail,
        url: url,
        token: token,
        owner: owner,
      })
      .then(function (response) {
        navigation.navigate("Home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headingText}>Create Carparking</Text>
          <TextInput
            style={styles.inputText}
            label='Name'
            value={name}
            mode='flat'
            onChangeText={(text) => setName(text)}
          ></TextInput>
          <TextInput
            style={styles.inputText}
            label='NameTh'
            value={nameTh}
            mode='flat'
            onChangeText={(text) => setNameTh(text)}
          ></TextInput>
          <TextInput
            style={styles.inputText}
            label='NameEn'
            value={nameEn}
            mode='flat'
            onChangeText={(text) => setNameEn(text)}
          ></TextInput>
          <TextInput
            style={styles.inputText}
            label='Quantity'
            value={quantity}
            mode='flat'
            onChangeText={(text) => setQuantity(text)}
          ></TextInput>
          <TextInput
            style={styles.inputText}
            label='Price'
            value={price}
            mode='flat'
            onChangeText={(text) => setPrice(text)}
          ></TextInput>
          <TextInput
            style={styles.inputText}
            label='Detail'
            value={detail}
            mode='flat'
            onChangeText={(text) => setDetail(text)}
          ></TextInput>
          <TextInput
            style={styles.inputText}
            label='Url Map'
            value={url}
            mode='flat'
            onChangeText={(text) => setUrl(text)}
          ></TextInput>
          <TextInput
            style={styles.inputText}
            label='Line Token'
            value={token}
            mode='flat'
            onChangeText={(text) => setToken(text)}
          ></TextInput>
          <TextInput
            style={styles.inputText}
            label='Username Owner'
            value={owner}
            mode='flat'
            onChangeText={(text) => setOwner(text)}
          ></TextInput>
          <Button style={styles.button} onPress={handleCreate}>
            <Text style={styles.labelButton}>Create</Text>
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default CarparkingCreateScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#3ec97c", // set a semi-transparent background color for the container
  },
  container: {
    padding: 20,
  },
  headingText: {
    color: "#2f2f2f",
    fontWeight: "700",
    fontSize: 28,
    marginBottom: 15,
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
});
