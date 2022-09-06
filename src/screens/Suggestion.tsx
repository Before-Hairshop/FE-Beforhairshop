import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import GoBackIcon from "../assets/icons/goBack.svg";
import { verticalScale, scale } from "../utils/scale";
import Header from "../components/Header";
const MAINCOLOR = "#fc2a5b";
const HeaderContents = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ flex: 1 }}>
        <GoBackIcon />
      </View>
      <View
        style={{ flex: 10, justifyContent: "center", alignItems: "center" }}>
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
          [홍길동] 스타일 추천서
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}></View>
    </>
  );
};

export default function Suggestion() {
  return (
    <View style={styles.mainView}>
      <Header contents={<HeaderContents></HeaderContents>}></Header>

      <ScrollView>
        <View style={{ marginTop: 12, alignItems: "flex-start" }}>
          <Text style={styles.itemTextStyle}>인사말 </Text>

          <View style={styles.userTextUnderline}>
            <TextInput
              placeholder="인사말을 작성해주세요."
              placeholderTextColor="#555555"
              style={styles.highlightText}></TextInput>
          </View>

          <View style={{ width: "100%" }}>
            <Text style={styles.SuggestionTitleText}>추천 1</Text>

            <Text style={styles.itemTextStyle}>
              추천 헤어스타일을 입력해주세요.
            </Text>

            <View style={styles.userTextUnderline}>
              <TextInput
                placeholder="예시) 포마드, 투블럭, C컬펌"
                placeholderTextColor="#555555"
                style={styles.highlightText}></TextInput>
            </View>

            <Text style={styles.itemTextStyle}>
              해당 스타일을 추천한 이유를 적어주세요.
            </Text>

            <View style={styles.userTextUnderline}>
              <TextInput
                placeholder="추천 이유를 적어주세요."
                placeholderTextColor="#555555"
                style={styles.highlightText}></TextInput>
            </View>

            <Text style={styles.itemTextStyle}>
              (선택) 추천 헤어스타일 이미지를 첨부해주세요.
            </Text>

            <View style={styles.userTextUnderline}>
              <TextInput
                placeholder="추천 이유를 적어주세요."
                placeholderTextColor="#555555"
                style={styles.highlightText}></TextInput>
            </View>

            <Text style={styles.itemTextStyle}>제안 비용</Text>

            <View style={styles.userTextUnderline}>
              <TextInput
                placeholder="예시) 30000"
                placeholderTextColor="#555555"
                style={styles.highlightText}></TextInput>
            </View>

            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#2e2e2e",
                padding: 10,
                marginTop: verticalScale(25),
                borderRadius: 10,
              }}>
              <Text style={{ fontSize: scale(14), color: "#a0a0a0" }}>
                스타일 추천서 추가 +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fc2a5b",

          marginTop: verticalScale(25),
          marginBottom: verticalScale(50),
          height: verticalScale(55),
          borderRadius: 10,
        }}>
        <Text style={{ fontSize: scale(16), color: "#ffffff" }}>
          메시지 보내기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: 20,

    backgroundColor: "#191919",
  },
  itemTextStyle: {
    fontFamily: "Pretendard",
    fontSize: scale(16),

    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),

    letterSpacing: 0,

    color: "#ffffff",
  },

  userTextUnderline: {
    borderBottomColor: "#373737",
    borderBottomWidth: 1,
    width: "100%",
  },

  highlightText: {
    fontFamily: "Pretendard",
    fontSize: scale(16),

    marginBottom: verticalScale(10),
    marginTop: verticalScale(15),
    color: "#fc2a5b",
  },

  SuggestionTitleText: {
    fontFamily: "Pretendard",
    fontSize: scale(25),

    color: "#ffffff",
    marginVertical: verticalScale(42),
  },
});
