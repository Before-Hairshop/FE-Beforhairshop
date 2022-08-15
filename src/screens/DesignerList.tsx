import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TextInput,
} from "react-native";
import React from "react";

import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { scale, verticalScale } from "../utils/scale";

import Header from "../components/Header";
import GoBackIcon from "../assets/icons/goBack.svg";
import GoHomeIcon from "../assets/icons/goHome.svg";
import SearchIcon from "../assets/icons/search.svg";

import DefaultDesignerImg from "../assets/images/default_designer.png";

const HeaderContents = () => (
  <>
    <GoBackIcon />
    <GoHomeIcon />
  </>
);

const DesignerItem = () => (
  <View
    style={{
      width: "100%",
      paddingTop: verticalScale(29),
      paddingRight: scale(20),
      paddingBottom: verticalScale(28),
      paddingLeft: scale(22),
      flexDirection: "row",
    }}>
    <Image
      source={DefaultDesignerImg}
      style={{
        width: scale(70),
        height: verticalScale(70),
        borderRadius: 70,
        borderWidth: 1,
        borderColor: "#373737",
      }}
      resizeMode={"cover"}
    />
    <View>
      <Text
        style={{
          fontFamily: "Pretendard",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: 15,
          textAlign: "left",
          color: "#FFFFFF",
        }}>
        이안
      </Text>
      <Text
        style={{
          fontFamily: "Pretendard",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: 15,
          textAlign: "left",
          color: "#737373",
        }}>
        헤어샵 이름
      </Text>
      <Text
        style={{
          fontFamily: "Pretendard",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: 12,
          textAlign: "left",
          color: "rgba(255, 255, 255, 0.7)",
        }}>
        울산 남구 수암로 148 홈플러스 울산남구점 옥상층(5층)
      </Text>
    </View>
  </View>
);

export default function Loading() {
  return (
    <ScrollView style={{ width: width, backgroundColor: "#191919" }}>
      <View
        style={{
          position: "relative",
          paddingTop:
            Platform.OS === "ios" ? verticalScale(45) : verticalScale(20),
          alignItems: "center",
        }}>
        <Text
          style={{
            fontFamily: "Pretendard",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
            color: "#FFFFFF",
          }}>
          헤어 디자이너 목록
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          position: "absolute",
        }}>
        <Header contents={<HeaderContents />} />
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: verticalScale(24),
          paddingTop: verticalScale(10),
          paddingBottom: verticalScale(10),
        }}>
        <View
          style={{
            width: "89%",
            height: verticalScale(45),
            backgroundColor: "#272728",
            borderRadius: 15,
            flexDirection: "row",
            paddingTop: verticalScale(13),
            paddingBottom: verticalScale(13),
            paddingLeft: scale(18),
          }}>
          <SearchIcon />
          <TextInput
            placeholder="키워드를 검색해 주세요"
            placeholderTextColor="#C8C8C8"
          />
        </View>
      </View>
      <View>
        <DesignerItem />
        <View
          style={{
            width: "100%",
            height: verticalScale(1),
            backgroundColor: "#333333",
          }}
        />
        <DesignerItem />
        <View
          style={{
            width: "100%",
            height: verticalScale(1),
            backgroundColor: "#333333",
          }}
        />
        <DesignerItem />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
