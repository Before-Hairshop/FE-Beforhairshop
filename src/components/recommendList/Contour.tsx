import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { scale, verticalScale } from "../../utils/scale";

export default function Contour(props) {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={[
          {
            width: "88.8%",
            height: verticalScale(5),
            backgroundColor: "#232323",
          },
          props.style,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
