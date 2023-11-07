import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, ScrollView } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";
import config from "../../config";
import { Dropdown } from "react-native-element-dropdown";

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
  const [ownerList, setOwnerList] = useState([]);

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

  // .get(`${config.mainAPI}/documents/${params}`)
  const handleCreate = () => {
    const payload = {
      name: name,
      quantity: quantity,
      price: price,
      detail: detail,
      url: url,
      token: token,
      owner: owner,
    };
    console.log("payload", payload);
    axios
      .post(`${config.mainAPI}/carparking`, {
        name: name,
        quantity: quantity,
        price: price,
        district: district,
        detail: detail,
        url: url,
        token: token,
        owner: owner,
      })
      .then(function (response) {
        alert("Create Successfully!!");
        navigation.navigate("Home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getOwnerList = () => {
    axios
      .get(`${config.mainAPI}/listOwnerOnly`)
      .then(function (response) {
        setOwnerList(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
    getOwnerList();
  }, []);

  return (
    <ImageBackground
      source={require("../../components/images/texture-geometry-shapes-2.png")}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headingText}>CARPARKING INFO</Text>
          <View style={styles.horizontalLine} />
          <View>
            <Text style={styles.labelText}>Name:</Text>
            <TextInput
              style={styles.inputText}
              value={name}
              mode="outlined"
              onChangeText={(text) => setName(text)}
            ></TextInput>
          </View>

          {/* <View>
            <Text style={styles.labelText}>Quantity:</Text>
            <TextInput
              style={styles.inputText}
              value={quantity}
              mode="outlined"
              onChangeText={(text) => setQuantity(text)}
            ></TextInput>
          </View>

          <View>
          <Text style={styles.labelText}>Price/Hr:</Text>
            <TextInput
              style={styles.inputText}
              value={price}
              mode="outlined"
              onChangeText={(text) => setPrice(text)}
            ></TextInput>
          </View> */}

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Parking Slots:</Text>
              <TextInput
                style={styles.inputText}
                value={quantity}
                mode="outlined"
                // onChangeText={(text) => setQuantity(text)}
                onChangeText={(text) => {
                  // Use a regular expression to replace any non-numeric characters with an empty string
                  const numericText = text.replace(/[^0-9]/g, "");
                  setQuantity(numericText);
                }}
                keyboardType="numeric" // This restricts the keyboard to numbers
              ></TextInput>
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Price/Hr:</Text>
              <TextInput
                style={styles.inputText}
                value={price}
                mode="outlined"
                // onChangeText={(text) => setPrice(text)}
                onChangeText={(text) => {
                  // Use a regular expression to replace any non-numeric characters with an empty string
                  const numericText = text.replace(/[^0-9]/g, "");
                  setPrice(numericText);
                }}
                keyboardType="numeric" // This restricts the keyboard to numbers
              ></TextInput>
            </View>
          </View>

          <View>
            <Text style={styles.labelText}>Detail:</Text>
            <TextInput
              style={styles.inputText}
              value={detail}
              mode="outlined"
              onChangeText={(text) => setDetail(text)}
            ></TextInput>
          </View>

          <View>
            <Text style={styles.labelText}>Url Map:</Text>
            <TextInput
              style={styles.inputText}
              value={url}
              mode="outlined"
              onChangeText={(text) => setUrl(text)}
            ></TextInput>
          </View>

          <Text style={styles.headingText}>OWNER INFO</Text>
          <View style={styles.horizontalLine} />

          <Text style={styles.labelText}>Token Line:</Text>
          <TextInput
            style={styles.inputText}
            value={token}
            mode="outlined"
            onChangeText={(text) => setToken(text)}
          ></TextInput>

          <Text style={styles.labelText}>Owner:</Text>

          {/* <TextInput
            style={styles.inputText}
            value={owner}
            mode="outlined"
            onChangeText={(text) => setOwner(text)}
          ></TextInput> */}

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={ownerList}
            maxHeight={300}
            labelField="user_username"
            valueField="user_username"
            value={owner}
            onChange={(item) => {
              setOwner(item.user_username);
            }}
          />

          <Button style={styles.button} onPress={handleCreate}>
            <Text style={styles.labelButton}>Create Carparking</Text>
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
    textAlign: "center",
  },
  horizontalLine: {
    marginBottom: 15,
    borderBottomColor: "#2f2f2f", // Change the color to your desired color
    borderBottomWidth: 1, // Change the thickness as needed
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
  labelText: {
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
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
});
