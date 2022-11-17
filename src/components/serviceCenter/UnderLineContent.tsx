import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { scale, verticalScale } from "../../utils/scale";

import HighlightText from "react-native-highlight-underline-text";

export const UnderLineContent = (props: { value: string }) => (
  <HighlightText
    isFixed={false}
    ratio={0.26}
    underlineColor="rgba(252, 42, 91, 0.5)"
    textStyle={{
      fontFamily: "Pretendard",
      fontSize: scale(22),
      fontWeight: "bold",
      fontStyle: "normal",
      letterSpacing: 0,
      textAlign: "left",
      color: "#ffffff",
    }}
    text={props.value}
  />
);
