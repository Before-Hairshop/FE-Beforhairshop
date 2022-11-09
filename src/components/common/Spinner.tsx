import { ActivityIndicator, View } from "react-native";
import React from "react";

export default function Spinner() {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.6,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <ActivityIndicator color={"#ffffff"} />
    </View>
  );
}
