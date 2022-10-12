import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { scale, verticalScale } from "../utils/scale";
import SimpleHeader from "../components/common/SimpleHeader";
import Contour from "../components/common/Contour";
import DefaultProfileImg from "../assets/images/mypage/default_profile.png";
import RightArrowIcon from "../assets/icons/common/arrow.svg";
import BigContour from "../components/common/BigContour";
import MypageItem from "../components/mypage/MypageItem";
import { useNavigation } from "@react-navigation/native";
import { readData } from "../utils/asyncStorage";

export default function Mypage() {
  const navigation = useNavigation();

  async function moveProfilePage() {
    if ((await readData("@DESIGNER_FLAG")) == "1") {
      navigation.navigate("DesignerProfile");
    } else {
      navigation.navigate("UserProfileLookup");
    }
  }

  return (
    <View style={styles.frame}>
      <SimpleHeader title="마이페이지" goBack="Main" />
      <Contour style={{ opacity: 0.1 }} />
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
              source={DefaultProfileImg}
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
              대머리 무지
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
                프리미엄
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
      <BigContour />
      <MypageItem title="찜 목록" navigate="Main" />
      <MypageItem title="공지사항" navigate="Main" />
      <MypageItem title="고객센터" navigate="Main" />
      <MypageItem title="로그아웃" navigate="Main" />
      <MypageItem title="회원탈퇴" navigate="Main" />
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
});
