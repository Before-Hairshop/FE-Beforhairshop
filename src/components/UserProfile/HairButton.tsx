import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { TouchableOpacity } from "react-native";

import { verticalScale } from "../../utils/scale";

export default function HairButton(props) {
  return props.isActive ? (
    <TouchableOpacity
      style={[
        styles.hairButtonActiveStyle,
        {
          width: props.width,
        },
      ]}
      onPress={props.onPressDeactive}
      disabled={props.disabled}>
      <Text style={styles.hairButtonText}>{props.content}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.hairButtonNotActiveStyle,
        {
          width: props.width,
        },
      ]}
      onPress={props.onPressActive}
      disabled={props.disabled}>
      <Text style={styles.hairButtonNotActiveText}>{props.content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hairButtonActiveStyle: {
    borderColor: "#fc2a5b",
    borderWidth: 0.8,

    paddingVertical: verticalScale(18),

    alignItems: "center",
  },

  hairButtonNotActiveStyle: {
    borderColor: "#555555",
    borderWidth: 0.8,

    paddingVertical: verticalScale(18),

    alignItems: "center",
  },

  hairButtonText: {
    color: "#fc2a5b",
  },

  hairButtonNotActiveText: {
    color: "#555555",
  },
});
