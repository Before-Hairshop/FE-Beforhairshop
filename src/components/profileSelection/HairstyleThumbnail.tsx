import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";

import { Button } from "@rneui/themed";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const imageSize = windowWidth / 2 - 30;

const ThumbnailContent = props => {
  return (
    <ImageBackground
      source={props.thumbnail}
      resizeMode="cover"
      style={styles.image}
      imageStyle={{ borderRadius: 15 }}></ImageBackground>
  );
};

export default function HairstyleThumbnail(props) {
  return (
    <Button
      title={
        <ThumbnailContent
          styleName={props.styleName}
          thumbnail={props.thumbnail}></ThumbnailContent>
      }
      buttonStyle={{
        padding: 0,
        margin: 0,
      }}
      containerStyle={{
        borderRadius: 15,
        padding: 0,
        margin: 0,
        width: imageSize,
        height: imageSize,
      }}
      useForeground
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: imageSize,
    height: imageSize,
    margin: 0,
    padding: 0,
  },
});
