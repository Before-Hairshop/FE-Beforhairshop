import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";
import { scale, verticalScale, moderateScale } from "../../utils/scale";
import { useNavigation } from "@react-navigation/native";

export default function MainNavigateButton(props) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        alignItems: "center",
        // justifyContent: "center",
      }}>
      <Button
        title={
          <ButtonContents text={props.text} icon={props.icon}></ButtonContents>
        }
        buttonStyle={{
          backgroundColor: "#0c0c0c",
          height: verticalScale(100),
        }}
        containerStyle={{
          marginTop: verticalScale(10),
          borderRadius: 15,

          borderWidth: 1,
          alignSelf: "stretch",

          borderColor: "rgba(255, 255, 255, 0)",
        }}
        onPress={() => navigation.navigate("ProfileSelection")}
      />
    </View>
  );
}

const ButtonContents = props => {
  console.log("props in button contents is: ");
  console.log(props.icon);
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          flexDirection: "column",
          marginRight: 15,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Image source={props.icon}></Image>
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
          {props.text[0]}
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
          {props.text[1]}
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Icon
          name="chevron-forward-outline"
          color="rgba(255, 255, 255, 0.5)"
          style={{ fontSize: verticalScale(35) }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
