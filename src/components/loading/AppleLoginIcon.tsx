import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { scale, verticalScale } from "../../utils/scale";

export default function AppleLoginIcon() {
  return (
    <Image
      source={require("../../assets/icons/apple_login.png")}
      style={styles.iconStyle}
    />
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    marginHorizontal: verticalScale(10.5),
    width: scale(60),
    height: scale(60),
  },
});
