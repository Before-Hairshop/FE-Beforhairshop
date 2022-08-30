import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { Button } from "@rneui/themed";
import { scale, moderateScale, verticalScale } from "../../utils/scale";

const imageSize = 65;
const borderSize = verticalScale(7);
const borderWidth = scale(imageSize + borderSize / 4);

const BASE = "base";
const EDIT = "edit";

export default function HairColorItem(props) {
  const buttonColor = () => {
    if (props.status == BASE || props.status == EDIT) {
      return "#888888";
    } else {
      return "#FC2A5B";
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Button
        //
        title={
          <View>
            <ImageBackground
              source={props.thumbnail}
              resizeMode="cover"
              style={[styles.image]}
              imageStyle={{ borderRadius: borderSize }}></ImageBackground>
          </View>
        }
        buttonStyle={{
          padding: 0,
          margin: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: borderSize,
          width: borderWidth,
          borderColor: "#000000",

          height: borderWidth,
        }}
        containerStyle={{
          borderRadius: borderSize,

          padding: 0,
          marginHorizontal: verticalScale(7),
          width: borderWidth,

          height: borderWidth,
        }}
        color={buttonColor()}
        useForeground
        onPress={props.onPressImage}
      />
      <Text
        style={{
          color: props.status == BASE ? "#888888" : "#fc2a5b",
          marginTop: verticalScale(5),
          fontFamily: "pretendard",
          fontSize: verticalScale(11),
        }}>
        {props.content}
      </Text>
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
    // height: "30%",
    // width: "30%",
    margin: 0,
    padding: 0,
    borderRadius: borderSize,
  },

  imageBase: {},

  imageSelected: {},

  imageEdit: {},
});
