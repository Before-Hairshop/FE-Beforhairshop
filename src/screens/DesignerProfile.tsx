import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import DefaultDesigner from "../assets/images/default_designer_profile.png";
import { verticalScale } from "../utils/scale";

import { Dimensions } from "react-native";
import Header from "../components/Header";
const { width, height } = Dimensions.get("window");
import GoBackIcon from "../assets/icons/goBack";
import MeatballIcon from "../assets/icons/meatball";

const HeaderContents = () => (
  <>
    <GoBackIcon />
    <MeatballIcon />
  </>
);

export default function Loading() {
  return (
    <ScrollView style={styles.profile}>
      <Header contents={<HeaderContents />} />
      <View style={{ width: "100%" }}>
        <Image source={DefaultDesigner} style={styles.designer_img} />
        <View
          style={{
            width: "100%",
            backgroundColor: "blue",
            height: verticalScale(30),
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            position: "absolute",
            top: verticalScale(345),
          }}
        />
        <View
          style={{
            paddingLeft: "8%",
            paddingRight: "8%",
            width: "100%",
          }}>
          <View>
            <Text>헤어 디자이너</Text>
          </View>
          <View>
            <Text>자기소개</Text>
            <Text>
              lovable lucid florence flutter you destiny seraphic purity
              adolescence fabulous girlish requiem lucid fabulous miracle
              miracle droplet girlish lucid droplet purity droplet flutter
              adolescence kitten fascinating.
            </Text>
          </View>
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
    width: width,
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
    position: "relative",
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
