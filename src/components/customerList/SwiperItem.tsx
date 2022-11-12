import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { scale, verticalScale } from "../../utils/scale";
import HashTag from "./HashTag";
import { useNavigation } from "@react-navigation/native";

export default function SwiperItem(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", height: "100%" }}
      onPress={() => {
        navigation.navigate("UserProfileLookup", {
          userProfileId: props.data.id,
        });
      }}>
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          paddingHorizontal: verticalScale(15),
        }}>
        <Image
          source={{
            uri: props.data.frontImageUrl + "?" + new Date(),
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
            {props.data.zipAddress.length > 16
              ? props.data.zipAddress.substring(0, 15) + "..."
              : props.data.zipAddress}
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
            {props.data.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {props.data.desiredHairstyle == null ||
            props.data.desiredHairstyle == "" ? (
              <HashTag value="#스타일을 추천받고 싶어요" />
            ) : (
              <HashTag value={`#${props.data.desiredHairstyle}`} />
            )}
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
            {props.data.payableAmount.toLocaleString()}원
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
