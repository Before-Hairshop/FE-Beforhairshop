import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import DefaultDesigner from "../assets/images/default_designer_profile.png";
import { verticalScale } from "../utils/scale";

export default function Loading() {
  return (
    <ScrollView style={styles.profile}>
      <View>
        <Image source={DefaultDesigner} style={styles.designer_img} />
        <View style={styles.info_header}>
          <Text>헤어 디자이너</Text>
        </View>
      </View>
      <View>
        <View style={styles.button_container}>
          <TouchableOpacity style={styles.tab_button}>
            <Text style={styles.tab_button_text}>가격</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab_button}>
            <Text style={styles.tab_button_text}>위치</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab_button}>
            <Text style={styles.tab_button_text}>근무시간</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab_button}>
            <Text style={styles.tab_button_text}>리뷰</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: "100pt",
    backgroundColor: "#191919",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  designer_img: {
    width: "100%",
    height: verticalScale(375),
  },
  info_header: {
    width: "100%",
    height: 144.6,
    backgroundColor: "#191919",
    borderRadius: 30,
  },
  button_container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  tab_button: {
    width: "25%",
  },
  tab_button_text: {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
  },
});
