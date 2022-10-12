import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { scale, verticalScale } from "../../utils/scale";
import { useNavigation } from "@react-navigation/native";

export default function MypageItem(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ height: verticalScale(50), alignItems: "center" }}
      onPress={() => {
        Alert.alert("준비중 페이지");
        // navigation.navigate(props.navigate);
      }}>
      <View
        style={{ width: "88.8%", height: "100%", justifyContent: "center" }}>
        <Text
          style={{
            fontFamily: "Pretendard",
            fontSize: scale(15),
            fontWeight: "normal",
            textAlign: "left",
            color: "#ffffff",
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
