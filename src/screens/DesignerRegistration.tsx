import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import GoBackIcon from "../assets/icons/goBack.svg";
import { useState } from "react";
import { Platform } from "react-native";
import PlusIcon from "../assets/icons/plus.png";
import { verticalScale, scale } from "../utils/scale";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import ProfileUploadButton from "../components/common/ProfileUploadButton";

const BASEWIDTH = 375;
const BASEPADDING = 20;
const numberOfLines = 4;
const MAINCOLOR = "#fc2a5b";
const GRAYCOLOR = "#555555";

const baseImageURL = Image.resolveAssetSource(PlusIcon).uri;
const HeaderContents = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flex: 1 }}>
        <GoBackIcon />
      </View>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Pretendard-Bold",
            fontSize: verticalScale(18),
            fontWeight: "bold",
            fontStyle: "normal",
            letterSpacing: 0.07,
            textAlign: "left",
            color: "#ffffff",
          }}>
          프로필
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Text style={{ color: MAINCOLOR }}>저장</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default function Loading() {
  const [profileImage, setProfileImage] = useState([baseImageURL]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [specificLocation, setSpecificLocation] = useState("");
  const [styleList, setStyleList] = useState("");
  const [priceInfo, setPriceInfo] = useState("");
  const [schedule, setSchedule] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View style={styles.mainView}>
      <Header contents={<HeaderContents></HeaderContents>}></Header>
      <ScrollView>
        <View style={{ alignItems: "center", margin: verticalScale(10) }}>
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
                    style={styles.userProfileImage}></ProfileUploadButton>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>이름</Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="이름을 작성해주세요."
              placeholderTextColor={GRAYCOLOR}
              defaultValue={name}
              onEndEditing={e => {
                setName(e.nativeEvent.text);
              }}
              autoCorrect={false}
              style={styles.inputText}></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>자기 소개 </Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              autoCorrect={false}
              placeholder="프로필에 들어갈 자기소개를 작성해주세요."
              placeholderTextColor={GRAYCOLOR}
              defaultValue={description}
              onEndEditing={e => {
                setDescription(e.nativeEvent.text);
              }}
              multiline
              numberOfLines={Platform.OS === "ios" ? null : numberOfLines}
              minHeight={
                Platform.OS === "ios" && numberOfLines
                  ? 20 * numberOfLines
                  : null
              }
              textAlignVertical="top"
              style={styles.inputText}></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>주요 헤어스타일(선택) </Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="#태그"
              placeholderTextColor={GRAYCOLOR}
              defaultValue={description}
              onEndEditing={e => {
                setDescription(e.nativeEvent.text);
              }}
              style={[styles.inputText]}></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>가격 </Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="예) 30000"
              placeholderTextColor={GRAYCOLOR}
              style={styles.inputText}></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>헤어샵 이름</Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="헤어샵 이름을 입력해주세요."
              placeholderTextColor={GRAYCOLOR}
              style={styles.inputText}></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>헤어샵 위치</Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="우편 번호로 찾기"
              placeholderTextColor={GRAYCOLOR}
              style={styles.inputText}></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>상세 주소 입력</Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="상세 주소를 입력해주세요."
              placeholderTextColor={GRAYCOLOR}
              style={styles.inputText}></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>근무 일정</Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="예) 투블럭"
              placeholderTextColor={GRAYCOLOR}
              style={styles.inputText}></TextInput>
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>전화 번호</Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="전화 번호를 입력해주세요."
              placeholderTextColor={GRAYCOLOR}
              style={styles.inputText}></TextInput>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: 20,

    backgroundColor: "#191919",
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

  userTextUnderline: {
    borderBottomColor: "#373737",
    borderBottomWidth: 1,
    width: "100%",
  },

  itemTextStyle: {
    fontFamily: "Pretendard",
    fontSize: scale(16),

    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),

    letterSpacing: 0,

    color: "#ffffff",
  },

  inputText: {
    fontFamily: "Pretendard",
    fontSize: scale(16),

    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),
    color: "#cccccc",
  },
});
