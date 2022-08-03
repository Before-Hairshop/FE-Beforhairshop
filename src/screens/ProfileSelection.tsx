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
import Icon from "react-native-vector-icons/Ionicons";

const HeaderContents = () => (
  <>
    <Icon
      name="chevron-back-outline"
      color="#ffffff"
      size={verticalScale(40)}></Icon>

    <Button title="편집" type="clear" color="secondary" />
  </>
);

export default function ProfileSelection(props) {
  return (
    <View style={styles.mainView}>
      <Header contents={<HeaderContents></HeaderContents>}></Header>
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
});
