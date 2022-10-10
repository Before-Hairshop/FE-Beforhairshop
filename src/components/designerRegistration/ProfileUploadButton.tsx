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
        const res = await fetch(result.assets[0].uri);
        const blob = await res.blob();
        newArray[props.index] = {
          uri: result.assets[0].uri,
          blob: blob,
        };
        console.log(newArray);
        props.toChangeFunction(newArray);
      }}>
      <Image
        source={{ uri: props.toChangeArray[props.index].uri }}
        style={{ width: "100%", aspectRatio: 1 }}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({});