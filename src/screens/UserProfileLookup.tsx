import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { verticalScale, scale } from "../utils/scale";
import { Button } from "@rneui/themed";
import { Image } from "react-native";
import { useState } from "react";
import HairButton from "../components/UserProfile/HairButton";
import PlusIcon from "../assets/icons/plus.png";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import SimpleHeader from "../components/common/SimpleHeader";
import { readData } from "../utils/asyncStorage";
import ComplexityHeader from "../components/common/ComplexityHeader";
import { getUserProfileById } from "../api/getUserProfileById";
import DefaultPerson from "../assets/images/default_user.png";
import ImageModal from "../components/common/ImageModal";

const numHairStatus = 3;
const numHairTendency = 5;
const BASEWIDTH = 375;
const BASEPADDING = 20;
const numberOfLines = 4;
const MAINCOLOR = "#fc2a5b";

export default function UserProfileLookup({ route }) {
  const [profileData, setProfileData] = useState();
  const [designerFlag, setDesignerFlag] = useState(undefined);
  const [memberId, setMemberId] = useState(undefined);
  const [openImgUri, setOpenImgUri] = useState(null);

  const hairStatus = ["많이 상했어요", "보통이에요", "매우 건강해요"];
  const hairTendency = ["악성 곱슬", "심한 곱슬", "반곱슬", "반직모", "직모"];
  const profileExplanation = ["정면", "측면", "후면"];

  const baseImageURL = Image.resolveAssetSource(PlusIcon).uri;
  const navigation = useNavigation();

  async function fetchData() {
    const result = await getUserProfileById(route.params.userProfileId);
    console.log(result);
    if (result.data.result == undefined) {
      Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
      navigation.navigate("Loading", {
        reload: true,
      });
    } else if (result.data.status == "OK") {
      setProfileData(result.data.result);
    } else {
      Alert.alert("데이터를 불러오는데 실패했습니다.");
    }
    setDesignerFlag(await readData("@DESIGNER_FLAG"));
    setMemberId(await readData("@MEMBER_ID"));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const ImageUploadButton = props => {
    return (
      <Pressable
        style={props.style}
        onPress={() => {
          setOpenImgUri(props.uri);
        }}>
        {props.uri != null ? (
          <Image
            source={{ uri: props.uri }}
            style={{ width: "100%", aspectRatio: 1 }}
          />
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image source={DefaultPerson} style={{ width: "100%" }} />
          </View>
        )}
      </Pressable>
    );
  };

  const WantedStyleButton = props => {
    return (
      <Pressable
        style={props.style}
        onPress={() => {
          setOpenImgUri(props.img.imageUrl);
        }}>
        <Image
          source={{ uri: props.img.imageUrl }}
          style={{ width: "100%", aspectRatio: 1 }}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.frame}>
      {memberId != undefined &&
        profileData != undefined &&
        memberId == profileData.memberProfileDto.memberId && (
          <ComplexityHeader
            title={profileData.memberProfileDto.name}
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
                  편집
                </Text>
              </TouchableOpacity>
            }
          />
        )}
      {memberId != undefined &&
        profileData != undefined &&
        memberId != profileData.memberProfileDto.memberId && (
          <SimpleHeader
            title={profileData.memberProfileDto.name}
            goBack="Main"
          />
        )}
      {/* <Header contents={<HeaderContents></HeaderContents>}></Header> */}
      {designerFlag != undefined &&
        profileData != undefined &&
        designerFlag == "1" && (
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
                  memberProfileId: profileData.memberProfileDto.id,
                  treatmentDate: profileData.memberProfileDto.treatmentDate,
                })
              }>
              매칭 제안
            </Button>
          </View>
        )}

      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <ImageModal uri={openImgUri} setUri={setOpenImgUri} />
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
                    index={0}
                    uri={
                      profileData != undefined
                        ? profileData.memberProfileDto.frontImageUrl
                        : null
                    }
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
                    index={1}
                    uri={
                      profileData != undefined
                        ? profileData.memberProfileDto.sideImageUrl
                        : null
                    }
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
                    index={2}
                    uri={
                      profileData != undefined
                        ? profileData.memberProfileDto.backImageUrl
                        : null
                    }
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
                {profileData != undefined &&
                  hairStatus.map((item, index) => {
                    return (
                      <HairButton
                        width={scale(
                          (BASEWIDTH - BASEPADDING * 2) / numHairStatus,
                        )}
                        index={index}
                        content={hairStatus[index]}
                        disabled
                        isActive={
                          index ==
                          profileData.memberProfileDto.hairCondition - 1
                        }
                      />
                    );
                  })}
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>머리 성향</Text>

              <View style={{ flexDirection: "row" }}>
                {profileData != undefined &&
                  hairTendency.map((item, index) => {
                    return (
                      <HairButton
                        width={scale(
                          (BASEWIDTH - BASEPADDING * 2) / numHairTendency,
                        )}
                        index={index}
                        content={hairTendency[index]}
                        disabled
                        isActive={
                          index == profileData.memberProfileDto.hairTendency - 1
                        }
                      />
                    );
                  })}
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>원하는 스타일</Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  value={
                    profileData != undefined
                      ? profileData.memberProfileDto.desiredHairstyle
                      : null
                  }
                  editable={false}
                  style={styles.highlightText}></TextInput>
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <View
                style={{ flexDirection: "row", marginTop: verticalScale(12) }}>
                {profileData != undefined &&
                  profileData.desiredHairstyleImageDtoList != null &&
                  profileData.desiredHairstyleImageDtoList.map(
                    (item, index) => {
                      return (
                        <WantedStyleButton
                          index={index}
                          img={item}
                          style={styles.wantStyleImage}
                        />
                      );
                    },
                  )}
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>
                디자이너에게 전하고 싶은 말
              </Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  editable={false}
                  value={
                    profileData != undefined
                      ? profileData.memberProfileDto.desiredHairstyleDescription
                      : null
                  }
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
                  editable={false}
                  value={
                    profileData != undefined
                      ? `${profileData.memberProfileDto.payableAmount.toLocaleString()}원`
                      : null
                  }
                  style={styles.highlightText}></TextInput>
              </View>
            </View>

            <View style={{ marginTop: 12, alignItems: "flex-start" }}>
              <Text style={styles.itemTextStyle}>시술 받을 날짜</Text>
              <View style={styles.userTextUnderline}>
                <TextInput
                  editable={false}
                  value={
                    profileData != undefined
                      ? profileData.memberProfileDto.treatmentDate.substring(
                          0,
                          4,
                        ) +
                        "년 " +
                        profileData.memberProfileDto.treatmentDate.substring(
                          5,
                          7,
                        ) +
                        "월 " +
                        profileData.memberProfileDto.treatmentDate.substring(
                          8,
                          10,
                        ) +
                        "일 " +
                        profileData.memberProfileDto.treatmentDate.substring(
                          11,
                          13,
                        ) +
                        "시 " +
                        profileData.memberProfileDto.treatmentDate.substring(
                          14,
                          16,
                        ) +
                        "분"
                      : null
                  }
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
    borderWidth: 1,
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
