import {
  Alert,
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

const numHairStatus = 3;
const numHairTendency = 5;
const BASEWIDTH = 375;
const BASEPADDING = 20;
const numberOfLines = 4;
const MAINCOLOR = "#fc2a5b";

export default function UserProfileLookup() {
  const [profileImage, setProfileImage] = useState(["", "", ""]);
  const [wantHairImage, setWantHairImage] = useState([]);
  const [wantedStyle, setWantedStyle] = useState("");
  const [wantedStyleDescription, setWantedStyleDescription] = useState("");
  const [wantedStylingCost, setWantedStylingCost] = useState("");
  const [hairStatusIndex, setHairStatusIndex] = useState(-1);
  const [hairTendencyIndex, setHairTendencyIndex] = useState(-1);
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const [timePickerIsVisible, setTimePickerIsVisible] = useState(false);
  const [stylingDate, setStylingDate] = useState(new Date());
  const [stylingTime, setStylingTime] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [nickname, setNickname] = useState("");

  const hairStatus = ["많이 상했어요", "보통이에요", "매우 건강해요"];
  const hairTendency = ["심한 곱슬", "곱슬", "반곱슬", "반직모", "직모"];
  const profileExplanation = ["정면 (필수)", "측면 (선택)", "후면 (선택)"];

  const navigation = useNavigation();
  const baseImageURL = Image.resolveAssetSource(PlusIcon).uri;

  // useEffect(() => {
  //   setProfileImage([baseImageURL, baseImageURL, baseImageURL]);
  //   setWantHairImage([]);
  // }, []);

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
    if (
      nickname != "" &&
      hairStatusIndex != -1 &&
      hairTendencyIndex != -1 &&
      wantedStyleDescription != "" &&
      wantedStylingCost != "" &&
      phoneNumber != undefined &&
      profileImage[0] != ""
    ) {
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
      navigation.navigate("Location");
    } else {
      Alert.alert("필수 항목을 모두 작성해주세요.");
    }
  };

  return (
    <View style={styles.frame}>
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
          style={{ alignItems: "center", paddingBottom: verticalScale(120) }}>
          <View style={{ width: "88.9%" }}>
            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                {profileImage.map((item, index) => {
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
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={styles.itemTextStyle}>닉네임</Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  placeholder="사용할 닉네임을 작성해주세요."
                  placeholderTextColor="#555555"
                  defaultValue={nickname}
                  onEndEditing={e => {
                    setNickname(e.nativeEvent.text);
                  }}
                  autoCorrect={false}
                  style={styles.itemTextStyle}
                />
              </View>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={[styles.itemTextStyle]}>고객님의 모발 상태</Text>
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
              <Text style={styles.itemTextStyle}>머리 성향</Text>
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
              <Text style={styles.itemTextStyle}>원하는 스타일(선택)</Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  onChangeText={text => setWantedStyle(text)}
                  placeholder="예) 투블럭"
                  placeholderTextColor={MAINCOLOR}
                  value={wantedStyle}
                  style={styles.highlightText}></TextInput>
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
                원하는 헤어스타일을 자세히 설명해주세요.
              </Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  value={wantedStyleDescription}
                  onChangeText={text => setWantedStyleDescription(text)}
                  placeholder="자유롭게 작성해주세요."
                  placeholderTextColor={MAINCOLOR}
                  multiline
                  numberOfLines={Platform.OS === "ios" ? null : numberOfLines}
                  minHeight={
                    Platform.OS === "ios" && numberOfLines
                      ? 20 * numberOfLines
                      : null
                  }
                  style={styles.highlightText}></TextInput>
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>원하는 스타일링 비용</Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  value={wantedStylingCost}
                  onChangeText={text => setWantedStylingCost(text)}
                  placeholder="예) 30000"
                  placeholderTextColor={MAINCOLOR}
                  keyboardType="number-pad"
                  style={styles.highlightText}></TextInput>
              </View>
            </View>
            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>시술 일정</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    width: "30%",
                    height: verticalScale(40),
                    justifyContent: "center",
                    borderBottomColor: "#373737",
                    borderBottomWidth: 1,
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
                      : "날짜"}
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
                전화번호 (매칭 성공시 디자이너에게 전달됩니다)
              </Text>

              <View style={styles.userTextUnderline}>
                <TextInput
                  onChangeText={num => setPhoneNumber(num)}
                  placeholder="예) 01012345678"
                  placeholderTextColor={MAINCOLOR}
                  value={phoneNumber}
                  style={styles.highlightText}></TextInput>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
    color: "#fc2a5b",
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
