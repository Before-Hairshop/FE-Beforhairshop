import {
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
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
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
import { getUserProfile } from "../api/getUserProfile";
import { patchUserProfile } from "../api/patchUserProfile";
import { patchUserProfileImg } from "../api/patchUserProfileImg";

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

  const hairStatus = ["많이 상했어요", "보통이에요", "매우 건강해요"];
  const hairTendency = ["심한 곱슬", "곱슬", "반곱슬", "반직모", "직모"];
  const profileExplanation = ["정면", "측면", "후면"];

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
    } else if (nickname == "") {
      Alert.alert("닉네임을 입력해주세요");
    } else if (hairStatusIndex == -1) {
      Alert.alert("모발 상태를 선택해주세요");
    } else if (hairTendencyIndex == -1) {
      Alert.alert("머리 성향을 선택해주세요");
    } else if (wantedStyleDescription == "") {
      Alert.alert("원하는 스타일을 설명해주세요");
    } else if (wantedStylingCost == "") {
      Alert.alert("원하는 스타일링 비용을 입력해주세요");
    } else if (stylingDate == undefined || stylingTime == undefined) {
      Alert.alert("시술일정을 선택해주세요");
    } else if (phoneNumber == undefined) {
      Alert.alert("전화번호를 입력해주세요");
    } else {
      // 프로필 생성
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
      // 이미지 업로드
      // console.log(profileImage);
      // console.log(wantHairImage);
      // const url = await postUserProfileImg(profileImage, wantHairImage);
      // console.log(url);
      navigation.navigate("NewMain");
    }
  };

  return (
    <SafeAreaView style={styles.frame}>
      <ComplexityHeader
        title="프로필 수정"
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
          style={{ alignItems: "center", paddingBottom: verticalScale(120) }}>
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
                원하는 헤어스타일을 자세히 설명해주세요
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
                원하는 스타일링 비용<Text style={{ color: "red" }}> *</Text>
              </Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  value={wantedStylingCost}
                  onChangeText={text => setWantedStylingCost(text)}
                  placeholder="예) 30000"
                  placeholderTextColor="#555555"
                  keyboardType="number-pad"
                  style={styles.highlightText}
                  autoCorrect={false}
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
                      color: "#555555",
                    }}>
                    {stylingDate != undefined
                      ? `${stylingDate.getFullYear()}. ${
                          stylingDate.getMonth() + 1
                        }. ${stylingDate.getDate()}`
                      : "날짜"}
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
                      color: "#555555",
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
                전화번호 <Text style={{ color: "red" }}> *</Text>
              </Text>

              <View style={styles.userTextUnderline}>
                <TextInput
                  onChangeText={num => setPhoneNumber(num)}
                  placeholder="예) 010-1234-5678"
                  placeholderTextColor="#555555"
                  value={phoneNumber}
                  style={styles.highlightText}
                  autoCorrect={false}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
