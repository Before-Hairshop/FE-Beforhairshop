import {
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

import { Platform } from "react-native";
import SimpleHeader from "../components/common/SimpleHeader";
import { readData } from "../utils/asyncStorage";
import ComplexityHeader from "../components/common/ComplexityHeader";

const numHairStatus = 3;
const numHairTendency = 5;
const BASEWIDTH = 375;
const BASEPADDING = 20;
const numberOfLines = 4;
const MAINCOLOR = "#fc2a5b";

const HeaderContents = () => {
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
          [홍길동] 프로필
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}></View>
    </>
  );
};

export default function UserProfileLookup({ route }) {
  const [profileImage, setProfileImage] = useState(["", "", ""]);
  const [wantHairImage, setWantHairImage] = useState([]);
  const [wantedStyle, setWantedStyle] = useState("");
  const [wantedStyleDescription, setWantedStyleDescription] = useState("");
  const [wantedStylingCost, setWantedStylingCost] = useState(0);
  const [hairStatusIndex, setHairStatusIndex] = useState(-1);
  const [hairTendencyIndex, setHairTendencyIndex] = useState(-1);
  const [profileData, setProfileData] = useState();
  const [designerFlag, setDesignerFlag] = useState(undefined);
  const [memberId, setMemberId] = useState(undefined);

  const hairStatus = ["많이 상했어요", "보통이에요", "매우 건강해요"];
  const hairTendency = ["심한 곱슬", "곱슬", "반곱슬", "반직모", "직모"];
  const profileExplanation = ["정면", "측면", "후면"];

  const baseImageURL = Image.resolveAssetSource(PlusIcon).uri;
  const navigation = useNavigation();

  async function fetchData() {
    setDesignerFlag(await readData("@DESIGNER_FLAG"));
    setMemberId(await readData("@MEMBER_ID"));
  }

  useEffect(() => {
    fetchData();
    console.log(route.params.data);
    setProfileImage([
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ]);

    setWantHairImage([
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ]);

    setHairStatusIndex(1);
    setHairTendencyIndex(3);

    setWantedStyle("투블럭");
    setWantedStyleDescription("예쁘게 해주세요");

    setWantedStylingCost("30000");
  }, []);

  const ImageUploadButton = props => {
    return (
      <TouchableOpacity style={props.style} disabled>
        <Image
          source={{ uri: props.uri }}
          style={{ width: "100%", aspectRatio: 1 }}
        />
      </TouchableOpacity>
    );
  };

  const WantedStyleButton = props => {
    return (
      <TouchableOpacity style={props.style} disabled>
        <Image
          source={{ uri: wantHairImage[props.index] }}
          style={{ width: "100%", aspectRatio: 1 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.frame}>
      {memberId != undefined && memberId == route.params.data.memberId && (
        <ComplexityHeader
          title={route.params.data.name}
          goBack="Main"
          button={
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("UserProfileModify");
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
                수정
              </Text>
            </TouchableOpacity>
          }
        />
      )}
      {memberId != undefined && memberId != route.params.data.memberId && (
        <SimpleHeader title={route.params.data.name} goBack="Main" />
      )}
      {/* <Header contents={<HeaderContents></HeaderContents>}></Header> */}
      {designerFlag != undefined && designerFlag == "1" && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Button
            buttonStyle={{
              backgroundColor: "#fc2a5b",
              borderRadius: 10,
              width: scale(110),
              marginBottom: verticalScale(5),
            }}
            onPress={() =>
              navigation.navigate("Answer", {
                memberId: route.params.data.id,
                treatmentDate: route.params.data.treatmentDate,
              })
            }>
            매칭 제안
          </Button>
        </View>
      )}

      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <View style={{ width: "88.9%", paddingBottom: verticalScale(120) }}>
            <View style={{ alignItems: "center", margin: verticalScale(10) }}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: "30%",
                    alignItems: "center",
                    margin: verticalScale(10),
                  }}>
                  <ImageUploadButton
                    // index={index}
                    uri={route.params.data.frontImageUrl}
                    // toChangeArray={profileImage}
                    // toChangeFunction={setProfileImage}
                    style={styles.userProfileImage}
                  />
                  <Text
                    style={{
                      color: "white",
                      paddingTop: verticalScale(10),
                    }}>
                    {profileExplanation[0]}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    alignItems: "center",
                    margin: verticalScale(10),
                  }}>
                  <ImageUploadButton
                    // index={index}
                    uri={route.params.data.sideImageUrl}
                    // toChangeArray={profileImage}
                    // toChangeFunction={setProfileImage}
                    style={styles.userProfileImage}
                  />
                  <Text
                    style={{
                      color: "white",
                      paddingTop: verticalScale(10),
                    }}>
                    {profileExplanation[1]}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    alignItems: "center",
                    margin: verticalScale(10),
                  }}>
                  <ImageUploadButton
                    // index={index}
                    uri={route.params.data.backImageUrl}
                    // toChangeArray={profileImage}
                    // toChangeFunction={setProfileImage}
                    style={styles.userProfileImage}
                  />
                  <Text
                    style={{
                      color: "white",
                      paddingTop: verticalScale(10),
                    }}>
                    {profileExplanation[2]}
                  </Text>
                </View>
                {/* {profileImage.map((item, index) => {
                  return (
                    <View
                      style={{
                        width: "30%",
                        alignItems: "center",
                        margin: verticalScale(10),
                      }}>
                      <ImageUploadButton
                        index={index}
                        toChangeArray={profileImage}
                        toChangeFunction={setProfileImage}
                        style={styles.userProfileImage}/>
                      <Text
                        style={{
                          color: "white",
                          paddingTop: verticalScale(10),
                        }}>
                        {profileExplanation[index]}
                      </Text>
                    </View>
                  );
                })} */}
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
                      disabled
                      isActive={index == route.params.data.hairCondition - 1}
                    />
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
                      disabled
                      isActive={index == route.params.data.hairTendency - 1}
                    />
                  );
                })}
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>원하는 스타일</Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  placeholder="예) 투블럭"
                  placeholderTextColor={MAINCOLOR}
                  value={route.params.data.desiredHairstyle}
                  editable={false}
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
                      style={styles.wantStyleImage}></WantedStyleButton>
                  );
                })}
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>
                원하는 헤어스타일을 자세히 설명해주세요.
              </Text>

              <View style={styles.userTextUnderline}>
                <TextInput
                  editable={false}
                  value={route.params.data.desiredHairstyleDescription}
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
              <Text style={styles.itemTextStyle}>원하는 스타일링 비용 </Text>

              <View style={styles.userTextUnderline}>
                <TextInput
                  editable={false}
                  value={route.params.data.payableAmount.toLocaleString()}
                  // onChangeText={text => setWantedStylingCost(text)}
                  placeholder="예) 30000"
                  placeholderTextColor={MAINCOLOR}
                  keyboardType="number-pad"
                  style={styles.highlightText}></TextInput>
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>시술 받을 날짜</Text>

              <View style={styles.userTextUnderline}>
                <TextInput
                  editable={false}
                  value={
                    route.params.data.treatmentDate.substring(0, 10) +
                    " " +
                    route.params.data.treatmentDate.substring(11, 13) +
                    "시 " +
                    route.params.data.treatmentDate.substring(14, 16) +
                    "분"
                  }
                  // onChangeText={text => setWantedStylingCost(text)}
                  // placeholder="예) 30000"
                  placeholderTextColor={MAINCOLOR}
                  keyboardType="number-pad"
                  style={styles.highlightText}></TextInput>
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
