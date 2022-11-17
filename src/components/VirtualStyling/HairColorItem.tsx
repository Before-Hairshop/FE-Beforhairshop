import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";

import { Button } from "@rneui/themed";
import { scale, moderateScale, verticalScale } from "../../utils/scale";

import FirstStyle from "../../assets/icons/virtual/hair_1.svg";
import SecondStyle from "../../assets/icons/virtual/hair_2.svg";
import ThirdStyle from "../../assets/icons/virtual/hair_3.svg";
import FourthStyle from "../../assets/icons/virtual/hair_4.svg";
import FifthStyle from "../../assets/icons/virtual/hair_5.svg";

const imageSize = 80;
const borderSize = verticalScale(10);
const borderWidth = scale(imageSize + borderSize / 4);

const BASE = "base";
const EDIT = "edit";

export default function HairColorItem(props) {
  const buttonColor = () => {
    if (props.status == BASE || props.status == EDIT) {
      return "#666666";
    } else {
      return "#FC2A5B";
    }
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Pressable
        // title={
        //   <Image
        //     source={props.thumbnail}
        //     style={styles.image}
        //     // imageStyle={{ borderRadius: borderSize }}
        //   />
        // }
        style={{
          // alignItems: "center",
          // justifyContent: "center",
          // width: borderWidth,
          // height: borderWidth,
          // borderRadius: borderSize,
          // borderStyle: "solid",
          // borderColor: buttonColor(),
          // borderWidth: 1,
          marginHorizontal: verticalScale(6),
        }}
        // containerStyle={
        //   {
        //     marginHorizontal: verticalScale(7),
        //     width: borderWidth,
        //     height: borderWidth,
        //   }
        // }
        // color={buttonColor()}
        // useForeground
        onPress={props.onPressImage}>
        <View style={[styles.image, { borderColor: buttonColor() }]}>
          {props.thumbnail}
          {/* <Image
          source={props.thumbnail}
          style={[styles.image, { borderColor: buttonColor() }]}
          // imageStyle={{ borderRadius: borderSize }}
        /> */}
        </View>
        <Text
          style={{
            color: props.status == BASE ? "#888888" : "#fc2a5b",
            fontFamily: "pretendard",
            fontSize: verticalScale(11),
            fontWeight: props.status == BASE ? "normal" : "bold",
            textAlign: "center",
            marginTop: verticalScale(5),
          }}>
          {props.content}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    width: scale(imageSize),
    height: scale(imageSize),
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#E3E2D0",
  },
  imageBase: {},
  imageSelected: {},
  imageEdit: {},
});
