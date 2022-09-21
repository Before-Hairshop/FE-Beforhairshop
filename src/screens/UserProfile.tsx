import {
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

const numHairStatus = 3;
const numHairTendency = 5;
const BASEWIDTH = 375;
const BASEPADDING = 20;
const numberOfLines = 4;
const MAINCOLOR = "#fc2a5b";

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

export default function UserProfileLookup() {
  const [profileImage, setProfileImage] = useState(["", "", ""]);

  const [wantHairImage, setWantHairImage] = useState([]);

  const [wantedStyle, setWantedStyle] = useState("");
  const [wantedStyleDescription, setWantedStyleDescription] = useState("");
  const [wantedStylingCost, setWantedStylingCost] = useState(0);

  const [hairStatusIndex, setHairStatusIndex] = useState(-1);
  const [hairTendencyIndex, setHairTendencyIndex] = useState(-1);

  const [numWantedStyle, setNumWantedStyle] = useState(0);

  const hairStatus = ["많이 상했어요", "보통이에요", "매우 건강해요"];
  const hairTendency = ["심한 곱슬", "곱슬", "반곱슬", "반직모", "직모"];
  const profileExplanation = ["정면 (필수)", "측면 (선택)", "뒷면 (선택)"];

  const baseImageURL = Image.resolveAssetSource(PlusIcon).uri;
  useEffect(() => {
    setProfileImage([baseImageURL, baseImageURL, baseImageURL]);

    setWantHairImage([]);
  }, []);

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

                  <Text
                    style={{ color: "white", paddingTop: verticalScale(10) }}>
                    {profileExplanation[index]}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={[styles.itemTextStyle]}>고객님의 모발 상태</Text>

          <View style={{ flexDirection: "row" }}>
            {hairStatus.map((item, index) => {
              return (
                <HairButton
                  width={scale((BASEWIDTH - BASEPADDING * 2) / numHairStatus)}
                  index={index}
                  content={hairStatus[index]}
                  isActive={index == hairStatusIndex}
                  onPressActive={() => setHairStatusIndex(index)}
                  onPressDeactive={() => setHairStatusIndex(-1)}></HairButton>
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
                  width={scale((BASEWIDTH - BASEPADDING * 2) / numHairTendency)}
                  index={index}
                  content={hairTendency[index]}
                  isActive={index == hairTendencyIndex}
                  onPressActive={() => setHairTendencyIndex(index)}
                  onPressDeactive={() => setHairTendencyIndex(-1)}></HairButton>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>원하는 스타일 </Text>

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
          <View style={{ flexDirection: "row", marginTop: verticalScale(12) }}>
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
                setArray={setWantHairImage}></WantedStyleUploadButton>
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
          <Text style={styles.itemTextStyle}> 원하는 스타일링 비용 </Text>

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
