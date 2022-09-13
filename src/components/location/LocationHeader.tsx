import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { scale, verticalScale } from "../../utils/scale";
import GoBackIcon from "../../assets/icons/goBack.svg";

export default function LocationHeader() {
  return (
    <View style={styles.frame}>
      <TouchableOpacity style={styles.back_button}>
        <GoBackIcon />
      </TouchableOpacity>
      <View style={styles.title_container}>
        <Text style={styles.title_text}>지도에서 위치 확인</Text>
      </View>
      <View style={styles.blank_view} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    marginTop: Platform.OS === "ios" ? verticalScale(40) : verticalScale(0),
    height: verticalScale(70),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(15),
    paddingLeft: verticalScale(8),
    paddingRight: verticalScale(8),
  },
  back_button: {
    width: scale(40),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
  },
  title_container: {
    height: "100%",
    justifyContent: "center",
  },
  title_text: {
    fontFamily: "Pretendard",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
  },
  blank_view: {
    width: scale(40),
    height: verticalScale(40),
  },
});
