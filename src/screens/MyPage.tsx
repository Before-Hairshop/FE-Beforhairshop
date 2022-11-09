import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { scale, verticalScale } from "../utils/scale";
import SimpleHeader from "../components/common/SimpleHeader";
import Contour from "../components/common/Contour";
import DefaultProfileImg from "../assets/images/mypage/default_profile.png";
import RightArrowIcon from "../assets/icons/common/arrow.svg";
import BigContour from "../components/common/BigContour";
import MypageItem from "../components/mypage/MypageItem";
import { useNavigation } from "@react-navigation/native";
import { readData, removeData } from "../utils/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASEURL } from "../api/baseUrl";
import { patchLogout } from "../api/patchLogout";
import { deleteMember } from "../api/deleteMember";
import LocationIcon from "../assets/icons/location.svg";

export default function Mypage({ route }) {
  const [designerFlag, setDesignerFlag] = useState(undefined);

  const navigation = useNavigation();

  async function moveProfilePage() {
    console.log(route.params.data);
    if ((await readData("@DESIGNER_FLAG")) == "1") {
      navigation.navigate("DesignerProfile", {
        designerId: route.params.data.hairDesignerId,
      });
    } else {
      navigation.navigate("UserProfileLookup", {
        userProfileId: route.params.data.id,
      });
    }
  }

  async function moveRegisterPage() {
    if ((await readData("@DESIGNER_FLAG")) == "1") {
      navigation.navigate("DesignerRegistration");
    } else {
      navigation.navigate("UserProfile");
    }
  }

  function logout() {
    patchLogout().then(res => {
      console.log(res);
      if (res.data.result == undefined) {
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigation.navigate("Loading", {
          reload: true,
        });
      } else if (res.data.status == "OK") {
        navigation.navigate("Loading", {
          reload: true,
        });
      } else {
        Alert.alert("로그아웃 실패");
      }
    });
    // setModal(true);
    // await removeData("@SESSION_ID");
    // console.log(await readData("@SESSION_ID"));
  }

  function resignMember() {
    deleteMember().then(res => {
      console.log(res);
      if (res.data.result == undefined) {
        Alert.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigation.navigate("Loading", {
          reload: true,
        });
      } else if (res.data.status == "OK") {
        Alert.alert("회원탈퇴가 완료되었습니다.");
        navigation.navigate("Loading", {
          reload: true,
        });
      } else {
        Alert.alert("회원탈퇴 실패");
      }
    });
  }

  useEffect(() => {
    console.log(route);
    readData("@DESIGNER_FLAG").then(data => {
      setDesignerFlag(data);
    });
  }, []);

  return (
    <SafeAreaView style={styles.frame}>
      <SimpleHeader title="마이페이지" goBack="Main" />
      <Contour style={{ opacity: 0.1 }} />
      {route.params.data != undefined &&
        designerFlag != undefined &&
        designerFlag == "0" && (
          <View
            style={{
              width: "100%",
              height: verticalScale(30),
              alignItems: "flex-end",
              paddingRight: verticalScale(7),
            }}>
            <Pressable
              style={{
                height: "100%",
                flexDirection: "row",
              }}
              onPress={() => {
                navigation.navigate("Location");
              }}>
              <View style={{ height: "100%", justifyContent: "center" }}>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(10),
                    fontWeight: "600",
                    letterSpacing: -0.5,
                    textAlign: "center",
                    color: "#ffffff",
                  }}>
                  {route.params.data.zipAddress.split(" ")[1]}{" "}
                  {route.params.data.zipAddress.split(" ")[2]}
                  {"   "}
                </Text>
              </View>
              <View style={{ height: "100%", justifyContent: "center" }}>
                <LocationIcon />
              </View>
            </Pressable>
          </View>
        )}
      {route.params.data != undefined && designerFlag != undefined ? (
        <TouchableOpacity
          style={{ height: verticalScale(120), alignItems: "center" }}
          onPress={() => {
            moveProfilePage();
          }}>
          <View
            style={{
              width: "88.8%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}>
            <View
              style={{
                width: "26%",
                justifyContent: "center",
              }}>
              <Image
                source={{
                  uri:
                    designerFlag == "1"
                      ? route.params.data.imageUrl
                      : route.params.data.frontImageUrl,
                }}
                style={{
                  width: scale(70),
                  height: scale(70),
                  borderRadius: 1000,
                  borderWidth: 1,
                  borderColor: "#323232",
                }}
              />
            </View>
            <View style={{ width: "62%", justifyContent: "center" }}>
              {designerFlag == "1" ? (
                <View
                  style={{
                    width: scale(45),
                    height: verticalScale(18),
                    borderRadius: 100,
                    borderStyle: "solid",
                    borderWidth: 0.8,
                    borderColor: "#fc2a5b",
                    justifyContent: "center",
                    marginVertical: verticalScale(2.5),
                  }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: scale(10),
                      fontWeight: "normal",
                      letterSpacing: -0.5,
                      textAlign: "center",
                      color: "#fc2a5b",
                    }}>
                    디자이너
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    width: scale(29),
                    height: verticalScale(18),
                    borderRadius: 100,
                    borderStyle: "solid",
                    borderWidth: 0.8,
                    borderColor: "#fc2a5b",
                    justifyContent: "center",
                    marginVertical: verticalScale(2.5),
                  }}>
                  <Text
                    style={{
                      fontFamily: "Pretendard",
                      fontSize: scale(10),
                      fontWeight: "normal",
                      letterSpacing: -0.5,
                      textAlign: "center",
                      color: "#fc2a5b",
                    }}>
                    유저
                  </Text>
                </View>
              )}
              {/* <View
            style={{
              width: scale(29),
              height: verticalScale(18),
              borderRadius: 100,
              borderStyle: "solid",
              borderWidth: 0.8,
              borderColor: "#fc2a5b",
              justifyContent: "center",
              marginVertical: verticalScale(2.5),
            }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: scale(10),
                fontWeight: "normal",
                letterSpacing: -0.5,
                textAlign: "center",
                color: "#fc2a5b",
              }}>
              유저
            </Text>
          </View> */}
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: scale(20),
                  fontWeight: "normal",
                  letterSpacing: -0.2,
                  textAlign: "left",
                  color: "#ffffff",
                  marginVertical: verticalScale(2.5),
                }}>
                {route.params.data.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: verticalScale(2.5),
                }}>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(12),
                    fontWeight: "normal",
                    letterSpacing: -0.12,
                    textAlign: "left",
                    color: "#cccccc",
                  }}>
                  회원등급{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(12),
                    fontWeight: "normal",
                    letterSpacing: -0.12,
                    textAlign: "left",
                    color: "#fc2a5b",
                  }}>
                  일반
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "12%",
                alignItems: "flex-end",
                justifyContent: "center",
                opacity: 0.34,
              }}>
              <RightArrowIcon />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            height: verticalScale(120),
            alignItems: "center",
            justifyContent: "center",
          }}>
          <TouchableOpacity
            style={{
              width: "88.8%",
              backgroundColor: "#0c0c0c",
              padding: 20,
              borderRadius: 15,
              shadowColor: "rgba(0, 0, 0, 0.25)",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowRadius: 10,
              shadowOpacity: 1,
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0)",
              alignItems: "center",
            }}
            onPress={() => {
              moveRegisterPage();
            }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(16),
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#ffffff",
              }}>
              프로필 등록하기
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <BigContour />
      {/* <MypageItem
        title="찜 목록"
        navigate="Main"
        action={() => {
          Alert.alert("준비중");
        }}
      /> */}
      {/* <MypageItem
        title="공지사항"
        navigate="Main"
        action={() => {
          Alert.alert("준비중");
        }}
      /> */}
      <MypageItem
        title="고객센터"
        navigate="Main"
        action={() => {
          navigation.navigate("ServiceCenter");
        }}
      />
      <MypageItem
        title="로그아웃"
        navigate="Main"
        action={() => {
          logout();
        }}
      />
      <MypageItem
        title="회원탈퇴"
        navigate="Main"
        action={() => {
          Alert.alert("회원탈퇴", "정말로 탈퇴하시겠습니까?", [
            { text: "취소" },
            {
              text: "탈퇴",
              onPress: () => {
                resignMember();
              },
            },
          ]);
        }}
      />
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
});
