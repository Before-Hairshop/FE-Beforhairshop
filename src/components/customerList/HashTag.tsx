import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { scale, verticalScale } from "../../utils/scale";

export default function HashTag(props) {
  return (
    <View
      style={{
        borderRadius: 100,
        backgroundColor: "rgba(252, 42, 91, 0)",
        borderStyle: "solid",
        borderWidth: 0.8,
        borderColor: "#fc2a5b",
        paddingLeft: verticalScale(6),
        paddingRight: verticalScale(6),
        paddingTop: verticalScale(3),
        paddingBottom: verticalScale(3),
        marginRight: scale(6),
      }}>
      <Text
        style={{
          fontFamily: "Pretendard",
          fontSize: 10,
          fontWeight: "normal",
          letterSpacing: -0.5,
          textAlign: "center",
          color: "#fc2a5b",
        }}>
        {props.value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
