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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const imageSize = windowWidth / 2 - 30;

const ButtonContents = () => {
  return (
    <ImageBackground
      source={require("../Assets/Images/popular_thumbnail.jpeg")}
      resizeMode="cover"
      style={styles.image}
      imageStyle={{ borderRadius: 15 }}>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.6)"]}
        style={{
          height: "100%",
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}>
        <Text style={styles.text}>히피펌</Text>
      </LinearGradient>
    </ImageBackground>
  );
};

export default function PopularHairstyle() {
  return (
    <Button
      title={<ButtonContents></ButtonContents>}
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
        marginRight: 10,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: imageSize,
    height: imageSize,
    margin: 0,
    padding: 0,
  },
  text: {
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 28,
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff",
    marginLeft: 15,
  },
});
