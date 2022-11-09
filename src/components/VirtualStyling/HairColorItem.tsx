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
        <Image
          source={props.thumbnail}
          style={[styles.image, { borderColor: buttonColor() }]}
          // imageStyle={{ borderRadius: borderSize }}
        />
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
    width: scale(imageSize),
    height: scale(imageSize),
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
  },
  imageBase: {},
  imageSelected: {},
  imageEdit: {},
});
