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
import { postUserProfile } from "../api/postUserProfile";
import { postUserProfileImg } from "../api/postUserProfileImg";
import { putS3Img } from "../api/putS3Img";
import { onlyPhoneNum } from "../utils/regularExpression";

const numHairStatus = 3;
const numHairTendency = 5;
const BASEWIDTH = 375;
const BASEPADDING = 20;
const numberOfLines = 4;
const MAINCOLOR = "#fc2a5b";

export default function UserProfile() {
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
  const [loading, setLoading] = useState(false);

  const hairStatus = ["많이 상했어요", "보통이에요", "매우 건강해요"];
  const hairTendency = ["악성 곱슬", "심한 곱슬", "반곱슬", "반직모", "직모"];
  const profileExplanation = ["정면", "측면", "후면"];

  const navigation = useNavigation();
  const baseImageURL = Image.resolveAssetSource(PlusIcon).uri;

  // useEffect(() => {
  //   setProfileImage([baseImageURL, baseImageURL, baseImageURL]);
  //   setWantHairImage([]);
  // }, []);

  const saveProfile = async () => {
    setLoading(true);
    console.log(nickname); // 닉네임
    console.log(hairStatusIndex); // 모발상태
    console.log(hairTendencyIndex); // 머리성향
    console.log(wantedStyle); // 원하는 스타일
    console.log(wantedStyleDescription); // 원하는 헤어스타일 설명
    console.log(wantedStylingCost); // 원하는 스타일링 비용
    console.log(stylingDate); // 원하는 시술 날짜
    console.log(stylingTime); // 원하는 시술 시간
    console.log(phoneNumber); // 전화번호
    console.log(wantHairImage);
    if (profileImage[0] == "") {
      Alert.alert("정면 이미지를 첨부해주세요");
      setLoading(false);
    } else if (nickname == "") {
      Alert.alert("닉네임을 입력해주세요");
      setLoading(false);
    } else if (hairStatusIndex == -1) {
      Alert.alert("모발 상태를 선택해주세요");
      setLoading(false);
    } else if (hairTendencyIndex == -1) {
      Alert.alert("머리 성향을 선택해주세요");
      setLoading(false);
    } else if (wantedStyleDescription == "") {
      Alert.alert("원하는 스타일을 설명해주세요");
      setLoading(false);
    } else if (wantedStylingCost == "") {
      Alert.alert("원하는 스타일링 비용을 입력해주세요");
      setLoading(false);
    } else if (stylingDate == undefined || stylingTime == undefined) {
      Alert.alert("시술일정을 선택해주세요");
      setLoading(false);
    } else if (phoneNumber == undefined) {
      Alert.alert("전화번호를 입력해주세요");
      setLoading(false);
    } else {
      // 프로필 생성
      const result = await postUserProfile(
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
      // 이미지 업로드
      console.log(profileImage);
      console.log(wantHairImage);
      const url = await postUserProfileImg(profileImage, wantHairImage);
      console.log(url);
      if (result.data.result == undefined) {
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigation.navigate("Loading", {
          reload: true,
        });
      } else if (result.data.status == "OK" && url.data.status == "OK") {
        navigation.navigate("Location");
      } else {
        Alert.alert("프로필 등록에 실패했습니다.");
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.frame}>
      <ComplexityHeader
        title="프로필"
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
              저장
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
                닉네임<Text style={{ color: "red" }}> *</Text>
              </Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  placeholder="사용할 닉네임을 작성해주세요"
                  placeholderTextColor="#555555"
                  defaultValue={nickname}
                  onChangeText={text => {
                    setNickname(text);
                  }}
                  autoCorrect={false}
                  style={styles.itemTextStyle}
                />
              </View>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={[styles.itemTextStyle]}>
                고객님의 모발 상태<Text style={{ color: "red" }}> *</Text>
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
                머리 성향<Text style={{ color: "red" }}> *</Text>
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
              <Text style={styles.itemTextStyle}>원하는 스타일</Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  onChangeText={text => setWantedStyle(text)}
                  placeholder="예) 투블럭"
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
                      style={styles.wantStyleImage}></WantedStyleButton>
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
                디자이너에게 전하고 싶은 말
                <Text style={{ color: "red" }}> *</Text>
              </Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  value={wantedStyleDescription}
                  onChangeText={text => setWantedStyleDescription(text)}
                  placeholder="자유롭게 작성해주세요."
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
                원하는 스타일링 비용 (단위: 원)
                <Text style={{ color: "red" }}> *</Text>
              </Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  value={wantedStylingCost}
                  onChangeText={text => setWantedStylingCost(text)}
                  placeholder="예) 30000"
                  placeholderTextColor="#555555"
                  style={styles.highlightText}
                  autoCorrect={false}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>
                시술 일정<Text style={{ color: "red" }}> *</Text>
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
                      : "날짜"}
                  </Text>
                  <DateTimePickerModal
                    isVisible={datePickerIsVisible}
                    // date={stylingDate}
                    mode={"date"}
                    onCancel={() => {
                      setDatePickerIsVisible(false);
                    }}
                    onConfirm={val => {
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
                      ? `${stylingTime.getHours()}시 ${stylingTime.getMinutes()}분`
                      : "시간"}
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
                전화번호 <Text style={{ color: "red" }}> * </Text>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(10),
                    color: "#6e6e6e",
                  }}>
                  매칭 성공시 디자이너에게 전달됩니다.
                </Text>
              </Text>

              <View style={styles.userTextUnderline}>
                <TextInput
                  onChangeText={num => setPhoneNumber(onlyPhoneNum(num))}
                  placeholder="전화번호를 입력해주세요."
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
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            width: "88.9%",
            height: verticalScale(55),
            borderRadius: verticalScale(10),
            backgroundColor: "#616161",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            navigation.navigate("NewMain");
          }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: verticalScale(16),
              fontWeight: "600",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#ffffff",
            }}>
            나중에 등록할게요
          </Text>
        </TouchableOpacity>
      </View>
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
