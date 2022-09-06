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
import LinearGradient from "react-native-linear-gradient";
import { Button } from "@rneui/themed";
import { scale, moderateScale, verticalScale } from "../../utils/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const imageSize = 155;
const borderSize = 7;

const BASE = "base";
const EDIT = "edit";
const SELECTED = "selected";
const ADD = "add";

export default function PopularHairstyle(props) {
  const ImageBackgroundContents = () => {
    if (props.status == BASE || props.status == ADD) {
      return (
        <View
          style={{
            flex: 1,

            backgroundColor: "#000000a0",
            borderRadius: 15,

            // opacity: 0.3,
          }}>
          <Text></Text>
        </View>
      );
    } else if (props.status == SELECTED) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            padding: verticalScale(13),
          }}>
          <Image
            source={require("../../assets/images/profile_selected_icon.png")}
            style={{
              width: verticalScale(22),
              height: verticalScale(22),
            }}></Image>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            padding: verticalScale(13),
          }}>
          <Image
            source={require("../../assets/images/delete_icon.png")}
            style={{
              width: verticalScale(22),
              height: verticalScale(22),
            }}></Image>
        </View>
      );
    }
  };

  const buttonColor = () => {
    if (props.status == ADD) {
      return "#000000";
    } else if (props.status == BASE || props.status == EDIT) {
      return "#888888";
    } else {
      return "#FC2A5B";
    }
  };

  return (
    <Button
      //
      title={
        <View>
          {props.status == ADD ? (
            <View style={{}}>
              <Image
                source={require("../../assets/images/plus.png")}
                style={{ width: verticalScale(62), height: verticalScale(62) }}
              />
            </View>
          ) : (
            <ImageBackground
              source={{ uri: props.thumbnail }}
              // source = {require("../a")}
              resizeMode="cover"
              style={[styles.image]}
              imageStyle={{ borderRadius: 15 }}>
              <ImageBackgroundContents></ImageBackgroundContents>
            </ImageBackground>
          )}
        </View>
      }
      buttonStyle={{
        padding: 0,
        margin: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        width: scale(imageSize + borderSize),
        borderColor: "#000000",

        height: scale(imageSize + borderSize),
        marginBottom: verticalScale(15),
      }}
      containerStyle={{
        borderRadius: 15,
        marginBottom: verticalScale(15),
        padding: 0,
        margin: 0,
        width: scale(imageSize + borderSize),

        height: scale(imageSize + borderSize),
      }}
      color={buttonColor()}
      useForeground
      onPress={props.onPressImage}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: scale(imageSize),
    height: scale(imageSize),
    margin: 0,
    padding: 0,
    borderRadius: 15,
  },

  imageBase: {},

  imageSelected: {},

  imageEdit: {},
});
