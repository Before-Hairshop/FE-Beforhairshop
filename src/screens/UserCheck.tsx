import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { scale, verticalScale } from "../utils/scale";
import { useNavigation } from "@react-navigation/native";
import CheckIcon from "../assets/icons/check.svg";

const { width, height } = Dimensions.get("window");

export default function UserCheck() {
  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: "#191919",
        alignItems: "center",
      }}>
      <Text
        style={{
          fontFamily: "Pretendard",
          fontSize: 30,
          fontWeight: "normal",
          fontStyle: "normal",
          lineHeight: 32,
          letterSpacing: 0,
          textAlign: "left",
          color: "#ffffff",
          marginTop: verticalScale(130),
        }}>
        반갑습니다!
      </Text>
      <Text
        style={{
          fontFamily: "Pretendard",
          fontSize: 16,
          fontWeight: "500",
          fontStyle: "normal",
          letterSpacing: 0,
          textAlign: "left",
          color: "#fc2a5b",
          marginTop: verticalScale(15),
          marginBottom: verticalScale(50),
        }}>
        헤어 디자이너인가요?
      </Text>
      <TouchableOpacity
        style={[styles.button_container, { borderColor: "#fc2a5b" }]}>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
          }}>
          <View
            style={{
              width: 25,
              height: 25,
              borderRadius: 25 / 2,
              backgroundColor: "#fc2a5b",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <CheckIcon fill="#ffffff" />
          </View>
        </View>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            marginLeft: scale(10),
          }}>
          <Text style={[styles.button_text, { opacity: 1 }]}>
            네, 헤어 디자이너입니다.
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button_container, { borderColor: "#2f2f2f" }]}>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
          }}>
          <View
            style={{
              width: 25,
              height: 25,
              borderRadius: 25 / 2,
              backgroundColor: "#2f2f2f",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <CheckIcon fill="#5f5f5f" />
          </View>
        </View>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            marginLeft: scale(10),
          }}>
          <Text style={styles.button_text}>아니요</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button_container: {
    width: "89%",
    height: verticalScale(70),
    borderRadius: 15,
    backgroundColor: "#0c0c0c",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#2f2f2f",
    paddingLeft: scale(20),
    marginBottom: verticalScale(10),
    flexDirection: "row",
  },
  button_text: {
    opacity: 0.34,
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 32,
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
});
