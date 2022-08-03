import { StyleSheet, Text, View, Button } from "react-native";
import { TouchableOpacity } from "react-native";
import React from "react";

export default function Loading({ navigation }) {
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.push("VirtualStyling")}>
        <Text>Main</Text>
        <Button
          title="To DesignerProfile"
          onPress={() => {
            navigation.navigate("DesignerProfile");
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
