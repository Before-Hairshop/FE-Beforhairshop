import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { scale, verticalScale } from "../utils/scale";
import { useNavigation } from "@react-navigation/native";
import GoBackIcon from "../assets/icons/goBack.svg";

const { width, height } = Dimensions.get("window");

const Header = () => (
  <View
    style={{
      marginTop: Platform.OS === "ios" ? verticalScale(40) : verticalScale(0),
      height: verticalScale(70),
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: verticalScale(15),
      paddingBottom: verticalScale(15),
      paddingLeft: verticalScale(8),
      paddingRight: verticalScale(8),
    }}>
    <TouchableOpacity
      style={{
        width: scale(40),
        height: verticalScale(40),
        alignItems: "center",
        justifyContent: "center",
      }}>
      <GoBackIcon />
    </TouchableOpacity>
    <View style={{ height: "100%", justifyContent: "center" }}>
      <Text
        style={{
          fontFamily: "Pretendard",
          fontSize: 18,
          fontWeight: "600",
          fontStyle: "normal",
          letterSpacing: 0,
          textAlign: "center",
          color: "#ffffff",
        }}>
        지도에서 위치 확인
      </Text>
    </View>
    <View style={{ width: scale(40), height: verticalScale(40) }} />
  </View>
);

export default function Location() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: "#191919",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
      }}>
      <Header />
      <View style={{ backgroundColor: "black", height: verticalScale(464) }} />
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({});
