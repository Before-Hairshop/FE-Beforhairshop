import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";
import { verticalScale } from "../utils/scale";
import { useNavigation } from "@react-navigation/native";

export default function Loading() {
  const HeaderContents = () => {
    const navigation = useNavigation();

    return (
      <>
        <Icon
          name="chevron-back-outline"
          color="#ffffff"
          size={verticalScale(40)}
          onPress={() => navigation.navigate("ProfileSelection")}></Icon>
      </>
    );
  };
  return (
    <View style={styles.mainView}>
      <Header contents={<HeaderContents></HeaderContents>}></Header>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: verticalScale(20),

    backgroundColor: "#191919",
  },
});
