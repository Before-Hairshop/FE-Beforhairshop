import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";

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
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          flexDirection: "column",
          marginRight: 15,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Image
          source={require(`../Assets/Images/VirtualStylingIcon.png`)}></Image>
      </View>
      <View style={{ flex: 4, justifyContent: "center" }}>
        <Text
          style={{
            fontFamily: "Pretendard",
            fontSize: 12,
            fontWeight: "normal",
            fontStyle: "normal",
            lineHeight: 24,
            letterSpacing: -0.06,
            textAlignVertical: "center",
            color: "rgba(255, 255, 255, 0.5)",
          }}>
          나에게 어울리는 스타일을 찾아
        </Text>
        <Text
          style={{
            fontFamily: "Pretendard",
            fontSize: 16,
            fontWeight: "bold",
            fontStyle: "normal",
            lineHeight: 24,
            letterSpacing: 0,

            textAlignVertical: "center",
            color: "#ffffff",
          }}>
          헤어스타일 체험
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Icon
          name="chevron-forward-outline"
          color="rgba(255, 255, 255, 0.5)"
          style={{ fontSize: 35 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
