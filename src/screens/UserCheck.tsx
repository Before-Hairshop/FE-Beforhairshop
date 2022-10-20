import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { scale, verticalScale } from "../utils/scale";
import CheckIcon from "../assets/icons/check.svg";
import { patchMemberType } from "../api/patchMemberType";
import { storeData } from "../utils/asyncStorage";

const { width, height } = Dimensions.get("window");

const wait = timeToDelay =>
  new Promise(resolve => setTimeout(resolve, timeToDelay));

export default function UserCheck() {
  const [isDesigner, setIsDesigner] = useState(undefined);

  const navigation = useNavigation();

  const selectAnswer = async (value: React.SetStateAction<undefined>) => {
    await setIsDesigner(value);
    await wait(200);
    const result = await patchMemberType(value);
    console.log(result);
    if (result.data.status == "OK") {
      if (value) {
        storeData("@DESIGNER_FLAG", "1");
        navigation.navigate("DesignerRegistration");
      } else {
        storeData("@DESIGNER_FLAG", "0");
        navigation.navigate("UserProfile");
      }
    } else {
      Alert.alert("요청에 실패했습니다.");
    }
  };

  return (
    <View style={styles.frame}>
      <Text style={styles.welcome_text}>반갑습니다!</Text>
      <Text style={styles.question_text}>헤어 디자이너인가요?</Text>
      <TouchableOpacity
        onPress={() => selectAnswer(true)}
        style={[
          styles.button_container,
          isDesigner !== undefined && isDesigner && { borderColor: "#fc2a5b" },
        ]}>
        <View style={styles.check_icon_container}>
          <View
            style={[
              styles.circle,
              isDesigner !== undefined &&
                isDesigner && { backgroundColor: "#fc2a5b" },
            ]}>
            <CheckIcon
              fill={
                isDesigner !== undefined && isDesigner ? "#ffffff" : "#5f5f5f"
              }
            />
          </View>
        </View>
        <View style={styles.answer_container}>
          <Text
            style={[
              styles.answer_text,
              isDesigner !== undefined && isDesigner && { opacity: 1 },
            ]}>
            네, 헤어 디자이너입니다.
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selectAnswer(false)}
        style={[
          styles.button_container,
          isDesigner !== undefined && !isDesigner && { borderColor: "#fc2a5b" },
        ]}>
        <View style={styles.check_icon_container}>
          <View
            style={[
              styles.circle,
              isDesigner !== undefined &&
                !isDesigner && { backgroundColor: "#fc2a5b" },
            ]}>
            <CheckIcon
              fill={
                isDesigner !== undefined && !isDesigner ? "#ffffff" : "#5f5f5f"
              }
            />
          </View>
        </View>
        <View style={styles.answer_container}>
          <Text
            style={[
              styles.answer_text,
              isDesigner !== undefined && !isDesigner && { opacity: 1 },
            ]}>
            아니요
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: width,
    height: height,
    backgroundColor: "#191919",
    alignItems: "center",
  },
  welcome_text: {
    fontFamily: "Pretendard",
    fontSize: 30,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 32,
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
    marginTop: verticalScale(130),
  },
  question_text: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#fc2a5b",
    marginTop: verticalScale(15),
    marginBottom: verticalScale(50),
  },
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
  check_icon_container: {
    height: "100%",
    justifyContent: "center",
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: "#2f2f2f",
    alignItems: "center",
    justifyContent: "center",
  },
  answer_container: {
    height: "100%",
    justifyContent: "center",
    marginLeft: scale(10),
  },
  answer_text: {
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
