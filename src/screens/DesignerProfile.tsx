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
            backgroundColor: "#191919",
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
          <Text>헤어 디자이너</Text>
          <Text>이안</Text>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              width: "89%",
              height: verticalScale(1),
              backgroundColor: "#333333",
            }}
          />
        </View>
        <View
          style={{
            padding: "8%",
            width: "100%",
          }}>
          <Text>자기소개</Text>
          <Text>
            lovable lucid florence flutter you destiny seraphic purity
            adolescence fabulous girlish requiem lucid fabulous miracle miracle
            droplet girlish lucid droplet purity droplet flutter adolescence
            kitten fascinating.
          </Text>
        </View>
      </View>
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
      <View style={{ width: "100%", padding: "8%" }}>
        <Text>가격</Text>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>컷</Text>
            <View>
              <Text>여자컷트 30000원</Text>
              <Text>남성컷트 30000원</Text>
              <Text>앞머리컷 30000원</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>일반펌</Text>
            <View>
              <Text>일반펌 / 남자 30000원</Text>
              <Text>일반펌 / 여자 30000원</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>열펌</Text>
            <View>
              <Text>볼륨매직 30000원</Text>
              <Text>매직셋팅 30000원</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>염색</Text>
            <View>
              <Text>염색 30000원</Text>
              <Text>탈색 30000원</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: verticalScale(10),
          backgroundColor: "#232323",
        }}
      />
      <View style={{ width: "100%", padding: "8%" }}>
        <Text>위치</Text>
      </View>
      <View
        style={{
          width: "100%",
          height: verticalScale(10),
          backgroundColor: "#232323",
        }}
      />
      <View style={{ width: "100%", padding: "8%" }}>
        <Text>근무시간</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>월요일</Text>
          <Text>PM 17:00 - PM 21:00</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>화요일</Text>
          <Text>PM 17:00 - PM 21:00</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>수요일</Text>
          <Text>PM 17:00 - PM 21:00</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>목요일</Text>
          <Text>PM 17:00 - PM 21:00</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>금ㆍ토ㆍ일</Text>
          <Text>PM 17:00 - PM 21:00</Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: verticalScale(10),
          backgroundColor: "#232323",
        }}
      />
      <View style={{ width: "100%", padding: "8%" }}>
        <Text>디자이너 리뷰</Text>
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
