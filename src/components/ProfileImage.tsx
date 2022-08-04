import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
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

  const ImageBackgroundContents = () => {
    if (props.status == "base") {
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
    } else if (props.status == "selected") {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            padding: verticalScale(13),
          }}>
          <Image
            source={require("../assets/images/profile_selected_icon.png")}
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
            source={require("../assets/images/delete_icon.png")}
            style={{
              width: verticalScale(22),
              height: verticalScale(22),
            }}></Image>
        </View>
      );
    }
  };

  return (
    <Button
      title={
        <View>
          <ImageBackground
            source={props.thumbnail}
            resizeMode="cover"
            style={[styles.image]}
            imageStyle={{ borderRadius: 15 }}>
            <ImageBackgroundContents></ImageBackgroundContents>
          </ImageBackground>
        </View>
      }
      buttonStyle={{
        padding: 0,
        margin: 0,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
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
    borderRadius: 15,
  },

  imageBase: {},

  imageSelected: {},

  imageEdit: {},
});
