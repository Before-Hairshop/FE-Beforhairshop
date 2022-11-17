import { StyleSheet, View } from "react-native";
import React from "react";

import { verticalScale } from "../../utils/scale";

export default function BigContour(props) {
  return (
    <View
      style={[
        {
          width: "100%",
          height: verticalScale(10),
          backgroundColor: "#232323",
        },
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({});
