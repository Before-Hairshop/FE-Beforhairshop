import { StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { launchImageLibrary } from "react-native-image-picker";
import { resizeImage } from "../../utils/resizeImage";

export default function ProfileUploadButton(props) {
  return (
    <TouchableOpacity
      style={props.style}
      onPress={async () => {
        //   const result = await launchCamera();
        console.log(props);
        const result = await launchImageLibrary();
        const resize_result = await resizeImage(result.assets[0].uri);
        console.log(resize_result);
        let newArray = [...props.toChangeArray];
        // const res = await fetch(result.assets[0].uri);
        // const blob = await res.blob();
        const res = await fetch(resize_result.uri);
        const blob = await res.blob();
        newArray[props.index] = {
          // uri: result.assets[0].uri,
          uri: resize_result.uri,
          blob: blob,
        };
        console.log(newArray);
        props.toChangeFunction(newArray);
      }}>
      <Image
        source={{
          uri: props.toChangeArray[props.index].uri + "?" + new Date(),
        }}
        style={{ width: "100%", aspectRatio: 1 }}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({});
