import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { scale, verticalScale } from "../../utils/scale";
import HashTag from "./HashTag";

export default function SwiperItem(props) {
  return (
    <TouchableOpacity style={{ flexDirection: "row", height: "100%" }}>
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          paddingHorizontal: verticalScale(15),
        }}>
        <Image
          source={{
            uri: "https://d2ce7t1l8ikrzi.cloudfront.net/profile/3/front_image.jpg",
          }}
          style={{
            width: verticalScale(110),
            height: verticalScale(110),
            borderRadius: 10,
            shadowColor: "rgba(0, 0, 0, 0.25)",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 10,
            shadowOpacity: 1,
            borderWidth: 1,
            borderColor: "#222222",
          }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
        }}>
        <View
          style={{
            height: verticalScale(110),
            justifyContent: "space-around",
          }}>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 13,
              fontWeight: "normal",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#737373",
            }}>
            강남구 역삼동
          </Text>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 15,
              fontWeight: "500",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#ffffff",
            }}>
            짱구
          </Text>
          <View style={{ flexDirection: "row" }}>
            <HashTag value="투블럭" />
            <HashTag value="단발" />
          </View>
          <Text
            style={{
              fontFamily: "Pretendard",
              fontSize: 13,
              fontWeight: "normal",
              letterSpacing: 0,
              textAlign: "left",
              color: "#fc2a5b",
            }}>
            {"20000".toLocaleString()}원
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
