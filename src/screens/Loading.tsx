import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { scale } from "../utils/scale";

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#191919",
      }}>
      <Text style={styles.mainText}>BEFORE </Text>
      <Text style={styles.mainText}>HAIRSHOP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    fontSize: scale(32),
    color: "#ffffff",
    fontFamily: "Pretendard-Bold",
  },
});
