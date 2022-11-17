import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { scale, verticalScale } from "../../utils/scale";
import DefaultDesignerImg from "../../assets/images/default_designer.png";

export default function ChatItem() {
  return (
    <TouchableOpacity style={styles.frame}>
      <View style={styles.container}>
        <View style={styles.img_section}>
          <Image
            source={DefaultDesignerImg}
            style={styles.designer_img}
            resizeMode={"cover"}
          />
        </View>
        <View style={styles.contents_section}>
          <View style={{ width: "93%" }}>
            <Text style={styles.name}>홍길동</Text>
            <Text style={styles.history}>투블럭이 하고 싶어요</Text>
          </View>
        </View>
        <View style={styles.notify_section}>
          <Text style={styles.time}>오후 11:30</Text>
          <View style={styles.alarm_container}>
            <View style={styles.alarm_circle}>
              <Text style={styles.alarm_count}>2</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  frame: {
    height: verticalScale(141),
    alignItems: "center",
  },
  container: {
    width: "88.2%",
    height: "100%",
    flexDirection: "row",
  },
  img_section: {
    width: "23%",
    height: "100%",
    justifyContent: "center",
  },
  designer_img: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    borderWidth: 1,
    borderColor: "#373737",
  },
  contents_section: {
    width: "60%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
  },
  history: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "left",
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: verticalScale(8),
  },
  notify_section: {
    width: "17%",
    height: "100%",
    paddingTop: verticalScale(29),
  },
  time: {
    fontFamily: "Pretendard",
    fontSize: 10,
    fontWeight: "normal",
    fontStyle: "italic",
    lineHeight: 12,
    letterSpacing: 0,
    textAlign: "right",
    color: "rgba(255, 255, 255, 0.7)",
  },
  alarm_container: {
    width: "100%",
    marginTop: verticalScale(6),
    alignItems: "flex-end",
  },
  alarm_circle: {
    width: scale(25),
    height: scale(25),
    borderRadius: scale(12.5),
    backgroundColor: "#fc2a5b",
    alignItems: "center",
    justifyContent: "center",
  },
  alarm_count: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "italic",
    letterSpacing: 0,
    color: "#ffffff",
  },
});
