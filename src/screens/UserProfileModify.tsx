import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import GoBackIcon from "../assets/icons/goBack.svg";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { verticalScale, scale } from "../utils/scale";
import { Button } from "@rneui/themed";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { useState } from "react";
import HairButton from "../components/UserProfile/HairButton";
import PlusIcon from "../assets/icons/plus.png";
import { useNavigation } from "@react-navigation/native";
import ProfileUploadButton from "../components/common/ProfileUploadButton";
import WantedStyleUploadButton from "../components/common/WantedStyleUploadButton";
import WantedStyleButton from "../components/common/WantedStyleButton";
import { Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ComplexityHeader from "../components/common/ComplexityHeader";
import { getUserProfile } from "../api/getUserProfile";
import { patchUserProfile } from "../api/patchUserProfile";
import { patchUserProfileImg } from "../api/patchUserProfileImg";
import { onlyPhoneNum } from "../utils/regularExpression";

const numHairStatus = 3;
const numHairTendency = 5;
const BASEWIDTH = 375;
const BASEPADDING = 20;
const numberOfLines = 4;
const MAINCOLOR = "#fc2a5b";

export default function UserProfileModify() {
  const [profileImage, setProfileImage] = useState(["", "", ""]);
  const [wantHairImage, setWantHairImage] = useState([]);
  const [wantedStyle, setWantedStyle] = useState("");
  const [wantedStyleDescription, setWantedStyleDescription] = useState("");
  const [wantedStylingCost, setWantedStylingCost] = useState("");
  const [hairStatusIndex, setHairStatusIndex] = useState(-1);
  const [hairTendencyIndex, setHairTendencyIndex] = useState(-1);
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const [timePickerIsVisible, setTimePickerIsVisible] = useState(false);
  const [stylingDate, setStylingDate] = useState(undefined);
  const [stylingTime, setStylingTime] = useState(undefined);
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [nickname, setNickname] = useState("");
  const [oldImg, setOldImg] = useState([]);
  const [loading, setLoading] = useState(false);

  const hairStatus = ["?????? ????????????", "???????????????", "?????? ????????????"];
  const hairTendency = ["?????? ??????", "?????? ??????", "?????????", "?????????", "??????"];
  const profileExplanation = ["??????", "??????", "??????"];

  const navigation = useNavigation();
  const baseImageURL = Image.resolveAssetSource(PlusIcon).uri;

  async function fetchData() {
    const { data } = await getUserProfile();
    console.log(data);
    setNickname(data.result.memberProfileDto.name);
    setHairStatusIndex(data.result.memberProfileDto.hairCondition - 1);
    setHairTendencyIndex(data.result.memberProfileDto.hairTendency - 1);
    setWantedStyle(data.result.memberProfileDto.desiredHairstyle);
    setWantedStyleDescription(
      data.result.memberProfileDto.desiredHairstyleDescription,
    );
    setWantedStylingCost(data.result.memberProfileDto.payableAmount.toString());
    setStylingDate(new Date(data.result.memberProfileDto.treatmentDate));
    setStylingTime(new Date(data.result.memberProfileDto.treatmentDate));
    setPhoneNumber(data.result.memberProfileDto.phoneNumber);
    let temp = [...profileImage];
    for (let i = 0; i < 3; i++) {
      if (i == 0 && data.result.memberProfileDto.frontImageUrl != null) {
        temp[0] = {
          uri: data.result.memberProfileDto.frontImageUrl,
        };
      }
      if (i == 1 && data.result.memberProfileDto.sideImageUrl != null) {
        temp[1] = {
          uri: data.result.memberProfileDto.sideImageUrl,
        };
      }
      if (i == 2 && data.result.memberProfileDto.backImageUrl != null) {
        temp[2] = {
          uri: data.result.memberProfileDto.backImageUrl,
        };
      }
    }
    setProfileImage(temp);
    data.result.desiredHairstyleImageDtoList.map((item, index) => {
      setWantHairImage(prev => [
        ...prev,
        {
          uri: item.imageUrl,
        },
      ]);
      setOldImg(prev => [
        ...prev,
        {
          uri: item.imageUrl,
        },
      ]);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const saveProfile = async () => {
    setLoading(true);
    console.log(nickname); // ?????????
    console.log(hairStatusIndex); // ????????????
    console.log(hairTendencyIndex); // ????????????
    console.log(wantedStyle); // ????????? ?????????
    console.log(wantedStyleDescription); // ????????? ??????????????? ??????
    console.log(wantedStylingCost); // ????????? ???????????? ??????
    console.log(stylingDate); // ????????? ?????? ??????
    console.log(stylingTime); // ????????? ?????? ??????
    console.log(phoneNumber); // ????????????
    console.log(wantHairImage);
    if (profileImage[0] == "") {
      Alert.alert("?????? ???????????? ??????????????????");
      setLoading(false);
    } else if (nickname == "") {
      Alert.alert("???????????? ??????????????????");
      setLoading(false);
    } else if (hairStatusIndex == -1) {
      Alert.alert("?????? ????????? ??????????????????");
      setLoading(false);
    } else if (hairTendencyIndex == -1) {
      Alert.alert("?????? ????????? ??????????????????");
      setLoading(false);
    } else if (wantedStyleDescription == "") {
      Alert.alert("????????? ???????????? ??????????????????");
      setLoading(false);
    } else if (wantedStylingCost == "") {
      Alert.alert("????????? ???????????? ????????? ??????????????????");
      setLoading(false);
    } else if (stylingDate == undefined || stylingTime == undefined) {
      Alert.alert("??????????????? ??????????????????");
      setLoading(false);
    } else if (phoneNumber == undefined) {
      Alert.alert("??????????????? ??????????????????");
      setLoading(false);
    } else {
      // ????????? ??????
      const result = await patchUserProfile(
        nickname,
        hairStatusIndex + 1,
        hairTendencyIndex + 1,
        wantedStyle,
        wantedStyleDescription,
        parseInt(wantedStylingCost),
        stylingDate,
        stylingTime,
        phoneNumber,
      );
      console.log(result);
      const result2 = await patchUserProfileImg(
        profileImage,
        wantHairImage,
        oldImg,
      );
      console.log(result2);
      // ????????? ?????????
      // console.log(profileImage);
      // console.log(wantHairImage);
      // console.log(url);
      if (result.data.result == undefined) {
        Alert.alert("????????? ?????????????????????. ?????? ????????? ????????????.");
        navigation.navigate("Loading", {
          reload: true,
        });
      } else if (result.data.status == "OK" && result2.data.status == "OK") {
        // navigation.navigate("NewMain");
        navigation.reset({
          routes: [
            {
              name: "NewMain",
              params: { reload: true },
            },
          ],
        });
      } else {
        Alert.alert("????????? ????????? ??????????????????.");
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.frame}>
      <ComplexityHeader
        title="????????? ??????"
        goBack="Main"
        button={
          <TouchableOpacity
            onPress={() => {
              saveProfile();
            }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: scale(16),
                fontWeight: "500",
                fontStyle: "normal",
                letterSpacing: -0.5,
                textAlign: "left",
                color: "#fc2a5b",
              }}>
              ??????
            </Text>
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <View
          style={{ alignItems: "center", paddingBottom: verticalScale(300) }}>
          <View style={{ width: "88.9%" }}>
            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                {profileImage.map((item, index) => {
                  console.log(item);
                  return (
                    <View
                      style={{
                        width: "30%",
                        alignItems: "center",
                        margin: verticalScale(10),
                      }}>
                      <ProfileUploadButton
                        index={index}
                        toChangeArray={profileImage}
                        toChangeFunction={setProfileImage}
                        style={styles.userProfileImage}
                      />
                      <Text
                        style={{
                          color: "white",
                          paddingTop: verticalScale(10),
                        }}>
                        {profileExplanation[index]}
                        {index == 0 && <Text style={{ color: "red" }}> *</Text>}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={styles.itemTextStyle}>
                ?????????<Text style={{ color: "red" }}> *</Text>
              </Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  placeholder="????????? ???????????? ??????????????????"
                  placeholderTextColor="#555555"
                  defaultValue={nickname}
                  onChangeText={text => {
                    console.log(nickname);
                    setNickname(text);
                  }}
                  autoCorrect={false}
                  style={styles.itemTextStyle}
                />
              </View>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={[styles.itemTextStyle]}>
                ???????????? ?????? ??????<Text style={{ color: "red" }}> *</Text>
              </Text>
              <View style={{ flexDirection: "row" }}>
                {hairStatus.map((item, index) => {
                  return (
                    <HairButton
                      width={scale(
                        (BASEWIDTH - BASEPADDING * 2) / numHairStatus,
                      )}
                      index={index}
                      content={hairStatus[index]}
                      isActive={index == hairStatusIndex}
                      onPressActive={() => setHairStatusIndex(index)}
                      onPressDeactive={() =>
                        setHairStatusIndex(-1)
                      }></HairButton>
                  );
                })}
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>
                ?????? ??????<Text style={{ color: "red" }}> *</Text>
              </Text>
              <View style={{ flexDirection: "row" }}>
                {hairTendency.map((item, index) => {
                  return (
                    <HairButton
                      width={scale(
                        (BASEWIDTH - BASEPADDING * 2) / numHairTendency,
                      )}
                      index={index}
                      content={hairTendency[index]}
                      isActive={index == hairTendencyIndex}
                      onPressActive={() => setHairTendencyIndex(index)}
                      onPressDeactive={() => setHairTendencyIndex(-1)}
                    />
                  );
                })}
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>????????? ?????????</Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  onChangeText={text => setWantedStyle(text)}
                  placeholder="???) ?????????"
                  placeholderTextColor="#555555"
                  value={wantedStyle}
                  style={styles.highlightText}
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <View
                style={{ flexDirection: "row", marginTop: verticalScale(12) }}>
                {wantHairImage.map((item, index) => {
                  return (
                    <WantedStyleButton
                      index={index}
                      array={wantHairImage}
                      setArray={setWantHairImage}
                      style={styles.wantStyleImage}
                    />
                  );
                })}

                {wantHairImage.length < 3 ? (
                  <WantedStyleUploadButton
                    style={styles.wantStyleImage}
                    array={wantHairImage}
                    setArray={setWantHairImage}
                  />
                ) : null}
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>
                ?????????????????? ????????? ?????? ???
                <Text style={{ color: "red" }}> *</Text>
              </Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  value={wantedStyleDescription}
                  onChangeText={text => setWantedStyleDescription(text)}
                  placeholder="???????????? ??????????????????."
                  placeholderTextColor="#555555"
                  multiline
                  numberOfLines={Platform.OS === "ios" ? null : numberOfLines}
                  minHeight={
                    Platform.OS === "ios" && numberOfLines
                      ? 20 * numberOfLines
                      : null
                  }
                  style={styles.highlightText}
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>
                ????????? ???????????? ?????? (??????: ???)
                <Text style={{ color: "red" }}> *</Text>
              </Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  value={wantedStylingCost}
                  onChangeText={text => setWantedStylingCost(text)}
                  placeholder="???) 30000"
                  placeholderTextColor="#555555"
                  style={styles.highlightText}
                  autoCorrect={false}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>
                ?????? ??????<Text style={{ color: "red" }}> *</Text>
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    width: "30%",
                    height: verticalScale(40),
                    justifyContent: "center",
                    borderBottomColor: "#373737",
                    borderBottomWidth: 1,
                    marginRight: 10,
                  }}
                  onPress={() => {
                    setDatePickerIsVisible(true);
                  }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: scale(16),
                      fontWeight: "normal",
                      fontStyle: "normal",
                      textAlign: "left",
                      color: stylingDate == undefined ? "#555555" : "#ffffff",
                    }}>
                    {stylingDate != undefined
                      ? `${stylingDate.getFullYear()}. ${
                          stylingDate.getMonth() + 1
                        }. ${stylingDate.getDate()}`
                      : "??????"}
                  </Text>
                  <DateTimePickerModal
                    isVisible={datePickerIsVisible}
                    date={stylingDate}
                    mode={"date"}
                    onCancel={() => {
                      setDatePickerIsVisible(false);
                    }}
                    onConfirm={val => {
                      console.log(val);
                      setStylingDate(val);
                      setDatePickerIsVisible(false);
                      // console.log(val);
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "30%",
                    height: verticalScale(40),
                    justifyContent: "center",
                    borderBottomColor: "#373737",
                    borderBottomWidth: 1,
                  }}
                  onPress={() => {
                    setTimePickerIsVisible(true);
                  }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: scale(16),
                      fontWeight: "normal",
                      fontStyle: "normal",
                      textAlign: "left",
                      color: stylingTime == undefined ? "#555555" : "#ffffff",
                    }}>
                    {stylingTime != undefined
                      ? `${stylingTime.getHours()}??? ${stylingTime.getMinutes()}???`
                      : "??????"}
                  </Text>
                  <DateTimePickerModal
                    isVisible={timePickerIsVisible}
                    date={stylingTime}
                    mode={"time"}
                    onCancel={() => {
                      setTimePickerIsVisible(false);
                    }}
                    onConfirm={val => {
                      setStylingTime(val);
                      setTimePickerIsVisible(false);
                      // console.log(val);
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>
                ???????????? <Text style={{ color: "red" }}> * </Text>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(10),
                    color: "#6e6e6e",
                  }}>
                  ?????? ????????? ?????????????????? ???????????????.
                </Text>
              </Text>

              <View style={styles.userTextUnderline}>
                <TextInput
                  onChangeText={num => setPhoneNumber(onlyPhoneNum(num))}
                  placeholder="??????????????? ??????????????????."
                  placeholderTextColor="#555555"
                  value={phoneNumber}
                  style={styles.highlightText}
                  autoCorrect={false}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {loading && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0.6,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <ActivityIndicator color={"#ffffff"} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: "#191919",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  mainView: {
    flex: 1,
    paddingHorizontal: 20,

    backgroundColor: "#191919",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  userProfileImage: {
    width: "100%",
    aspectRatio: 1,
    marginHorizontal: verticalScale(6),
    borderRadius: 100,

    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#373737",
  },

  itemTextStyle: {
    fontFamily: "Pretendard",
    fontSize: scale(16),
    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),
    letterSpacing: 0,
    color: "#ffffff",
  },

  highlightText: {
    fontFamily: "Pretendard",
    fontSize: scale(16),

    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),
    color: "#ffffff",
  },

  userTextUnderline: {
    borderBottomColor: "#373737",
    borderBottomWidth: 1,
    width: "100%",
  },

  wantStyleImage: {
    width: "30%",
    aspectRatio: 1,
    marginHorizontal: verticalScale(6),
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#373737",
  },

  deemMainColor: {
    color: MAINCOLOR,
    // opacity: 0.8,
  },
});
