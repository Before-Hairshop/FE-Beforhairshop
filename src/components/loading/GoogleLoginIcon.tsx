import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { scale, verticalScale } from "../../utils/scale";

export default function GoogleLoginIcon() {
  return (
    <View
      style={[
        styles.iconStyle,
        {
          backgroundColor: "#ffffff",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: scale(60),
        },
      ]}>
      <Image
        source={require("../../assets/icons/google_login.png")}
        style={{
          width: scale(30),
          height: scale(30),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    marginHorizontal: verticalScale(10.5),
    width: scale(60),
    height: scale(60),
  },
});
