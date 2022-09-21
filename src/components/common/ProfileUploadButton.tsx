import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { launchImageLibrary } from "react-native-image-picker";

export default function ProfileUploadButton(props) {
  return (
    <TouchableOpacity
      style={props.style}
      onPress={async () => {
        //   const result = await launchCamera();
        console.log(props);
        const result = await launchImageLibrary();
        let newArray = [...props.toChangeArray];
        newArray[props.index] = result.assets[0].uri;
        console.log(props.index);
        props.toChangeFunction(newArray);
      }}>
      <Image
        source={{ uri: props.toChangeArray[props.index] }}
        style={{ width: "100%", aspectRatio: 1 }}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({});