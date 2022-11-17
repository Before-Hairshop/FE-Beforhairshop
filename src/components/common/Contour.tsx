import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { scale, verticalScale } from "../../utils/scale";

export default function Contour(props) {
  return (
    <View
      style={[
        {
          width: "100%",
          height: verticalScale(1),
          opacity: 0.2,
          backgroundColor: "#eeeeee",
        },
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({});
