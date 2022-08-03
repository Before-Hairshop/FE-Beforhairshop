import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "@rneui/themed";
import { scale, moderateScale, verticalScale } from "../utils/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const imageSize = 160;

const ProfileStyle = options => {};

const ButtonContents = props => {
  return (
    <ImageBackground
      source={props.thumbnail}
      resizeMode="cover"
      style={[styles.image]}
      imageStyle={[
        { borderRadius: 15 },
        ProfileStyle("gray"),
      ]}></ImageBackground>
  );
};

export default function PopularHairstyle(props) {
  return (
    <Button
      title={
        <ButtonContents
          styleName={props.styleName}
          thumbnail={props.thumbnail}></ButtonContents>
      }
      buttonStyle={{
        padding: 0,
        margin: 0,
        alignItems: "center",
        justifyContent: "center",
        width: verticalScale(imageSize),
        height: verticalScale(imageSize),
      }}
      containerStyle={{
        borderRadius: 15,
        marginBottom: verticalScale(20),
        padding: 0,
        margin: 0,
        width: verticalScale(imageSize),
        height: verticalScale(imageSize),
      }}
      useForeground
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
  },
  text: {
    fontFamily: "Pretendard",
    fontSize: scale(14),
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: scale(28),
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
    marginLeft: scale(15),
    marginBottom: scale(15),
  },
});
