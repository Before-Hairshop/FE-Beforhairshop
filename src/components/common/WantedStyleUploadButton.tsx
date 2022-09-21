import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import PlusIcon from "../../assets/icons/plus.png";
const baseImageURL = Image.resolveAssetSource(PlusIcon).uri;

import { launchImageLibrary } from "react-native-image-picker";

export default function WantedStyleUploadButton(props) {
  return (
    <TouchableOpacity
      style={props.style}
      onPress={async () => {
        console.log(props);

        const result = await launchImageLibrary();

        let newArray = [...props.array];
        newArray.push(result.assets[0].uri);

        props.setArray(newArray);
      }}>
      <Image
        source={{ uri: baseImageURL }}
        style={{ width: "100%", aspectRatio: 1 }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
