import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import StarIcon from "../../assets/icons/star.svg";

import { scale, verticalScale } from "../../utils/scale";

const Star = ({ size, isYellow, setScoreFunction, position, isTouchable }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (isTouchable) {
          setScoreFunction(position);
        }
      }}
      disabled={!isTouchable}>
      <View style={styles.star}>
        <StarIcon
          fill={isYellow ? "#ffce00" : "#191919"}
          stroke={isYellow ? undefined : "#555555"}
          width={size}
          height={size}
        />
      </View>
    </TouchableOpacity>
  );
};

export default function StarRating({
  size,
  score,
  containerStyle,
  setScoreFunction,
  isTouchable,
}) {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < score) {
      stars.push(
        <Star
          size={size}
          isYellow={true}
          setScoreFunction={setScoreFunction}
          position={i + 1}
          isTouchable={isTouchable}></Star>,
      );
    } else {
      stars.push(
        <Star
          size={size}
          isYellow={false}
          setScoreFunction={setScoreFunction}
          position={i + 1}
          isTouchable={isTouchable}></Star>,
      );
    }
  }
  return (
    <View style={[{ flexDirection: "row" }, containerStyle]}>{stars}</View>
  );
}

const styles = StyleSheet.create({
  star: {
    padding: verticalScale(3),
  },
});
