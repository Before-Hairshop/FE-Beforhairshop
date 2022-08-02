import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { verticalScale } from "../Utils/scale";
import Header from "../components/Header";

export default function ProfileSelection(props) {
  const ButtonContents = props => {
    return (
      <ImageBackground
        source={props.thumbnail}
        resizeMode="cover"
        style={styles.image}
        imageStyle={{ borderRadius: 15 }}></ImageBackground>
    );
  };

  return (
    <View style={styles.mainView}>
      <Header></Header>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingTop: 15 }}>
          <View style={{ flex: 6 }}>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(22),
                color: "white",
              }}>
              가상 헤어를 적용 할
            </Text>
            <Text
              style={{
                fontFamily: "Pretendard",
                fontSize: verticalScale(22),
                color: "white",
              }}>
              프로필을 선택해주세요.
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 5 }}>
        <Text style={styles.Title}>인기 헤어스타일</Text>
      </View>
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
  Title: {
    width: 164,

    height: 21,

    fontFamily: "Pretendard-Bold",

    fontSize: 18,

    fontWeight: "bold",

    fontStyle: "normal",

    letterSpacing: 0.07,

    textAlign: "left",

    color: "#ffffff",
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 15,

    backgroundColor: "#e4dcca",
  },

  slide2: {
    flex: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcf1f0",
  },

  slide3: {
    flex: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
