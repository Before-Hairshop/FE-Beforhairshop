import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function WantedStyleButton(props) {
  return (
    <TouchableOpacity
      style={props.style}
      onPress={() => {
        let newArray = [...props.array];
        newArray.splice(props.index, 1);
        props.setArray(newArray);
      }}>
      <Image
        source={{ uri: props.array[props.index] }}
        style={{ width: "100%", aspectRatio: 1 }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
