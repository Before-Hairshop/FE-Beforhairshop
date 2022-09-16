import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StarIcon from "../../assets/icons/star.svg";

import { scale, verticalScale } from "../../utils/scale";

const YellowStar = ({ size }) => (
  <View style={styles.star}>
    <StarIcon fill="#ffce00" width={size} height={size}></StarIcon>
  </View>
);

const GreyStar = ({ size }) => (
  <View style={styles.star}>
    <StarIcon fill="#191919" stroke="#555555" width={size} height={size} />
  </View>
);

export default function StarRating({ size, score }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <YellowStar size={scale(32)} />
      <YellowStar size={scale(32)} />
      <YellowStar size={scale(32)} />
      <YellowStar size={scale(32)} />
      <GreyStar size={scale(32)} />
    </View>
  );
}

const styles = StyleSheet.create({
  star: {
    padding: verticalScale(3),
  },
});
