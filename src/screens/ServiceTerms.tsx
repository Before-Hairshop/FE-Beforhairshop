import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { scale, verticalScale } from "../utils/scale";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import CheckIcon from "../assets/icons/check.svg";
import { term1 } from "../components/serviceTerms/term1";
import { term2 } from "../components/serviceTerms/term2";
import { term3 } from "../components/serviceTerms/term3";

const { width, height } = Dimensions.get("window");

export default function ServiceTerms() {
  const navigation = useNavigation();
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  return (
    <View style={styles.frame}>
      <View style={styles.container}>
        <Text style={styles.title}>이용약관</Text>
        <View style={styles.division} />
        <ScrollView style={styles.contents_container}>
          <View>
            <View
              style={{
                height: verticalScale(55),
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(15),
                    fontWeight: "500",
                    fontStyle: "normal",
                    lineHeight: 32,
                    textAlign: "left",
                    color: "#ffffff",
                  }}>
                  비포헤어샵 이용약관
                  <Text style={{ color: "red" }}> *</Text>
                </Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    setCheck1(!check1);
                  }}>
                  <View
                    style={[
                      styles.circle,
                      check1 && { backgroundColor: "#fc2a5b" },
                    ]}>
                    <CheckIcon fill={check1 ? "#ffffff" : "#5f5f5f"} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              style={{
                borderRadius: 15,
                height: verticalScale(120),
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: verticalScale(10),
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: verticalScale(10),
                  fontWeight: "500",
                  fontStyle: "normal",
                  textAlign: "left",
                  color: "#000000",
                }}>
                {term1}
              </Text>
            </ScrollView>
          </View>

          <View>
            <View
              style={{
                height: verticalScale(55),
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(15),
                    fontWeight: "500",
                    fontStyle: "normal",
                    lineHeight: 32,
                    textAlign: "left",
                    color: "#ffffff",
                  }}>
                  비포헤어샵 위치정보 이용약관
                  <Text style={{ color: "red" }}> *</Text>
                </Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    setCheck2(!check2);
                  }}>
                  <View
                    style={[
                      styles.circle,
                      check2 && { backgroundColor: "#fc2a5b" },
                    ]}>
                    <CheckIcon fill={check2 ? "#ffffff" : "#5f5f5f"} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              style={{
                borderRadius: 15,
                height: verticalScale(120),
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: verticalScale(10),
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: verticalScale(10),
                  fontWeight: "500",
                  fontStyle: "normal",
                  textAlign: "left",
                  color: "#000000",
                }}>
                {term2}
              </Text>
            </ScrollView>
          </View>

          <View>
            <View
              style={{
                height: verticalScale(55),
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    fontFamily: "Pretendard",
                    fontSize: scale(15),
                    fontWeight: "500",
                    fontStyle: "normal",
                    lineHeight: 32,
                    textAlign: "left",
                    color: "#ffffff",
                  }}>
                  비포헤어샵 개인정보처리방침
                  <Text style={{ color: "red" }}> *</Text>
                </Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    setCheck3(!check3);
                  }}>
                  <View
                    style={[
                      styles.circle,
                      check3 && { backgroundColor: "#fc2a5b" },
                    ]}>
                    <CheckIcon fill={check3 ? "#ffffff" : "#5f5f5f"} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              style={{
                borderRadius: 15,
                height: verticalScale(120),
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: verticalScale(10),
              }}>
              <Text
                style={{
                  fontFamily: "Pretendard",
                  fontSize: verticalScale(10),
                  fontWeight: "500",
                  fontStyle: "normal",
                  textAlign: "left",
                  color: "#000000",
                }}>
                {term3}
              </Text>
            </ScrollView>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.accept_button}
          onPress={() => {
            if (check1 && check2 && check3) {
              navigation.navigate("UserCheck");
            } else {
              Alert.alert("이용약관에 모두 동의해주세요");
            }
          }}>
          <Text style={styles.accept_text}>동의 후 서비스 이용하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    // width: width,
    // height: height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  container: {
    width: "89%",
    height: verticalScale(600),
    backgroundColor: "#1d1d1d",
    alignItems: "center",
    borderRadius: 15,
    padding: verticalScale(20),
  },
  title: {
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
  division: {
    width: "100%",
    height: verticalScale(1),
    backgroundColor: "#343434",
    marginTop: verticalScale(20),
  },
  contents_container: {
    width: "100%",
    // marginTop: verticalScale(19),
  },
  contents: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "600",
    fontStyle: "italic",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
  accept_button: {
    width: "100%",
    height: verticalScale(55),
    borderRadius: 10,
    backgroundColor: "#fc2a5b",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(19),
  },
  accept_text: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: "#2f2f2f",
    alignItems: "center",
    justifyContent: "center",
  },
});
