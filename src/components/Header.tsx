import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { Avatar } from "@rneui/themed";
import { scale, verticalScale } from "../utils/scale";

export default function Header(props) {
  return (
    <View style={styles.header} {...props}>
      {props.contents}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(15),
    marginTop: verticalScale(15),
    // paddingTop: Platform.OS === "ios" ? verticalScale(45) : verticalScale(20),
    paddingLeft: verticalScale(8),
    paddingRight: verticalScale(8),
  },
});
