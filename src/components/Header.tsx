import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { Avatar } from "@rneui/themed";
import { scale, verticalScale } from "../Utils/scale";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.Title}>BEFORE HAIRSHOP</Text>
      <Avatar
        activeOpacity={0.2}
        avatarStyle={{}}
        containerStyle={{ backgroundColor: "#BDBDBD" }}
        icon={{}}
        iconStyle={{}}
        imageProps={{}}
        onLongPress={() => alert("onLongPress")}
        onPress={() => alert("onPress")}
        overlayContainerStyle={{}}
        placeholderStyle={{}}
        rounded
        title="P"
        titleStyle={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(15),
    paddingTop: Platform.OS === "ios" ? verticalScale(45) : verticalScale(20),
  },
  Title: {
    width: scale(164),
    height: verticalScale(21),
    fontFamily: "Pretendard-Bold",
    fontSize: verticalScale(18),
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0.07,
    textAlign: "left",
    color: "#ffffff",
  },
});
