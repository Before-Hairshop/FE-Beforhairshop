import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";

export default function MainNavigateButton() {
  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        // justifyContent: "center",
      }}>
      <Button
        title={<ButtonContents></ButtonContents>}
        buttonStyle={{
          backgroundColor: "#0c0c0c",
          height: 100,
        }}
        containerStyle={{
          marginTop: 20,
          borderRadius: 15,

          borderWidth: 1,
          alignSelf: "stretch",

          borderColor: "rgba(255, 255, 255, 0)",
        }}
      />
    </View>
  );
}

const ButtonContents = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      <Image
        source={require(`../Assets/Images/VirtualStylingIcon.png`)}></Image>
      <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
        John Doe
      </Text>
      <Text style={{ fontStyle: "italic", fontSize: 12, color: "white" }}>
        Minister of Magic
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
