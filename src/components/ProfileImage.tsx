import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "@rneui/themed";
import { scale, moderateScale, verticalScale } from "../utils/scale";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const imageSize = 160;
const borderSize = 7;

export default function PopularHairstyle(props) {
  let [imageType, setImageType] = useState("base");
  //base, edit, selected
  const selectImage = () => {
    if (imageType == "base") {
      setImageType("selected");
    } else {
      setImageType("base");
    }
  };

  return (
    <Button
      title={
        <ImageBackground
          source={props.thumbnail}
          resizeMode="cover"
          style={[styles.image]}
          imageStyle={[{ borderRadius: 15 }]}></ImageBackground>
      }
      buttonStyle={{
        padding: 0,
        margin: 0,
        alignItems: "center",
        justifyContent: "center",
        width: scale(imageSize + borderSize),
        // imageType == "selected"
        //   ? scale(imageSize + borderSize)
        //   : scale(imageSize),
        height: scale(imageSize + borderSize),
        // imageType == "selected"
        //   ? scale(imageSize + borderSize)
        //   : scale(imageSize),
      }}
      containerStyle={{
        borderRadius: 15,
        marginBottom: verticalScale(20),
        padding: 0,
        margin: 0,
        width: scale(imageSize + borderSize),
        // imageType == "selected"
        //   ? scale(imageSize + borderSize)
        //   : scale(imageSize),
        height: scale(imageSize + borderSize),
        // imageType == "selected"
        //   ? scale(imageSize + borderSize)
        //   : scale(imageSize),
      }}
      color={props.status == "selected" ? "#FC2A5B" : "#191919"}
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
  },

  imageBase: {},

  imageSelected: {},

  imageEdit: {},
});
